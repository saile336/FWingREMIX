const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:5173', // Match the Vue app's URL
  credentials: true,
}));
app.use(bodyParser.json());
//communication test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.get('/api/testDatabase', async (req, res) => {
  try {
    const result = await prisma.sample.findMany(); 
    res.json({ result });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/createSample', async (req, res) => {
  try {
    const newSample = await prisma.sample.create({
      data: {
        title: 'ted Doe',
      },
    });

    res.json({ message: 'New sample created!', newSample });
  } catch (error) {
    console.error('Error creating sample:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// byt ut your_table, column1, och column2 till faktiska tabeller och kolumner
app.get('/api/getData', async (req, res) => {
  const data = await prisma.your_table.findMany();
  res.json(data);
  console.log("GET data")
});

app.post('/api/addData', async (req, res) => {
  const { newData } = req.body;
  await prisma.your_table.create({
    data: {
      column1: newData.field1,
      column2: newData.field2,
    },
  });
  res.send('Data added successfully');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
