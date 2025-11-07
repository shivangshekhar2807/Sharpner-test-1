



const express = require("express");
const { addStudent, getStudent } = require("../controller/StudentC");
const studentRouter = express.Router();

studentRouter.post("/Student", addStudent)
studentRouter.get("/Students",getStudent)

module.exports = studentRouter;
