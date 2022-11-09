import { Router } from "express";
import DoggoRoutes from "./doggos";
import BuildingRoutes from "./buildings";
import CourseRoutes from "./courses";

const router = Router();

router.use("/doggo", DoggoRoutes);
router.use("/building", BuildingRoutes);
router.use("/course", CourseRoutes);

export default router;
