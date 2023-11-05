const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(cors());
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


//Kide fetch
let orgs = [
  {
    name: "TLK",
    kideUrl: "https://api.kide.app/api/companies/8216a1bc-760d-407b-9c77-5e26a041a25c",
    data: {}
  },
  {
    name: "HanSe SF",
    kideUrl: "https://api.kide.app/api/companies/90d58532-87be-4a30-b4e3-6053db20caa5",
    data: {}
  },
  {
    name: "Commedia rf",
    kideUrl: "https://api.kide.app/api/companies/b7b04c01-6c49-4c74-81da-9f4147aca6db",
    data: {}
  },
  {
    name: "Kult rf",
    kideUrl: "https://api.kide.app/api/companies/d12f83ed-8efa-40d9-8288-e62f1ac8fc43",
    data: {}
  }
]

const fetchKide = async () => {
  console.log("fetchKide()");


  try {
    orgs.forEach(org => {
      fetch(org.kideUrl)
        .then(res => res.json())
        .then(data => {
          org.data = data;
        })
    })

    const data = await res.json();
    this.kideData = data;
  }

  catch (error) {
    console.log("Could not fetch kide," + error);
  }
};

setInterval(fetchKide, 1000*60*60);

app.get('/api/getKide', async (res) => {
  const data = orgs;
  res.json(data);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
