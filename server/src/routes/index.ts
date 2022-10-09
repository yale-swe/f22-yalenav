import { Router } from "express";
import DoggoRoutes from "./doggos";
import BuildingRoutes from "./buildings";

const router = Router();

router.use("/doggo", DoggoRoutes);
router.use("/buildings", BuildingRoutes);

export default router;
