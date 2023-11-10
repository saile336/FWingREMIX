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

  }
}

</script>

<template>
  <img id="logo" src="src/assets/images/tlklogo-white.png" alt="tlklogo">
  <div id="dbTest">
    <DBTest /> <!-- hidden behind other shit but connection to server works, see console-->
  </div>

  <div id="theClock">
    <TheClock />
  </div>

  <FetchKide :bim="kideOrg" />
</template>

<style scoped>
#logo {
  max-width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width: 500px;
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
