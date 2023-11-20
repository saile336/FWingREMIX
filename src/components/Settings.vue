<template>
    <h2>Settings</h2>
    <div class="schedule-button-container">
        <button class="action-button" @click="toggleInputField">
            Add to Schedule
        </button>


        <input v-if="inputVisible" type="text" v-model="link" class="link-input" placeholder="Enter link here"
            @keyup.enter="saveLink" />

        <button class="action-button" @click="toggleDietOptions">
            Diet
        </button>

        <div v-if="showDietOptions" class="dietOptions">
            <button v-for="(selected, diet) in diets" :key="diet" :class="{ active: selected }" @click="selectDiet(diet)">
                {{ diet }}
            </button>
        </div>

        <button class="action-button" @click="toggleWidgetOptions">
            Widgets
        </button>

        <p v-if="showWidgetOptions" class="disclaimer">Choose up to 2 widgets:</p>

        <div v-if="showWidgetOptions" class="widgetOptions">
            <button v-for="(selected, widget) in widgets" :key="widget" :class="{ active: selected }"
                @click="selectWidget(widget)">
                {{ widget }}
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'AddScheduleButton',
    data() {
        return {
            inputVisible: false, // Check if we should show the link input
            link: '', // The link to be saved
            showDietOptions: false, // Controls visibility of diet options
            diets: { Milk: false, Laktos: false, Vege: false, Gluten: false },
            showWidgetOptions: false, // Controls visibility of widget options
            widgets: { Schedule: false, Menu: false, Events: false, Weather: false }
        };
    },
    methods: {
        toggleInputField() {
            this.inputVisible = !this.inputVisible;
        },
        saveLink() {
            localStorage.setItem('scheduleLink', this.link);
            this.inputVisible = false;
            this.link = ''; // Clearing input after saving
        },
        toggleDietOptions() {
            this.showDietOptions = !this.showDietOptions;
        },
        selectDiet(option) {
            this.diets[option] = !this.diets[option];
            localStorage.setItem('Diets', JSON.stringify(this.diets));
        },
        toggleWidgetOptions() {
            this.showWidgetOptions = !this.showWidgetOptions;
        },
        selectWidget(widget) {
            const selectedWidgets = this.countSelectedWidgets();
            if (!this.widgets[widget] && selectedWidgets >= 2) {
                return; // Do nothing if 2 widgets are already selected
            }
            this.widgets[widget] = !this.widgets[widget];
            localStorage.setItem('Widgets', JSON.stringify(this.widgets));
        },
        countSelectedWidgets() {
            return Object.values(this.widgets).filter(val => val).length;
        },
        loadSettings() {
            // Load saved settings for diets and widgets
            const savedDiets = localStorage.getItem('Diets');
            if (savedDiets) {
                this.diets = JSON.parse(savedDiets);
            }
            const savedWidgets = localStorage.getItem('Widgets');
            if (savedWidgets) {
                this.widgets = JSON.parse(savedWidgets);
            }
        }
    },
    mounted() {
        // Load saved settings when the component mounts
        this.loadSettings();
    }
}
</script>
  
<style scoped>
.schedule-button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    gap: 10px;
}

.action-button {
    background-color: #4054B2;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
}

.action-button:hover {
    background-color: #2D3A8C;
}

.link-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    width: 90%;
    margin-top: 10px;
}

.dietOptions button {
    margin: 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.dietOptions button.active {
    background-color: #4CAF50;
    color: white;
}

.dietOptions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.widgetOptions button {
    margin: 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.widgetOptions button.active {
    background-color: #4CAF50;
    color: white;
}

.widgetOptions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.widgetOptions .disclaimer {
    margin-bottom: 10px;
    font-size: 0.9em;
    color: #666;
}

.disclaimer {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 0.9em;
    color: white;
}
</style>
  