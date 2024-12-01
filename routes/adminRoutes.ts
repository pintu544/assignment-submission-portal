import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import {
  getAssignments,
  acceptAssignment,
  rejectAssignment,
} from "../controllers/adminController";

const router = express.Router();

router.get("/assignments", authenticate, authorizeAdmin, getAssignments);

router.post(
  "/assignments/:id/accept",
  authenticate,
  authorizeAdmin,
  acceptAssignment
);

router.post(
  "/assignments/:id/reject",
  authenticate,
  authorizeAdmin,
  rejectAssignment
);

export default router;
