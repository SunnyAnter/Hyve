const express = require('express');
const userControllers = require('./controllers/users');
const taskControllers = require('./controllers/tasks');
const logControllers = require('./controllers/logs');
const messageControllers = require('./controllers/messages');
const router = express.Router();

router.get('/task/:id', taskControllers.getTasks);
router.get('/users', userControllers.getUsers);
router.get('/logs/:id', logControllers.getLogs)
router.post('/login', userControllers.login);
router.post('/register', userControllers.register);
router.post('/logs/:id', logControllers.createLog);
router.post('/messages/:id', messageControllers.sendMessage);
router.post('/task', taskControllers.createTask);
router.put('/task/:id/comp', taskControllers.updateProgressComp);
router.put('/task/:id/inpro', taskControllers.updateProgressInpro);
router.put('/task/:id/overdue', taskControllers.updateProgressOverdue);
router.delete('/task/:id', taskControllers.deleteTask);

module.exports = router