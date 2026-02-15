import { get } from "node:http";
import { prisma } from "../../lib/prisma";

const getAllDoctors = async () => {
  const doctorsData = await prisma.doctor.findMany();
  return doctorsData;
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

export const DoctorService = {
  getAllDoctors,
  getDoctorById,
};
