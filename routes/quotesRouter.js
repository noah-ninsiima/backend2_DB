// routes/quotesRouter.js
const express = require('express');
const router = express.Router();

const { getAllQuotes, createAQuote } = require('../controllers/quotesController');
const prisma = require('../prisma/prismaClient');

router.get('/', getAllQuotes(prisma));
router.post('/', createAQuote(prisma));

module.exports = router;
