<template>
  <div class="Widgets">
   
    <Weather v-if="widgets.weather"/>
    <div v-if="widgets.schedule"><p>schema</p></div>
    <div v-if="widgets.menu"><p>menu</p></div>
    <FetchKide v-if="widgets.events" :bim="kideOrg" />
   
  </div>
</template>

<script>
import FetchKide from "./FetchKide.vue";
import Weather from "./Weather.vue";

export default {
  data() {
    return {
      widgets: {
        events: false,
        weather: false,
        schedule: false,
        menu: false,
        
      },
      kideOrg: "", 
    };
  },
  components: {
    FetchKide,
    Weather,
    
  },
  methods: {
    switchWidget(widgetName, isActive) {
      if (this.widgets.hasOwnProperty(widgetName)) {
        this.widgets[widgetName] = isActive;
      }
    },
    checkForActiveWidgets() {
      const widgets = localStorage.getItem("Widgets");
      if (widgets) {
        const widgetsParsed = JSON.parse(widgets);
        for (const widgetName in widgetsParsed) {
          if (widgetsParsed.hasOwnProperty(widgetName)) {
            this.switchWidget(
              widgetName.toLowerCase(),
              widgetsParsed[widgetName]
            );
          }
        }
      }
    },
  },
  mounted() {
    this.checkForActiveWidgets();
  },
};
</script>
<style scoped>
.Widgets {
  display: flex;
  flex-direction: row;
  width: 100%;
}


</style>