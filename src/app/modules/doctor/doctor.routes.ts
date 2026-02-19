import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { updateDoctorValidation } from "./doctor.validation";

const router = Router();
router.get("/", DoctorController.getAllDoctors);
router.get("/:id", DoctorController.getDoctorById);
router.patch(
  "/:id",
  validateRequest(updateDoctorValidation),
  DoctorController.editDoctor,
);
router.delete("/:id", DoctorController.deleteDoctor);

export const DoctorRoutes = router;
