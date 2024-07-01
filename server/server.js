

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
