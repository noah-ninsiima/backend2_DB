const express = require('express');
const prisma = require('./prisma/prismaClient'); // <-- ADD THIS
const quotesRouter = require('./routes/quotesRouter');

const server = express();

server.get('/', (req, res) => {
  res.send('Server is live and ready to give you the data');
});

// Use only the router for /quotes
server.use('/quotes', quotesRouter);

// Authors routes (now prisma is defined)
server.get('/authors', async (req, res) => {
  try {
    const authors = await prisma.author.findMany({ include: { quotes: true } });
    res.send(authors);
  } catch (error) {
    res.send(error);
  }
});

server.post('/authors', (req, res) => {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', async () => {
    try {
      const data = JSON.parse(body);
      const newAuthor = await prisma.author.create({
        data: { name: data.name, photo: data.photo },
      });
      res.send(newAuthor);
    } catch (error) {
      res.send(error);
    }
  });
});

const PORT = 4001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
