<script>

import TheClock from "./components/TheClock.vue";
import FetchKide from "./components/FetchKide.vue";
import DBTest from "./components/DBTest.vue";

export default {
  data() {
    return {
      orgs: [
        {
          name: "TLK",
          kideUrl: "https://api.kide.app/api/companies/8216a1bc-760d-407b-9c77-5e26a041a25c"
        },
        {
          name: "HanSe SF",
          kideUrl: "https://api.kide.app/api/companies/90d58532-87be-4a30-b4e3-6053db20caa5"
        },
        {
          name: "Commedia rf",
          kideUrl: "https://api.kide.app/api/companies/b7b04c01-6c49-4c74-81da-9f4147aca6db"
        },
        {
          name: "Kult rf",
          kideUrl: "https://api.kide.app/api/companies/d12f83ed-8efa-40d9-8288-e62f1ac8fc43"
        }
      ],

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

  <FetchKide :bim="orgs[currentOrg].kideUrl" :currentIndex="currentOrg" />
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
