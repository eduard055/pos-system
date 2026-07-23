import { Router } from "express";
import { getModifiers } from "../controllers/modifierController.js";

const router = Router();


router.get("/:productId", getModifiers);


export default router;