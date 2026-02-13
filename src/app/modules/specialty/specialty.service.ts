import { get } from "node:http";
import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const specialty = await prisma.specialty.create({
    data: payload,
  });
  return specialty;
};
const getAllSpecialty = async (): Promise<Specialty[]> => {
  const data = await prisma.specialty.findMany({
    where: {
      isDeleted: false,
    },
  });
  return data;
};

const deleteSpecialty = async (id: string): Promise<Specialty> => {
  const data = await prisma.specialty.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return data;
};

export const SpecialtyService = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
};
