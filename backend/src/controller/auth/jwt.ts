import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWTSecretKey = "ThisIsSeCretKey";

export const generateToken = () => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    JWTSecretKey
  );
  return token;
};

export const validateToken = (token: string) => {
  const result = jwt.verify(token, JWTSecretKey);
  return result;
};

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("cookie");
    if (!token) {
      throw new Error();
    }
    validateToken(token.split("=")[1]);
    next();
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: "unauthorized",
    });
  }
};