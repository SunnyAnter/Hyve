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
  const passwordMatch = await bcrypt.compare(
    sanitizedPassword,
    user.password
  );
  if (!passwordMatch) {
    return res.status(401).json({
      data: null,
      error: { code: 401, msg: 'User not authenticated.' },
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.findOne({ email });
    if (user !== null) {
      return res.status(400).json({
        data: null,
        error: { code: 400, msg: 'User already exists.' },
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
    console.log('Error: parameters missing');
    res.status(400);
    res.send()
  }
}