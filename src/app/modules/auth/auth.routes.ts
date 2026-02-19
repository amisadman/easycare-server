import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", AuthController.registerPatient);
router.post("/login", AuthController.loginUser);
router.get("/me",checkAuth(Role.ADMIN,Role.DOCTOR,Role.PATIENT,Role.SUPER_ADMIN), AuthController.getMe);
router.get("/refresh-token",checkAuth(Role.ADMIN,Role.DOCTOR,Role.PATIENT,Role.SUPER_ADMIN), AuthController.getNewToken);
router.get("/logout",checkAuth(Role.ADMIN,Role.DOCTOR,Role.PATIENT,Role.SUPER_ADMIN), AuthController.logout);
router.post("/change-password",checkAuth(Role.ADMIN,Role.DOCTOR,Role.PATIENT,Role.SUPER_ADMIN), AuthController.changePassword);
router.post("/verify-email",checkAuth(Role.ADMIN,Role.DOCTOR,Role.PATIENT,Role.SUPER_ADMIN), AuthController.verifyEmail);

export const AuthRoutes = router;
