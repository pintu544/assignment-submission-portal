import { Request, Response } from "express";
import { Assignment } from "../models/Assignment";

export const getAssignments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.body.userId;
    const assignments = await Assignment.find({ admin: adminId })
      .populate("userId", "name email")
      .sort({ timestamp: -1 });

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch assignments",
      details: (error as Error).message,
    });
  }
};

export const acceptAssignment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const adminId = req.body.userId;

    const assignment = await Assignment.findOne({ _id: id, admin: adminId });
    if (!assignment) {
      res
        .status(404)
        .json({ error: "Assignment not found or not tagged to this admin" });
      return;
    }

    assignment.status = "accepted";
    await assignment.save();

    res
      .status(200)
      .json({ message: "Assignment accepted successfully", assignment });
  } catch (error) {
    res.status(500).json({
      error: "Failed to accept assignment",
      details: (error as Error).message,
    });
  }
};

export const rejectAssignment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const adminId = req.body.userId;

    const assignment = await Assignment.findOne({ _id: id, admin: adminId });
    if (!assignment) {
      res
        .status(404)
        .json({ error: "Assignment not found or not tagged to this admin" });
      return;
    }

    assignment.status = "rejected";
    await assignment.save();

    res
      .status(200)
      .json({ message: "Assignment rejected successfully", assignment });
  } catch (error) {
    res.status(500).json({
      error: "Failed to reject assignment",
      details: (error as Error).message,
    });
  }
};
