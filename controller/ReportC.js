
const fs = require("fs");
const path = require("path");
const { attendanceModel, studentModel } = require("../models");
const { Sequelize } = require("sequelize");

const getReport = async (req, res) => {
  try {
    
    const report = await attendanceModel.findAll({
      attributes: [
        "StudentId",
        [Sequelize.fn("COUNT", Sequelize.col("Attendance.id")), "totalDays"],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(`CASE WHEN status = 'Present' THEN 1 ELSE 0 END`)
          ),
          "presentDays",
        ],
      ],
      include: [
        {
          model: studentModel,
          attributes: ["name", "roll_no", "email"],
        },
      ],
      group: ["StudentId", "Student.id"],
      raw: true, // flattens the data
    });

  
    const withPercentage = report.map((s) => ({
      name: s["Student.name"],
      roll_no: s["Student.roll_no"],
      email: s["Student.email"],
      totalDays: s.totalDays,
      presentDays: s.presentDays,
      percentage: ((s.presentDays / s.totalDays) * 100).toFixed(2),
    }));

   
    const tableRows = withPercentage
      .map(
        (s, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${s.name}</td>
          <td>${s.roll_no}</td>
          <td>${s.email}</td>
          <td>${s.presentDays}</td>
          <td>${s.totalDays}</td>
          <td>${s.percentage}%</td>
          <td class="${s.percentage >= 75 ? "status-pass" : "status-fail"}">
            ${s.percentage >= 75 ? "Good" : "Low"}
          </td>
        </tr>`
      )
      .join("");

   
    const htmlPath = path.join(__dirname, "../views/AttendanceReport.html");
    fs.readFile(htmlPath, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error loading report template");
      }

      const rendered = data.replace("{{tableRows}}", tableRows);
      res.send(rendered);
    });
  } catch (err) {
    console.error("Report generation error:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getReport };
