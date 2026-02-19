import { email } from "zod";

export interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface IChangePasswordPayload{
  currentPassword :string;
  newPassword: string;
}

export interface IVerifyEmailPayload {
  email: string;
  otp: string;
}