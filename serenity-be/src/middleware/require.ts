import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const require = (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("secret required");

  const token = req.cookies?.admin_token;
  if (!token)
    return res
      .status(401)
      .json({ error: { code: "UNAUTHORIZED", message: "login required" } });

  try {
    jwt.verify(token, secret);
  } catch (error) {
    return res
      .status(401)
      .json({ error: { code: "UNAUTHORIZED", message: "login required" } });
  }
  next();
};
