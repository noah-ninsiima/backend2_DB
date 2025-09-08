
const express = require('express')
//import prisma
const prisma = require('./prisma/prismaClient')

const server =express()


server.get('/',(req,res)=>{
    res.send("Server is live and ready to give you the data")
})


//Get all Quotes
server.get('/quotes', async (req, res) => {
  try {
    let quotes = await prisma.quote.findMany({
      include: { Author: true }
    })
    res.send(quotes)
  } catch (error) {
    res.send(error)
  }
})

// Create a new Quote
server.post('/quotes', (req, res) => {
  let body = ''
  req.on('data', chunk => (body += chunk))
  req.on('end', async () => {
    try {
      const data = JSON.parse(body)
      let newQuote = await prisma.quote.create({
        data: {
          text: data.text,
          authorId: data.authorId
        }
      })
      res.send(newQuote)
    } catch (error) {
      res.send(error)
    }
  })
})

// Update an existing Quote
server.put('/quotes/:id', (req, res) => {
  let body = ''
  req.on('data', chunk => (body += chunk))
  req.on('end', async () => {
    try {
      const data = JSON.parse(body)
      let updatedQuote = await prisma.quote.update({
        where: { id: parseInt(req.params.id) },
        data: {
          text: data.text
        }
      })
      res.send(updatedQuote)
    } catch (error) {
      res.send(error)
    }
  })
})

// Get all Authors (with their Quotes)
server.get('/authors', async (req, res) => {
  try {
    let authors = await prisma.author.findMany({
      include: { quotes: true }
    })
    res.send(authors)
  } catch (error) {
    res.send(error)
  }
})

// Create a new Author
server.post('/authors', (req, res) => {
  let body = ''
  req.on('data', chunk => (body += chunk))
  req.on('end', async () => {
    try {
      const data = JSON.parse(body)
      let newAuthor = await prisma.author.create({
        data: {
          name: data.name,
          photo: data.photo
        }
      })
      res.send(newAuthor)
    } catch (error) {
      res.send(error)
    }
  })
})

// Update an existing Author
server.put('/authors/:id', (req, res) => {
  let body = ''
  req.on('data', chunk => (body += chunk))
  req.on('end', async () => {
    try {
      const data = JSON.parse(body)
      let updatedAuthor = await prisma.author.update({
        where: { id: parseInt(req.params.id) },
        data: {
          name: data.name,
          photo: data.photo
        }
      })
      res.send(updatedAuthor)
    } catch (error) {
      res.send(error)
    }
  })
})

const PORT =4001;

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})