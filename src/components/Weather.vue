<script>
export default {
  data() {
    return {
      city: "Helsinki",
      country: "Finland",
      weatherDesc: "",
      weatherImg: "",
      temperature: "",
      wind: "",
      weatherIcon: "",
      key: "", // API key will be set from localStorage
    };
  },
  methods: {
    getWeather() {
      // Check if the API key exists in local storage and use it
      const storedKey = localStorage.getItem('weatherApiKey');
      if (!storedKey) {
        console.error('Weather API key is not set.');
        return;
      }

      this.key = storedKey;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?&q=${this.city},${this.country}&units=metric&appid=${this.key}`
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          this.weatherDesc = json.weather[0].description;
          this.temperature = json.main.temp;
          this.wind = json.wind.speed;
          this.weatherIcon = json.weather[0].icon;
          this.weatherImg =
            "http://openweathermap.org/img/w/" + this.weatherIcon + ".png";
        }).catch((error) => {
          console.error('Failed to fetch weather data:', error);
        });
    },
  },
  mounted() {
    this.getWeather();
  },
};
</script>

<template>
  <div id="weatherbox">
    <h1>Current Weather in {{ city }}, {{ country }}</h1>
    <div>
      <img :src="weatherImg" :alt="weatherDesc" />
      <p>{{ weatherDesc }}</p>
      <p>Temperature: {{ temperature }}°C</p>
      <p>Wind Speed: {{ wind }} m/s</p>
    </div>
  </div>
</template>

<style scoped>
#weatherbox {
  background-color: white;
  /*opacity: 0.7;*/
  padding: 20px;
  border-radius: 10px;
  width: 230px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
img {
  width: 100px;
  height: 100px;
}
</style>