const attendanceModel = require("./Attendance");
const studentModel = require("./Students");
const DB=require("../Database/DBconnect")


studentModel.hasMany(attendanceModel, { onDelete: "CASCADE" });
attendanceModel.belongsTo(studentModel, { onDelete: "CASCADE" });

module.exports = { DB, studentModel, attendanceModel };
