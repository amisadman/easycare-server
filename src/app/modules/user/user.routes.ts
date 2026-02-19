import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createAdminValidation, createDoctorValidation, createSuperAdminValidation } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router  = Router();

router.post("/create-doctor",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),validateRequest(createDoctorValidation), UserController.createDoctor);
router.post("/create-admin",checkAuth(Role.SUPER_ADMIN),validateRequest(createAdminValidation), UserController.createAdmin);
// router.post("/create-super-admin",checkAuth(Role.SUPER_ADMIN),validateRequest(createSuperAdminValidation), UserController.createSuperAdmin);

export const UserRoutes = router;