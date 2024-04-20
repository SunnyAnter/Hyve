const Messages = require('../models/messages');
const Tasks = require('../models/tasks');

exports.sendMessage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      console.error('error accesing id');
    }
    const task = await Tasks.findOne({ _id: id });
    const newMessage = await Messages.create(req.body);
    const populatedMessage = await Messages.findOne({ _id: newMessage._id }).populate('user').exec();
    const newMessageList = [...task.messages, populatedMessage];
    await Tasks.findOneAndUpdate({ _id: id }, { messages: newMessageList }, {
      new: true
    });
    res.status(201);
    res.send(populatedMessage);
  } catch (e) {
    console.log('Error: parameters missing');
    res.status(400);
    res.send()
  }
}