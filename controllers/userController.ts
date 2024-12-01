import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Assignment } from "../models/Assignment";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Registration failed", details: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: "Login failed", details: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const uploadAssignment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { task, adminId } = req.body;
    const userId = req.body.userId;

    if (!task || !adminId) {
      res.status(400).json({ error: "Task and adminId are required" });
      return;
    }

    const assignment = new Assignment({
      userId,
      task,
      admin: adminId,
      status: "pending",
      timestamp: new Date(),
    });

    await assignment.save();

    res
      .status(201)
      .json({ message: "Assignment uploaded successfully", assignment });
  } catch (error) {
    console.error("Error uploading assignment:", error);
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Failed to upload assignment", details: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
    const admins = await User.find({ role: "admin" }).select("name email");
    res.status(200).json(admins);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Failed to fetch admins", details: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
