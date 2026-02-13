import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const data = await SpecialtyService.createSpecialty(payload);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Specialty Created Successfully",
    data: data,
  });
});

const getAllSpecialty = catchAsync(async (req, res) => {
  const data = await SpecialtyService.getAllSpecialty();

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialty Fetched Successfully",
    data: data,
  });
});

export const SpecialtyController = {
  createSpecialty,
  getAllSpecialty,
};
