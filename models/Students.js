
const { DataTypes } = require("sequelize");
const DB = require("../Database/DBconnect");

const studentModel = DB.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  roll_no: {
    type: DataTypes.STRING(20),
    allowNull: false,

  },
});

module.exports = studentModel;


