const express = require('express');
const userControllers = require('./controllers/users');
const taskControllers = require('./controllers/tasks');
const router = express.Router();

router.post('/login', userControllers.login);
router.post('/register', userControllers.register);
router.get('/users', userControllers.getUsers);
router.get('/task/:id', taskControllers.getTasks);
router.put('/task/:id/comp', taskControllers.updateProgressComp);
router.put('/task/:id/inpro', taskControllers.updateProgressInpro);
router.put('/task/:id/overdue', taskControllers.updateProgressOverdue);
router.post('/task', taskControllers.createTask);

module.exports = router