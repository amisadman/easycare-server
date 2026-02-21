import { get } from "node:http";
import { prisma } from "../../lib/prisma";
import { IEditDoctorPayload } from "./doctor.interface";
import { Doctor, Prisma, Specialty } from "../../../generated/prisma/client";
import AppError from "../../errorsHelpers/AppError";
import status from "http-status";
import { IQueryParams } from "../../interface/querybuilder.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import {
  doctorFilterableFields,
  doctorIncludeConfig,
  doctorSearchableFields,
} from "./doctor.constant";

const getAllDoctors = async (query: IQueryParams) => {
  // const doctorsData = await prisma.doctor.findMany();
  // return doctorsData;
  const queryBuilder = new QueryBuilder<
    Doctor,
    Prisma.DoctorWhereInput,
    Prisma.DoctorInclude
  >(prisma.doctor, query, {
    searchableFields: doctorSearchableFields,
    filterableFields: doctorFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .where({
      isDeleted: false,
    })
    .include({
      user: true,
      // specialties: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    })
    .dynamicInclude(doctorIncludeConfig)
    .paginate()
    .sort()
    .fields()
    .execute();

  console.log(result);
  return result;
};

const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      email: true,
      profilePhoto: true,
      contactNumber: true,
      address: true,
      registrationNumber: true,
      experience: true,
      gender: true,
      appointmentFee: true,
      qualification: true,
      currentWorkingPlace: true,
      designation: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          isDeleted: true,
        },
      },

      specialties: {
        select: {
          specialty: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });

  return doctor;
};

const editDoctor = async (id: string, payload: IEditDoctorPayload) => {
  const specialties: Specialty[] = [];
  if (payload.specialties) {
    const foundSpecialties = await prisma.specialty.findMany({
      where: {
        id: {
          in: payload.specialties,
        },
      },
    });

    if (foundSpecialties.length !== payload.specialties.length) {
      // throw new Error("One or more specialties not found");
      throw new AppError(status.NOT_FOUND, "One or more specialties not found");
    }
  }

  const doctorTx = await prisma.$transaction(
    async (tx) => {
      const doctorData = await tx.doctor.update({
        where: {
          id,
        },
        data: {
          ...payload.doctor,
        },
      });

      if (payload.specialties) {
        // delete existing specialties
        await tx.doctorSpecialty.deleteMany({
          where: {
            doctorId: doctorData.id,
          },
        });

        // create new specialties
        const doctorSpecialtyData = payload.specialties.map((specialtyId) => {
          return {
            doctorId: doctorData.id,
            specialtyId: specialtyId,
          };
        });

        await tx.doctorSpecialty.createMany({
          data: doctorSpecialtyData,
        });
      }

      await tx.user.update({
        where: {
          id: doctorData.userId,
        },
        data: {
          name: payload.doctor.name,
          email: payload.doctor.email,
          image: payload.doctor.profilePhoto,
        },
      });
      return doctorData;
    },
    {
      maxWait: 5000,
      timeout: 10000,
    },
  );

  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      email: true,
      profilePhoto: true,
      contactNumber: true,
      address: true,
      registrationNumber: true,
      experience: true,
      gender: true,
      appointmentFee: true,
      qualification: true,
      currentWorkingPlace: true,
      designation: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          isDeleted: true,
        },
      },

      specialties: {
        select: {
          specialty: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });

  return doctor;
};

const deleteDoctor = async (id: string) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  const doctorTx = await prisma.$transaction(async (tx) => {
    await tx.doctor.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    await tx.user.update({
      where: {
        id: doctorData.userId,
      },
      data: {
        isDeleted: true,
      },
    });
  });
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorData.id,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      email: true,
      profilePhoto: true,
      contactNumber: true,
      address: true,
      registrationNumber: true,
      experience: true,
      gender: true,
      appointmentFee: true,
      qualification: true,
      currentWorkingPlace: true,
      designation: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          isDeleted: true,
        },
      },

      specialties: {
        select: {
          specialty: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });

  return doctor;
};

export const DoctorService = {
  getAllDoctors,
  getDoctorById,
  editDoctor,
  deleteDoctor,
};
