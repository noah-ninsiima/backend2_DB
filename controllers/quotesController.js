// controllers/quotesController.js
const getAllQuotes = (prisma) => {
  return async (req, res) => {
    try {
      const quotes = await prisma.quote.findMany();
      res.send(quotes);
    } catch (error) {
      res.send(error);
    }
  };
};

const createAQuote = (prisma) => {
  return async (req, res) => {
    try {
      const { text, authorId } = req.body;     
      if (!text || !authorId) {
        return res.status(400).send({ error: 'text and authorId are required' });
      }
      const newQuote = await prisma.quote.create({
        data: { text, authorId }
      });
      res.send({ message: 'Successfully created the quote', newQuote });
    } catch (error) {
      res.send(error);
    }
  };
};

module.exports = { getAllQuotes, createAQuote };
