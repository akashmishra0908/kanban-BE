const mongoose = require("mongoose");

const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{type:String, required:true},
    status:{type:String, enum:['Todo','Doing','Done'],default:'Todo'},
    subtasks:[{type:mongoose.Schema.Types.ObjectId,ref:'Subtask'}],
})

const TaskModel=mongoose.model('task',taskSchema)

module.exports={TaskModel}