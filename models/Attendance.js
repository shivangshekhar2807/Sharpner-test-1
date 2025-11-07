
const { DataTypes } = require("sequelize");
const DB = require("../Database/DBconnect");


const attendanceModel = DB.define("Attendance", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Present", "Absent"),
    allowNull: false,
  },
});



module.exports = attendanceModel;
