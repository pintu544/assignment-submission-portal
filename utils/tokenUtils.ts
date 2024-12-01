import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (
  userId: string,
  role: "user" | "admin"
): string => {
  const payload = { userId, role };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  return token;
};

export const verifyToken = (token: string): string | jwt.JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

export const extractUserIdFromToken = (token: string): string | null => {
  const decoded = verifyToken(token);
  if (decoded && typeof decoded !== "string") {
    return decoded.userId as string;
  }
  return null;
};
