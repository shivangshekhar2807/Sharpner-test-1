const express = require("express");

const { getReport } = require("../controller/ReportC");
const reportRouter = express.Router();


reportRouter.get("/Report/Attendance", getReport);

module.exports = reportRouter;

