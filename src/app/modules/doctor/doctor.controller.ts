import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { DoctorService } from "./doctor.service";

const getAllDoctors = catchAsync(async (req, res) => {
  const doctorsData = await DoctorService.getAllDoctors();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctors retrieved successfully",
    data: doctorsData,
  });
});

const getDoctorById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const doctorData = await DoctorService.getDoctorById(id as string);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor retrieved successfully",
    data: doctorData,
  });
});

export const DoctorController = {
  getAllDoctors,
  getDoctorById,
};
