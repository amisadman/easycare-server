import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDoctorValidation } from "./user.validation";

const router  = Router();

router.post("/create-doctor",validateRequest(createDoctorValidation), UserController.createDoctor);

export const UserRoutes = router;