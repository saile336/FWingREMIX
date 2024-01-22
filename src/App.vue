<script>
import axios from 'axios';
import TheClock from "./components/TheClock.vue";
import FetchKide from "./components/FetchKide.vue";
import DBTest from "./components/DBTest.vue";
import Navbar from "./components/Navbar.vue";
import FetchMenu from "./components/FetchMenu.vue";
import Classes from "./components/Classes.vue";
import Settings from "./components/Settings.vue";
import Widgets from "./components/Widgets.vue";
//import Register from "./components/Register.vue";

export default {
  data() {
    return {
      kideOrg: "",
      currentPage: "home",
      logoSrc: "src/assets/images/logos/TLK.png",
      enteredUsername: '', // Added data property for username input
      usernameCheckInProgress: false,
      usernameExists: false,
    };
  },
  mounted() {
    // Fetch the logo source from local storage when the component mounts
    this.loadAssociationLogoAndColor();
  },
  components: {
    TheClock,
    FetchKide,
    DBTest,
    Navbar,
    FetchMenu,
    Classes,
    Settings,
    Widgets,
    //Register,
  },
  methods: {
    checkUsername() {
    this.usernameCheckInProgress = true;
    axios.get(`http://localhost:3000/api/checkUsername/${this.enteredUsername}`)
      .then(response => {
        this.usernameCheckInProgress = false;
        this.usernameExists = response.data.exists;
        console.log('Response data:', response.data); // Log the response data
        if (this.usernameExists) {
          // Save the user ID in local storage
          localStorage.setItem('userId', response.data.user.user_id);
        }
      })
      .catch(error => {
        this.usernameCheckInProgress = false;
        console.error('Error during username check:', error);
      });
  },
  loginUser() {
        this.usernameCheckInProgress = true;

        axios.post('http://localhost:3000/api/login', {
            username: this.enteredUsername,
        })
        .then(response => {
            this.usernameCheckInProgress = false;
            
            if (response.data.login) {
                
                localStorage.setItem('userId', response.data.user_id);
               
                localStorage.setItem('user', JSON.stringify(response.data.user));
                this.fetchUserSettings(response.data.user_id);
                
                console.log('Login successful');
            } else {
               
                console.error('Invalid credentials');
            }
        })
        .catch(error => {
            this.usernameCheckInProgress = false;
            console.error('Error during login:', error);
        });
    },
    fetchUserSettings(user_id) {
        axios.get(`http://localhost:3000/api/getUserSettings/${user_id}`)
            .then(response => {
                const userSettings = response.data;
                localStorage.setItem('userSettings', JSON.stringify(userSettings));
           
                if (userSettings.widgets) {
                    localStorage.setItem('Widgets', JSON.stringify(userSettings.widgets));
                }

                if (userSettings.diets) {
                    localStorage.setItem('Diets', JSON.stringify(userSettings.diets));
                }

                if (userSettings.associations) {
                    localStorage.setItem('Associations', JSON.stringify(userSettings.associations));
                }

                console.log('User settings fetched successfully');
            })
            .catch(error => {
                console.error('Error fetching user settings:', error);
            });
    },
  /*getCurrentUserId() {
    // Retrieve the user ID from local storage
    return localStorage.getItem('userId');
  },*/

    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
    
    updatePage(page) {
      this.currentPage = page;
    },
    updateAssociation(associationKey) {
      this.updateLogoSrc(associationKey);
      this.updateBackgroundColor(associationKey);
    },
    updateLogoSrc(associationKey) {
      this.logoSrc = `src/assets/images/logos/${associationKey}.png`;
      // Save the selected logo in local storage
      localStorage.setItem("selectedLogo", this.logoSrc);
    },
    //some1 that sees color better than me can fix this
    updateBackgroundColor(associationKey) {
      let backgroundColor;
      let navColor;
      switch (associationKey) {
        case "TLK":
          backgroundColor = "rgb(30, 34, 170)";
          navColor = "#4b4ebb";
          break;
        case "HanSe":
          backgroundColor = "rgb(250,225,22)";
          navColor = "#ceba17";
          break;
        case "Hosk":
          backgroundColor = "rgb(41,105,55)";
          navColor = "#54875f";
          break;
        case "Kult":
          backgroundColor = "rgb(94, 189, 179)";
          navColor = "#4b9890";
          break;
        case "Commedia":
          backgroundColor = "rgb(214, 28, 14)";
          navColor = "#b11c11";
          break;
        default:
          backgroundColor = "rgb(30, 34, 170)"; // Default color
          navColor = "#4b4ebb";
      }
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.navColor = navColor;
    },
    
    loadAssociationLogoAndColor() {
      const savedAssociations = localStorage.getItem("Associations");
      if (savedAssociations) {
        const associations = JSON.parse(savedAssociations);
        const activeAssociation = Object.keys(associations).find(
          (key) => associations[key] === true
        );
        if (activeAssociation) {
          this.updateLogoSrc(activeAssociation);
          this.updateBackgroundColor(activeAssociation);
        }
      }
    },
  },

  watch: {
    associationColor(newValue) {
      // Update the background color when associationColor changes
      document.body.style.backgroundColor = newValue;
    },
    secondColor(newValue) {
      document.body.style.navColor = newValue;
    },
  },
};
</script>

<template>
  <div>
    <h1 id="title" v-show="currentPage === 'home'">Arcad<span>A</span>pp</h1>

    <img id="logo" :src="logoSrc" alt="logo" />


    <div v-show="currentPage === 'home'" id="homePage">
      <Widgets />
      <!-- <Register/> -->
    </div>
    <div v-show="currentPage === 'events'" id="kidePage">
      <FetchKide :bim="kideOrg" :widgetMode="false" />
    </div>

    <div v-show="currentPage === 'restaurants'" id="menuPage">
      <FetchMenu />
    </div>

    <div v-show="currentPage === 'calendar'" id="calendarPage">
      <Classes />
    </div>
    <div v-show="currentPage === 'settings'" id="settingsPage">
      <input type="text" v-model="enteredUsername" placeholder="Enter your username">
      <button :disabled="usernameCheckInProgress" @click="checkUsername">Check Username</button>
      <div v-if="usernameExists">Username exists!</div>
      <div v-else-if="!usernameExists && !usernameCheckInProgress">Username does not exist.</div>
      <!-- OBS! v-model = enteredUsername så skriv i båda fälten :P -->
      <input type="text" v-model="enteredUsername" placeholder="Login with username">
      <button class="action-button" @click="loginUser">Login</button>
      <Settings @associationSelected="updateAssociation" />
      
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
