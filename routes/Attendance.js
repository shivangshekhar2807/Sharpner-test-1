const express = require("express");
const { addAttendance, getAttendance } = require("../controller/AttendanceC");
const attendanceRouter = express.Router();


attendanceRouter.post("/Attendance", addAttendance)
attendanceRouter.get("/Attendance/:date", getAttendance);


module.exports = attendanceRouter;