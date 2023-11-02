const express = require("express");
const { TaskModel } = require("../model/taskMOdel");


const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

taskRouter.get("/:id", async (req, res) => {
  try {
    const tasks = await TaskModel.findById(req.params.id);
    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});

taskRouter.post("/", async (req, res) => {
  const task = new TaskModel({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });
  try {
    const newTask = await task.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

taskRouter.patch("/:id", async (req, res) => {
  try {
    await TaskModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ msg: "Updated task Successfully..." });
  } catch (error) {
    res.status(500).send({ msg: error.message });
   
  }
});

taskRouter.delete("/:id", async (req, res) => {
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "Deleted task Successfully..." });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = { taskRouter };