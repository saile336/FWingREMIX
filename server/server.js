const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(bodyParser.json());
// byt ut your_table, column1, och column2 till faktiska tabeller och kolumner
app.get('/api/getData', async (req, res) => {
  const data = await prisma.your_table.findMany();
  res.json(data);
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
