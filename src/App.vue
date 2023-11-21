<script>
import TheClock from "./components/TheClock.vue";
import FetchKide from "./components/FetchKide.vue";
import DBTest from "./components/DBTest.vue";
import Navbar from "./components/Navbar.vue";
import FetchMenu from "./components/FetchMenu.vue";
import Classes from "./components/Classes.vue";
import Settings from "./components/Settings.vue";
//import Register from "./components/Register.vue";

export default {
  data() {
    return {
      kideOrg: "",
      currentPage: 'home',
      logoSrc: 'src/assets/images/logos/TLK.png',
    }
  },
  mounted() {
    this.updateLogoSrc();
  },
  components: {
    TheClock,
    FetchKide,
    DBTest,
    Navbar,
    FetchMenu,
    Classes,
    Settings,
    // Register,
  },
  methods: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    updatePage(page) {
      this.currentPage = page;
    },
    updateLogoSrc() {
      const associations = JSON.parse(localStorage.getItem('Associations'));
      if (associations) {
        for (const [key, value] of Object.entries(associations)) {
          if (value) {
            this.logoSrc = `src/assets/images/logos/${key}.png`;
            console.log(`Logo updated to: ${this.logoSrc}`);
            return;
          }
        }
      }
      // If no association is true or the 'Associations' item is not found
      console.log('No matching association found, using default logo');
      this.logoSrc = 'src/assets/images/logos/TLK.png'; 
    },
  },
  computed: {
  associationColor() {
    const associations = JSON.parse(localStorage.getItem('Associations'));
    let backgroundColor = 'rgb(30, 34, 170)'; // Default color
    
    if (associations) {
      if (associations.TLK) backgroundColor = 'rgb(30, 34, 170)';
      if (associations.Hanse) backgroundColor = 'rgb(255, 165, 0)';
      if (associations.Hosk) backgroundColor = 'rgb(60, 179, 113)';
      if (associations.Kult) backgroundColor = 'rgb(128, 128, 128)';
      if (associations.Commedia) backgroundColor = 'rgb(255, 0, 0)';
    }

    // Update the background color here
    document.body.style.backgroundColor = backgroundColor;

    return backgroundColor;
  },
},
  watch: {
    associationColor(newValue) {
      // Update the background color when associationColor changes
      document.body.style.backgroundColor = newValue;
    },
  },
}
</script>

<template>
    <div>
        <div :style="{ backgroundColor: associationColor }"></div>
        <h1 id="title" v-show="currentPage === 'home'">Arcad<span>A</span>pp</h1>

        <img id="logo" :src="logoSrc" alt="logo">

        <div id="dbTest">
            <DBTest /> <!-- hidden behind other shit but connection to server works, see console-->
        </div>
        <!--<div id="register">
            <Register />
        </div>-->

        <div v-show="currentPage === 'events'" id="kidePage">
            <FetchKide :bim="kideOrg" />
        </div>

        <div v-show="currentPage === 'restaurants'" id="menuPage">
            <FetchMenu />
        </div>

        <div v-show="currentPage === 'calendar'" id="calendarPage">
            <Classes />
        </div>
        <div v-show="currentPage === 'settings'" id="settingsPage">
            <Settings />
        </div>


        <div id="theClock" v-if="!isMobile()">
            <TheClock />
        </div>

        <Navbar :page="currentPage" @navbarHandler="updatePage" />
    </div>
</template>

<style scoped>
#title {
    color: white;
    font-size: 50px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 400;
}

#title:first-letter,
#title span {
    font-size: 55px;
}

#theClock {
    position: absolute;
    top: 5vh;
    left: 2vw;
    height: fit-content;
    width: fit-content;
}

#kidePage {
    display: blocK;
    width: 50%;
}

#logo {
    height: auto;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-20%, -50%);
    height: 75%;
    width: auto;
    opacity: 0.2;
    z-index: -1;
    /* kan vara full opacity as well */
}
</style>