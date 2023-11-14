<script>

import TheClock from "./components/TheClock.vue";
import FetchKide from "./components/FetchKide.vue";
import DBTest from "./components/DBTest.vue";

export default {
  data() {
    return {
      
      kideOrg: "",

      currentOrg: 0,

    }
  },

  components: {
    TheClock,
    FetchKide,
    DBTest,

  },

  methods: {
 isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return true
   } else {
     return false
   }
 }
}
}

</script>

<template>
  <img id="logo" src="src/assets/images/tlklogo-white.png" alt="tlklogo">
  <div id="dbTest">
    <DBTest /> <!-- hidden behind other shit but connection to server works, see console-->
  </div>

  <div id="theClock" v-if="!isMobile()">
    <TheClock />
  </div>

  <div id="componentKide">
  <FetchKide :bim="kideOrg" />
</div>
</template>

<style scoped>
#componentKide{
  display:blocK;
  width: 50%;
}

#logo {
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-15%, -50%);
  height: 75%;
  width: auto;
  opacity: 0.3;
  z-index: -1;
  /* kan vara full opacity as well */
}

#theClock {
  position: absolute;
  top: 5vh;
  left: 2vw;
  height: fit-content;
  width: fit-content;
}
</style>
