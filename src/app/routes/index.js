import express from "express";

import usersRoutes from "./users";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/camera", cameraRoutes);
router.use("/banho", banhoRoutes);

router.get("/", (req, res) => {
  // if (process.env.NODE_ENV == "production") return res.status(404);
  console.log("env : ", process.env);
  return res.send({
    success: `Node base project ${process.env.NODE_ENV}`,
  });
});

export default router;
