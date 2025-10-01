// routes/authRouter.js
const express = require('express');
const router = express.Router();

const prisma = require('../prisma/prismaClient');
const { createUser, loginUser } = require('../controllers/authController');

router.post('/register', createUser(prisma));
router.post('/login', loginUser(prisma));

module.exports = router;
