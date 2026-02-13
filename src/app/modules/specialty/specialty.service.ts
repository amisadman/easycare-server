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
  const data = await prisma.specialty.findMany();
  return data;
};



export const SpecialtyService = {
  createSpecialty,
  getAllSpecialty,
  
};
