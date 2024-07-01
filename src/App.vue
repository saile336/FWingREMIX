<script>
import axios from 'axios';
import FetchKide from "./components/FetchKide.vue";
import Navbar from "./components/Navbar.vue";
import FetchMenu from "./components/FetchMenu.vue";
import Classes from "./components/Classes.vue";
import Settings from "./components/Settings.vue";
import Widgets from "./components/Widgets.vue";

export default {
    data() {
        return {
            kideOrg: "",
            currentPage: "home",
            logoSrc: "src/assets/images/logos/TLK.png",
        };
    },
    mounted() {
        // Fetch the logo source from local storage when the component mounts
        this.loadAssociationLogoAndColor();

    },
    components: {
        FetchKide,
        Navbar,
        FetchMenu,
        Classes,
        Settings,
        Widgets,
    },

    methods: {
        fetchUserSettings(user_id) {
            return axios.get(`http://localhost:3000/api/getUserSettings/${user_id}`)
                .then(response => {
                    const userSettings = response.data;
                    // Update localStorage
                    localStorage.setItem('userSettings', JSON.stringify(userSettings));


                    if (userSettings.scheduleLink) {
                        localStorage.setItem('scheduleLink', userSettings.scheduleLink);
                    }

                    // Update state for widgets, diets, and associations
                    if (userSettings.widgets) {
                        localStorage.setItem('Widgets', JSON.stringify(userSettings.widgets));
                    }
                    if (userSettings.diets) {
                        localStorage.setItem('Diets', JSON.stringify(userSettings.diets));
                    }
                    if (userSettings.associations) {
                        localStorage.setItem('Associations', JSON.stringify(userSettings.associations));
                        // Assuming you have methods to update UI based on these settings:
                        this.updateWidgets(userSettings.widgets);
                        this.updateDiets(userSettings.diets);
                        this.updateAssociations(userSettings.associations);
                    }

                    console.log('User settings fetched successfully');
                })
                .catch(error => {
                    console.error('Error fetching user settings:', error);
                });

        },

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
                    backgroundColor = "rgb(255,255,255)"; // Default color
                    navColor = "#FFFFFF";
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
                    //this.updateBackgroundColor(activeAssociation);
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
        <!--<h1 id="title" v-show="currentPage === 'home'">Arcad<span>A</span>pp</h1>-->

        <img id="logo" :src="logoSrc" alt="logo" />

        <div v-show="currentPage === 'home'" id="homePage">
            <Widgets />

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

            <Settings @associationSelected="updateAssociation" />

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

#logo {
    height: auto;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-20%, -50%);
    height: 75%;
    width: auto;
    opacity: .5;
    z-index: -1;
    /* kan vara full opacity as well */
}
</style>
