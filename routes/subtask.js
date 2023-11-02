const express = require('express');
const { SubtaskModel } = require('../model/subtaskModel');


const subRouter=express.Router()

subRouter.post('/',async(req,res)=>{
    const subtask = new SubtaskModel({
      title: req.body.title,
    });
    await subtask.save()
    res.status(201).send(subtask)
})

subRouter.get('/:id',async(req,res)=>{
    try {
        const subtasks=await SubtaskModel.findById(req.params.id)
        res.status(200).send(subtasks)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

subRouter.patch('/:id',async(req,res)=>{
    try {
        await SubtaskModel.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send({msg:"Updated Subtask succesfully.."})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

subRouter.delete('/:id',async(req,res)=>{
    try {
         await SubtaskModel.findByIdAndDelete(req.params.id);
         res.send({ msg: "Deleted Subtask succesfully.." });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

module.exports={subRouter}