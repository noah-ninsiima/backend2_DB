// controllers/authController.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = (prisma) => {
  return async (req, res) => {
    try {
      const { name, email, password } = req.body;  
      if (!name || !email || !password) {
        return res.status(400).send({ error: 'name, email, and password are required' });
      }

      const newUser = await prisma.user.create({
        data: { name, email, password } 
      });

      res.send(newUser);
    } catch (error) {
      res.send(error);
    }
  };
};

const loginUser = (prisma) => {
  return async (req, res) => {
    try {
      const { email, password } = req.body;         
      if (!email || !password) {
        return res.status(400).send({ error: 'email and password are required' });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(404).send({ error: 'User does not exist' });
      if (user.password !== password) return res.status(401).send({ error: 'Invalid credentials' });

      if (!process.env.JWT_SECRET) return res.status(500).send({ error: 'Missing JWT_SECRET in .env' });

      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.send({
        message: 'Login successful',
        user: { id: user.id, name: user.name, email: user.email },
        token
      });
    } catch (error) {
      res.send(error);
    }
  };
};

module.exports = { createUser, loginUser };
