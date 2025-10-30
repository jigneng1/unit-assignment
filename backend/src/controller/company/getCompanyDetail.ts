import { Request, Response } from "express";
import pool from "../../db";
const getCompanyDetailbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      "SELECT * FROM company_detail WHERE created_by_user_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        payload: "company not found",
      });
    } else {
      return res.status(200).json({ success: true, payload: result.rows[0] });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      payload: error,
    });
  }
};
export default getCompanyDetailbyId;
