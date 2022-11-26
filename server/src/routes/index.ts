import { Router } from "express";
import BuildingRoutes from "./buildings";
import CourseRoutes from "./courses";
import UserRoutes from "./user";

const router = Router();

router.use("/building", BuildingRoutes);
router.use("/course", CourseRoutes);
router.use("/user", UserRoutes);

export default router;
