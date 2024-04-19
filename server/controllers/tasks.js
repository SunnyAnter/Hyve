const Tasks = require('../models/tasks');

exports.getTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const userTasks = await Tasks.find({ assignees: { $in: id } }).populate('assignees').populate('logs').exec();
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
exports.updateProgressInpro = async (req, res) => {
  try {
    const id = req.params['id'];
    if (!id) {
      console.error('error accesing id');
    }
    const updatedTask = await Tasks.findOneAndUpdate({ _id:id}, {progress:1}, {
      new: true
    });
    res.status(200)
    res.send(updatedTask);
  } catch (error) {
    console.log('Internal Server Error');
    res.status(500);
    res.send()
  }
}
exports.updateProgressComp = async (req, res) => {
  try {
    const id = req.params['id'];
    if (!id) {
      console.error('error accesing id');
    }
    const updatedTask = await Tasks.findOneAndUpdate({ _id: id }, { progress: 2 }, {
      new: true
    });
    const populatedTask = await Tasks.findOne({ _id: updatedTask._id }).populate('assignees').populate('logs').exec();
    res.status(200)
    res.send(populatedTask);
  } catch (error) {
    console.log('Internal Server Error');
    res.status(500);
    res.send()
  }
}
exports.updateProgressOverdue = async (req, res) => {
  try {
    const id = req.params['id'];
    if (!id) {
      console.error('error accesing id');
    }
    const updatedTask = await Tasks.findOneAndUpdate({ _id: id }, { progress: 3 }, {
      new: true
    });
    const populatedTask = await Tasks.findOne({ _id: updatedTask._id }).populate('assignees').populate('logs').exec();
    res.status(200)
    res.send(populatedTask);
  } catch (error) {
    console.log('Internal Server Error');
    res.status(500);
    res.send()
  }
}
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params['id'];
    if (!id) {
      console.error('error accesing id');
    }
    await Tasks.deleteOne({ _id: id })
    res.status(200);
    res.json({
      data: {
        code: 200,
        msg:'Task successfully deleted.'
      }
    });
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send('Internal Server Error');
  }
}