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

        }
    },

    components: {
        TheClock,
        FetchKide,
        DBTest,
        Navbar,
        FetchMenu,
        Classes,
        Settings,
        //Register,

    },

    methods: {
        isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true
            } else {
                return false
            }
        },

        updatePage(page) {
            console.log("updatePage");
            this.currentPage = page;
        },

    }
}

</script>

<template>
    <h1 id="title" v-show="currentPage ==='home'">Arcad<span>A</span>pp</h1>

    <img id="logo" src="src/assets/images/logos/tlklogo-white.png" alt="tlklogo">

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
</template>

<style scoped>
#title{
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

#title:first-letter, #title span {
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
