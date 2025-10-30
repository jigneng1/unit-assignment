import express from "express";
import login from "../controller/auth/login";
import register from "../controller/auth/register";

const authRouter = express.Router();

authRouter.use(express.json());

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;
