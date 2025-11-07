
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
// const DB = require("./Database/DBconnect");
const { DB } = require("./models");
const studentRouter = require("./routes/Students");
const attendanceRouter = require("./routes/Attendance");
const reportRouter = require("./routes/Reports");

app.use(
  cors({
      origin: "http://localhost:5173", 
     
  })
);

(async () => {
    try {
        await DB.authenticate()
        console.log("Authenticated Successfully")

        await DB.sync()
        console.log("Synced Successfully");
        
        app.listen(8000, () => {
            console.log("Server listening on PORT 8000")
        })
    }
    catch (err) {
        console.log(err)
    }
})()

app.use(express.json());


app.use("/", studentRouter)
app.use("/", attendanceRouter);
app.use("/", reportRouter);