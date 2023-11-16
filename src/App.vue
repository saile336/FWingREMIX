<script>

import TheClock from "./components/TheClock.vue";
import FetchKide from "./components/FetchKide.vue";
import DBTest from "./components/DBTest.vue";
import Navbar from "./components/Navbar.vue";
import FetchMenu from "./components/FetchMenu.vue";
import Classes from "./components/Classes.vue";
import Settings from "./components/Settings.vue";

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
    <img id="logo" src="src/assets/images/logos/tlklogo-white.png" alt="tlklogo">

    <div id="dbTest">
        <DBTest /> <!-- hidden behind other shit but connection to server works, see console-->
    </div>

    <div v-show="currentPage === 'events'" id="kidePage">
        <FetchKide :bim="kideOrg" />
    </div>

    <div v-show="currentPage === 'restaurants'" id="menuPage">
        <FetchMenu />
    </div>

    <div v-show="currentPage === 'calendar'" id="menuPage">
        <Classes />
    </div>
    <div v-show="currentPage === 'settings'" id="menuPage">
        <Settings />
    </div>


    <div id="theClock" v-if="!isMobile()">
        <TheClock />
    </div>

    <Navbar :page="currentPage" @navbarHandler="updatePage" />
</template>

<style scoped>
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
