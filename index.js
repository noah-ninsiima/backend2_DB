const express = require('express')
const prisma = require('./prisma/prismaClient')
const quotesRouter = require('./routes/quotesRouter')
const authRouter = require('./routes/authRouter')
const verifyToken =require('./utils/authorization')

const server = express();

//middleware
server.use(express.json())
server.use('/auth',authRouter)

//check if token exists 
server.use(verifyToken)


server.get('/', (req, res) => {
    res.send('Server is live and ready to give you the data');
});


server.use('/quotes', quotesRouter);


// Authors routes 
server.get('/authors', async (req, res) => {
  try {
    const authors = await prisma.author.findMany({ include: { quotes: true } });
    res.send(authors);
  } catch (error) {
    res.send(error);
  }
});

server.post('/authors', async (req, res) => {
  try {
    const { name, photo } = req.body 
    const newAuthor = await prisma.author.create({
      data: { name, photo }
    })
    res.send(newAuthor)
  } catch (error) {
    res.send(error)
  }
})

//get all qoutes
const PORT = 4001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
