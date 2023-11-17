const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const port = 3000;

const prisma = new PrismaClient()

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
        //database query to check the connection
        const user = await prisma.users.findFirst();
        
        if (user) {
          res.json({ message: 'Database connection successful' });
        } else {
          res.json({ message: 'Database connection failed' });
        }
      } catch (error) {
        console.error('Error testing database connection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});
//Fungerande sätt att lägga till user till users collection i db via Register.vue component, however onödigt
app.post('/api/register', async (req, res) => {
    const { username } = req.body;

    try {
        const newUser = await prisma.users.create({
            data: {
                username,
            },
        });

        res.json({ message: 'User registered successfully', users: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Hitta på hur man kan få ut nödvändig info av en CGI inloggning
async placeHolder =>{
const authenticatedUser = {
    username: '',
    
  };
  
  // Spara sedan den infon till DB
  const newUser = await prisma.user.create({
    data: {
      username: authenticatedUser.username,
    },
  });
} 
  // Implementera jwt token?
  /*
  const token = jwt.sign({ userId: newUser.id, username: newUser.username }, 'your-secret-key');
  
  // Send the token to the client
  res.json({ token });
*/

//Organisationer för kide fetch
let orgs = {
    TLK:
    {
        kideUrl: "https://api.kide.app/api/companies/8216a1bc-760d-407b-9c77-5e26a041a25c",
        kideData: {}
    },

    HanSe:
    {
        kideUrl: "https://api.kide.app/api/companies/90d58532-87be-4a30-b4e3-6053db20caa5",
        kideData: {}
    },

    Commedia:
    {
        kideUrl: "https://api.kide.app/api/companies/b7b04c01-6c49-4c74-81da-9f4147aca6db",
        kideData: {}
    },

    Kult:
    {
        kideUrl: "https://api.kide.app/api/companies/d12f83ed-8efa-40d9-8288-e62f1ac8fc43",
        kideData: {}
    }
}

const fetchKide = async () => {
    console.log("fetchKide()");

    try {
        for (const org in orgs) {
            await fetch(orgs[org].kideUrl)
                .then(res => res.json())
                .then(data => {
                    orgs[org].kideData = data;
                })
        }
    }

    catch (error) {
        console.log("Could not fetch kide," + error);
    }
};

//Run on startup och refresh varje timme
fetchKide();
setInterval(fetchKide, 1000 * 60 * 60);


//Fetch all current kide data
app.get('/api/getKide', async (req, res) => {
    const data = orgs;

    res.send(data);
});


//Fetch specific kide data by name OBS case sensitive
app.get('/api/getKide/:name', async (req, res) => {
    const name = req.params.name;

    const data = orgs[name];

    res.send(data);
});


//Restaurants
let restaurants = {
    arcada: {
        name: "Arcada",
        link: "https://www.compass-group.fi/menuapi/feed/json?costNumber=3003&language=sv-FI",
        menu: {},
    },
    diak: {
        name: "Diak",
        link: "https://www.compass-group.fi/menuapi/feed/json?costNumber=3104&language=sv-FI",
        menu: {},
    },
    unicafe: {
        name: "Unicafe",
        link: "https://unicafe.fi/wp-json/swiss/v1/restaurants?lang=sv",
        menu: {},
    },
}

const corsproxy = "https://corsproxy.io/?";

const fetchRestaurants = async () => {
    console.log("fetchRestaurants()");
    try {
        for (const restaurant in restaurants) {
            const response = await fetch(corsproxy + restaurants[restaurant].link);
            const data = await response.json();
            restaurants[restaurant].menu = data;
        }
    } catch (error) {
        console.log("Could not fetch restaurants," + error);
    }
};

fetchRestaurants();

app.get('/api/getMenu', async (req, res) => {
    const data = restaurants;

    res.send(data);
});

app.get('/api/getMenu/:restaurant', async (req, res) => {
    const restaurant = req.params.restaurant;

    const data = restaurants[restaurant].menu;

    res.send(data);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
