const express = require('express');
const { BoardModel } = require('../model/boardModel');


const boardRouter=express.Router()

boardRouter.get('/',async(req,res)=>{
    try {
        const boards=await BoardModel.find()
        res.send(boards)
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

boardRouter.get('/:id',async(req,res)=>{
    try {
        const board=await BoardModel.findById(req.params.id)
        if(board==null){
            return res.status(404).send({msg:`Unable to find board with id${req.params.id}`})
        }
        res.send(board)
    } catch (error) {
        return res.status(500).send({msg:error.message})
    }
})

boardRouter.post('/',async(req,res)=>{
    const board=new BoardModel({
        name:req.body.name,
    })
    try {
        const newBoard=await board.save()
        res.status(201).send({msg:"New Board Added",newBoard})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

boardRouter.patch('/:id',async(req,res)=>{
    try {
        const board=await BoardModel.findById(req.params.id)
        if(req.body.name!=null){
            board.name=req.body.name
        }
        const updatedBoard=await board.save()
        res.send({msg:"Board Updated Succesfully",updatedBoard})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

boardRouter.delete('/:id',async(req,res)=>{
    try {
        await BoardModel.findByIdAndDelete(req.params.id)
        res.send({msg:"Board Deleted Succesfully"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

module.exports={boardRouter}