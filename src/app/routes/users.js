import express from "express";

import { getByEmail, addUser, getAll } from "../controllers/user";
import { checkToken } from "../middlewares/auth";

const router = express.Router();

// user/email/:email
// user/login
// user/recover
// user/update

router.get("/email/:email", checkToken, getByEmail);
router.post("/", addUser);
router.get("/", getAll);

export default router;
