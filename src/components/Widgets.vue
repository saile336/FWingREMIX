<template>
    <div class="Widgets">

        <Weather v-if="widgets.weather" />

        <div v-if="widgets.schedule">
            <p>schema</p>
        </div>

        <div v-if="widgets.menu">
            <p>menu</p>
        </div>

        <FetchKide v-if="widgets.events" :bim="kideOrg" :widgetMode="true" />

    </div>
</template>
  
<script>
import FetchKide from "./FetchKide.vue";
import Weather from "./Weather.vue";

export default {
    data() {
        return {
            widgets: {
                schedule: false,
                menu: false,
                events: false,
                weather: false,
            },
            kideOrg: "TLK", // Default value
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
        setActiveAssociation() {
            const associations = localStorage.getItem("Associations");
            if (associations) {
                const associationsParsed = JSON.parse(associations);
                for (const [key, value] of Object.entries(associationsParsed)) {
                    if (value) {
                        this.kideOrg = key;
                        break; // Stop at the first true value
                    }
                }
            }
        },
    },
    mounted() {
        this.checkForActiveWidgets();
        this.setActiveAssociation();
    },
};
</script>
  
<style scoped>
.Widgets {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

@media screen and (min-width: 768px) {
    .Widgets {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 50px;
    }
}
</style>
  