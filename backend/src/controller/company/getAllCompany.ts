import { Request, Response } from "express";
import pool from "../../db";
const getAllCompany = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM company_detail");
        return  res.status(200).json({
            success: true,
            payload: result.rows,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            payload: error,
        });
    }
};

export default getAllCompany;