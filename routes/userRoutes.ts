import express from "express";
import { authenticate, authorizeUser } from "../middlewares/authMiddleware";
import {
  registerUser,
  loginUser,
  uploadAssignment,
  getAdmins,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/upload", authenticate, authorizeUser, uploadAssignment);

router.get("/admins", authenticate, authorizeUser, getAdmins);

export default router;
