const Tasks = require('../models/tasks');

exports.getTasks = async (req, res) => {
  try {
    const id = req.params['id'];
    const userTasks = await Tasks.find({ assignees: { $in: id } }).populate('assignees').exec();
    res.status(200)
    res.send(userTasks)
  } catch (error) {
    console.log('Internal Server Error');
    res.status(500);
    res.send()
  }
}

exports.createTask = async (req, res) => {
  try {
    const newTask = await Tasks.create(req.body);
    const populatedTask = await Tasks.findOne({ _id: newTask._id }).populate('assignees').exec();
    res.status(201);
    res.send(populatedTask);
  } catch (e) {
    console.log('Error: parameters missing');
    res.status(400);
    res.send()
  }
}