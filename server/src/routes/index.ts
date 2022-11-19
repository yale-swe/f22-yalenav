import { Router } from "express";
import BuildingRoutes from "./buildings";
import CourseRoutes from "./courses";

const router = Router();

router.use("/building", BuildingRoutes);
router.use("/course", CourseRoutes);

export default router;
