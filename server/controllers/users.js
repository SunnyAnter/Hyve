const Users = require('../models/users');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
try {
  const { email, password } = req.body;
  const sanitizedEmail = email.replace(/[$/(){}]/g, '');
  const sanitizedPassword = password.replace(/[$/(){}]/g, '');
  const user = await Users.findOne({
    email: sanitizedEmail,
  });
  if (!user) {
    return res.status(401).json({
      data: null,
      error: { code: 401, msg: 'User doesn\'t exist' },
    });
  }
  const passwordMatch = await bcrypt.compare(
    sanitizedPassword,
    user.password
  );
  if (!passwordMatch) {
    return res.status(401).json({
      data: null,
      error: { code: 401, msg: 'Incorrect password' },
    });
  }
    res
      .status(200)
      .send(user);
  
} catch (error) {
  console.error(err);
  res.status(500).send()
}
}

exports.register = async (req, res) => {
  try {
    const { email, name, lastName, password } = req.body;
    if (password.length < 8) {
      return res.status(400).json({
        data: null,
        error: { code: 400, msg: 'Please make sure the password is at least 8 letters long.'},
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.findOne({ email });
    if (user !== null) {
      return res.status(400).json({
        data: null,
        error: { code: 400, msg: 'User with email already exists.' },
      });
    }
    const newUser = await Users.create({
      email,
      name,
      lastName,
      password: hashedPassword
    });
    res.status(201);
    res.send(newUser)
  } catch (e) {
    res.status(400);
    res.send()
  }
}