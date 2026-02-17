import status from "http-status";
import { UserStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorsHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ILoginUserPayload, IRegisterPatientPayload } from "./auth.interface";



const registerPatient = async (payload: IRegisterPatientPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!data.user) {
    // throw new Error("Failed to register patient");
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to register patient"); 
  }
  try {
    const patient = await prisma.$transaction((tx) => {
      const patientTx = tx.patient.create({
        data: {
          userId: data.user.id,
          name: payload.name,
          email: payload.email,
        },
      });
      return patientTx;
    });
    return {
      ...data,
      patient,
    };
  } catch (error) {
    console.log("Transaction error : ", error);
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });
    throw error;
  }
};


const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (data.user.status === UserStatus.BLOCKED) {
    // throw new Error("User is blocked");
    throw new AppError(status.FORBIDDEN, "User is blocked");
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    // throw new Error("User is deleted");
    throw new AppError(status.FORBIDDEN, "User is deleted");
  }
  return data;
};

export const AuthService = {
  registerPatient,
  loginUser,
};
