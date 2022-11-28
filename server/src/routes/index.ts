import { Router } from "express";
import BuildingRoutes from "./buildings";
import CourseRoutes from "./courses";
import UserRoutes from "./user";
import ShuttleStopRoutes from "./shuttle";

const router = Router();

router.use("/building", BuildingRoutes);
router.use("/course", CourseRoutes);
router.use("/user", UserRoutes);
router.use("/shuttlestop", ShuttleStopRoutes);

export default router;
