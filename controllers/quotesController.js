// controllers/quotesController.js
const getAllQuotes = (prisma) => {
  return async (req, res) => {
    try {
      const quotes = await prisma.quote.findMany(); // or include { Author: true } if you like
      res.send(quotes);
    } catch (error) {
      res.send(error);
    }
  };
};

const createAQuote = (prisma) => {
  return (req, res) => {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      try {
        const data = JSON.parse(body); // expects { "text": "...", "authorId": 1 }
        const newQuote = await prisma.quote.create({
          data: {
            text: data.text,
            authorId: data.authorId, // <-- FIX: correct field name
          },
        });
        res.send({ message: 'Successfully created the quote', newQuote });
      } catch (error) {
        res.send(error);
      }
    });
  };
};

// Use CommonJS exports (since router uses require)
module.exports = {
  getAllQuotes,
  createAQuote,
};
