// const Attendance = require("../models/Attendance");
// const { Op } = require("sequelize");

const { attendanceModel, studentModel } = require("../models");






const addAttendance = async(req, res)=> {
    try {
        const { date, records } = req.body;
        
        if (!date || !records || records.length <= 0) {
            return res.status(400).json({
             ERROR:"Required fields not present"
            })
        }

        const marked = await attendanceModel.findAll({
            where:{date:date}
        })

        if (marked.length > 0) {
             return res.status(400).json({
               ERROR: "Attendance allready marked",
             });
        }

          for (const item of records) {
            const studentPresent = await studentModel.findByPk(item.student_id);
            if (!studentPresent) {
              return res.status(400).json({
                ERROR: `Student with ID ${item.student_id} not found`,
              });
            }
          }
        
        const totalStudents = await studentModel.count();

        if (records.length!=totalStudents) {
            return res.status(400).json({
              ERROR: `Attendance records (${records.length}) do not match total students (${totalStudents})`,
            });
        }

        const newRecord = records.map((item) => {
           
            return {
              StudentId: item.student_id,
              status: item.status,
              date
            };
        })

        const attendance = await attendanceModel.bulkCreate(newRecord);

        res.status(201).json({
          status: "Attendance Marked",
          results: attendance,
        });

    }
    catch (err) {
        res.status(500).json({
            ERROR:err.message
        })
    }
}


const getAttendance = async (req, res) => {
    try {
        const { date } = req.params;

        const datePresent = await attendanceModel.findAll({
          where: {
            date: date,
          },
          include: [
            {
              model: studentModel,
              attributes: ["name"],
            },
          ],
        });

        if (datePresent.length > 0) {
            return res.status(200).json({
              count: datePresent.length,
              results: datePresent,
            });
        }

        const Student = await studentModel.findAll();

        res.status(200).json({
            count: Student.length,
            results:Student
        })
    }
    catch (err) {
         res.status(500).json({
           ERROR: err.message,
         });
    }
}


module.exports = { addAttendance, getAttendance };