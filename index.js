const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const { boardRouter } = require("./routes/board");
const { taskRouter } = require("./routes/task");
const { subRouter } = require("./routes/subtask");



const app=express();

app.use(cors())
app.use(express.json());



app.get('/',async(req,res)=>{
    res.send('Welcome to kanban backend')
})

app.use('/boards',boardRouter)
app.use('/tasks',taskRouter)
app.use('/subtasks',subRouter)



app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connecte to db!")
    } catch (error) {
        console.log("Unable to connect")
        console.log(error)
    }
    console.log("sever is running.........");
})