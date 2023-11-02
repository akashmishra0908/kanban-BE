const express=require("express");
const { connection } = require("./db");



const app=express();




app.use(express.json());
















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