import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import multer from "multer";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { createSpecialtyValidation } from "./specialty.validation";

const router = Router();
router.post("/",multerUpload.single("file"),validateRequest(createSpecialtyValidation), checkAuth(Role.PATIENT,Role.ADMIN,Role.SUPER_ADMIN),SpecialtyController.createSpecialty);
router.get("/",SpecialtyController.getAllSpecialty);
router.delete("/:id", checkAuth(Role.ADMIN,Role.SUPER_ADMIN), SpecialtyController.deleteSpecialty);

export const SpecialtyRoutes = router;
