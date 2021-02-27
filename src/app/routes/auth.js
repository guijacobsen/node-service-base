import express from "express";
import { login, recover, me, contact } from "../controllers/auth";
import { checkToken } from "../middlewares/auth";

const router = express.Router();

router.get("/me", checkToken, me);
router.post("/", login);
router.post("/recover", recover);

router.post("/contact", contact);

export default router;
