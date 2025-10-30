import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "./jwt";
import pool from "../../db";

const login = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const findUser = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );

    // compare password
    const comparePassword = await bcrypt.compare(password, findUser.rows[0].password);
    if (comparePassword == false) {
      return res.status(400).json({
        success: false,
        payload: "password not correct",
      });
    }
    const token = generateToken();
    // res.cookie("token", token);

    return res.status(200).json({
      success: true,
      payload: {
        token: token,
        userId: findUser.rows[0].id,
      },
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      payload: error,
    });
  }
};

export default login