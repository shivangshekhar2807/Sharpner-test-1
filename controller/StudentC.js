const  studentModel  = require("../models/Students");


const addStudent = async (req, res) => {
    try {
        const { name, email, roll_no } = req.body;

        const present = await studentModel.findOne({
          where: { roll_no: roll_no },
        });

        if (present) {
            return res.status(400).json({
                ERROR:`Student with Roll no ${roll_no} allready present`
            })
        }

        const newStudent = await studentModel.create({
          name,
          email,
          roll_no,
        });

        res.status(201).json({
            Status: "Student Created",
            result:newStudent
        })

       
    }
    catch (err) {
        res.status(500).json({
           ERROR:err.message
       }) 
    }
    
}


const getStudent = async (req, res) => {
    try {
        const students = await studentModel.findAll();

        res.status(200).json({
            count: students.length,
            results:students
        })
        
    }
    catch (err) {
         res.status(500).json({
           ERROR: err.message,
         }); 
    }
    
}

module.exports={addStudent,getStudent}