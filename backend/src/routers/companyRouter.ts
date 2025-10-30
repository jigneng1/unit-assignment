import express from "express";
import getCompanyDetailbyId from "../controller/company/getCompanyDetail";
import getAllCompany from "../controller/company/getAllCompany";
import createCompanyDetail from "../controller/company/createCompanyDetail";
const companyRouter = express.Router();
companyRouter.use(express.json());

companyRouter.get("/", getAllCompany);

companyRouter.get("/:id", getCompanyDetailbyId);

companyRouter.post("/" , createCompanyDetail);

export default companyRouter;