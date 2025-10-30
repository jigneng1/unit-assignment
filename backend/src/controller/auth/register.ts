import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../../db";

const register = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const salt = 10;
    const password = bcrypt.hashSync(req.body.password, salt);
    const exitUser = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );

    if (exitUser.rows.length > 0) {
      return res.status(400).json({
        sucess: false,
        payload: "user has exited",
      });
    }

    await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, password]
    );

    const getUserId = await pool.query(
        "SELECT id FROM users WHERE username = $1",
        [username]
    )

    return res.status(200).json({
      success: true,
      payload: "register sucessful",
      userId: getUserId.rows[0].id,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      payload: error,
    });
  }
};

export default register;