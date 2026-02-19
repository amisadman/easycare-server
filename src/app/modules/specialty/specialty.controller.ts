import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = catchAsync(async (req, res, next) => {
  req.body.icon = req.file?.path;
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

const deleteSpecialty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await SpecialtyService.deleteSpecialty(id as string);
  sendResponse(res, {
    httpStatusCode: 200,
    message: "Data deleted Successfully",
    success: true,
    data: data,
  });
});
export const SpecialtyController = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
};
