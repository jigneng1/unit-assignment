import { Request, Response } from "express";
import pool from "../../db";

const CreateCompanyDetail = async (req: Request, res: Response) => {
  try {
    const {
      companyType,
      companyName,
      houseNumber,
      villageNumber,
      villageName,
      alley,
      road,
      subDistrict,
      district,
      province,
      postalCode,
      contactPrefix,
      contactFirstName,
      contactLastName,
      email,
      phoneNumber,
      refCode,
      createdByUserId,
    } = req.body;

    
    if (
      !createdByUserId ||
      !companyName ||
      !houseNumber ||
      !road ||
      !subDistrict ||
      !district ||
      !province ||
      !postalCode
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const query = `
      INSERT INTO company_detail
      (
        created_by_user_id,
        company_type,
        company_name,
        house_number,
        village_number,
        village_name,
        alley,
        road,
        sub_district,
        district,
        province,
        post_code,
        contact_prefix,
        contact_firstname,
        contact_lastname,
        contact_email,
        contact_phone,
        ref_code
      )
      VALUES
      (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
      )
    `;

    const values = [
      createdByUserId,
      companyType || null,
      companyName,
      houseNumber,
      villageNumber || null,
      villageName || null,
      alley || null,
      road,
      subDistrict,
      district,
      province,
      postalCode,
      contactPrefix || null,
      contactFirstName || null,
      contactLastName || null,
      email || null,
      phoneNumber || null,
      refCode || null,
    ];

    await pool.query(query, values);

    return res.status(200).json({
      success: true,
      message: "Create company detail successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export default CreateCompanyDetail;
