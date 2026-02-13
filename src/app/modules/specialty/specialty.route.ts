import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";

const router = Router();
router.post("/", SpecialtyController.createSpecialty);
router.get("/",SpecialtyController.getAllSpecialty);

export const SpecialtyRoutes = router;
