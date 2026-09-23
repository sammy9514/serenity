import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (typeof email !== "string")
    return res.status(400).json({
      error: { code: "BAD_REQUEST", message: "email must be string" },
    });
  if (typeof password !== "string")
    return res.status(400).json({
      error: { code: "BAD_REQUEST", message: "password must be string" },
    });

  if (email !== process.env.ADMIN_EMAIL)
    return res.status(401).json({
      error: { code: "UNAUTHORISED", message: "incorrect user details" },
    });

  const comparePassword = await bcrypt.compare(
    password,
    String(process.env.ADMIN_PASSWORD_HASH),
  );

  if (!comparePassword)
    return res.status(401).json({
      error: { code: "UNAUTHORISED", message: "incorrect user details" },
    });
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  const token = jwt.sign({ role: "admin" }, secret, {
    expiresIn: "7d",
  });

  if (!token) throw new Error("token is not set");

  res.cookie("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: String(process.env.NODE_ENV) === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.json({ data: { ok: true } });
};
