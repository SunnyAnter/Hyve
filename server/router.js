const express = require('express');
const userControllers = require('./controllers/users');
const taskControllers = require('./controllers/tasks');
const router = express.Router();

router.get('/login', userControllers.login);
router.post('/register', userControllers.register);
router.get('/task', taskControllers.getTasks);
router.post('/task', taskControllers.createTask);

module.exports = router