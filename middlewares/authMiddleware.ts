import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ error: "Authorization token is missing or invalid" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
    };
    req.body.userId = decoded.userId;
    req.body.role = decoded.role;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
    return;
  }
};

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.body.role !== "admin") {
    res.status(403).json({ error: "Access denied: Admins only" });
    return;
  }
  next();
};

export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.body.role !== "user") {
    res.status(403).json({ error: "Access denied: Users only" });
    return;
  }
  next();
};
