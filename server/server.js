require('dotenv').config({ path: '../.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173', // Match the Vue app's URL. problem då server driftsätts? Länkarna måste iaf ändras i vue komponenter som kopplar sig localhost:3000 (register och fetch komponenter).
    credentials: true,                                                                          // skapa env variabel istället för att byta ut localhost:3000 manuellt överallt?
}));

app.use(bodyParser.json());

//communication test
app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

//Database connection
const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

//Test db connection in console
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Connected to database');
        console.log('Current timestamp:', res.rows[0].now);
    }
});

//Template som kan modifieras
app.put('/api/update', async (req, res) => {
    const { id, newField } = req.body;

    try {
        const result = await pool.query('UPDATE myTable SET field = $1 WHERE id = $2', [newField, id]);

        res.json({ message: 'Update successful', rowsAffected: result.rowCount });
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Template som kan modifieras för get
app.get('/api/get', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM myTable');

        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});
const createTableQuery = `
CREATE TABLE IF NOT EXISTS user_settings (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    diets JSONB,
    widgets JSONB,
    associations JSONB
    key VARCHAR(255)
);
`;

pool.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Table created successfully');
    }
});
app.get('/api/getUserSettings/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const result = await pool.query('SELECT * FROM user_settings WHERE user_id = $1', [user_id]);

        if (result.rows.length > 0) {
            const userSettings = result.rows[0];
            res.json(userSettings);
        } else {
            res.status(404).json({ message: 'User settings not found' });
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Check if username exists
app.get('/api/checkUsername/:username', async (req, res) => {
    const sanitizedUsername = req.params.username.replace(/[^a-z0-9\_\-]/gi, '');
    if (sanitizedUsername) {
        try {
            // Adjust the query for case-insensitive comparison if needed
            const result = await pool.query('SELECT * FROM user_settings WHERE LOWER(username) = LOWER($1)', [sanitizedUsername]);
            if (result.rows.length > 0) {
                res.json({ exists: true, user: result.rows[0] });
            } else {
                res.json({ exists: false });
            }
        } catch (err) {
            console.error('Error executing query', err.stack);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(400).json({ message: 'Invalid username format' });
    }
});
//Inloggning med username
app.post('/api/login', async (req, res) => {
    const { username } = req.body;

    try {
        const result = await pool.query('SELECT * FROM user_settings WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            // User exists
            res.json({ login: true, user_id: result.rows[0].user_id, user: result.rows[0] });
        } else {
            // User does not exist
            res.json({ login: false });
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Insert data into the table
app.post('/api/addUser', async (req, res) => {
    const { username } = req.body;

    try {
        const result = await pool.query('INSERT INTO user_settings (username) VALUES ($1) RETURNING *', [username]);

        if (result.rows.length > 0) {
            res.json({ user: result.rows[0] });
        } else {
            res.status(500).json({ message: 'Unable to create user' });
        }
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/api/updateUserSettings', async (req, res) => {
    const { user_id, widgets, diets, associations, weatherApiKey } = req.body;

    try {
        const result = await pool.query('UPDATE user_settings SET widgets = $1, diets = $2, associations = $3, weatherApiKey = $4 WHERE user_id = $5', [widgets, diets, associations, weatherApiKey, user_id]);

        res.json({ message: 'User settings update successful', rowsAffected: result.rowCount });
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ message: 'Internal server error' });
    }
});

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

    Hosk: {
        kideUrl: "https://api.kide.app/api/companies/45719a1d-a1ef-44a5-ab61-3d81f23614b5",
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

    const data = { name: orgs[name] };

    res.send(data);
});


//Restaurants
let restaurants = {
    arcada: {
        name: "Arcada",
        link: "https://www.compass-group.fi/menuapi/feed/json?costNumber=3003&language=en",
        menu: {},
    },
    diak: {
        name: "Diak",
        link: "https://www.compass-group.fi/menuapi/feed/json?costNumber=3104&language=en",
        menu: {},
    },
    unicafe: {
        name: "Unicafe",
        link: "https://unicafe.fi/wp-json/swiss/v1/restaurants?lang=en",
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
