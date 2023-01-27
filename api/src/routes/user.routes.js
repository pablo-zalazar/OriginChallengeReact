import { Router } from "express";
import { login, signUp, addAction, removeAction } from "../controllers/user.controller.js";

const router = Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.put("/addAction", addAction);
router.put("/removeAction", removeAction);

export default router;
