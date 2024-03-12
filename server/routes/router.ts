import { Router } from "express";
import { getMsg } from "../controllers/messageController";

const router = Router();

router.get("/",getMsg);

export default router;