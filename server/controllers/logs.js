const Logs = require('../models/logs');
const Tasks = require('../models/tasks');

exports.createLog = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      console.error('error accesing id');
    }
    const task = await Tasks.findOne({ _id: id });
    const newLog = await Logs.create(req.body);
    const populatedLog = await Logs.findOne({ _id: newLog._id }).populate('user').exec();
    const newLogList = [...task.logs, populatedLog];
    await Tasks.findOneAndUpdate({ _id: id }, { logs: newLogList}, {
      new: true
    });
    res.status(201);
    res.send(populatedLog);
  } catch (e) {
    console.log('Error: parameters missing');
    res.status(400);
    res.send()
  }
}