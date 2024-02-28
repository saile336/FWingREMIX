<template>
    <div class="schedule-button-container">
        <button class="action-button" @click="toggleInputField">Add to Schedule</button>
        <input v-if="inputVisible" type="text" v-model="scheduleLink" class="link-input"
            placeholder="Enter link here and press Enter" @keyup.enter="savescheduleLink" />

        <button class="action-button" @click="toggleDietOptions">Diet</button>
        <div v-if="showDietOptions" class="dietOptions">
            <button v-for="(selected, diet) in diets" :key="diet" :class="{ active: selected }" @click="selectDiet(diet)">
                {{ diet }}
            </button>
        </div>

        <button class="action-button" @click="toggleWidgetOptions">Widgets</button>
        <p v-if="showWidgetOptions" class="disclaimer">Choose up to 2 widgets:</p>
        <div v-if="showWidgetOptions" class="widgetOptions">
            <button v-for="(selected, widget) in widgets" :key="widget" :class="{ active: selected }"
                @click="selectWidget(widget)">
                {{ widget }}
            </button>
        </div>

        <button class="action-button" @click="toggleAssociationOptions">Associations</button>
        <div v-if="showAssociationOptions" class="associationOptions">
            <button v-for="(selected, association) in associations" :key="association" :class="{ active: selected }"
                @click="selectAssociation(association)">
                {{ association }}
            </button>
        </div>

        <!-- New button and input field for Weather API Key -->
        <button class="action-button" @click="toggleWeatherApiKeyField">Add Weather API Key</button>
        <input v-if="weatherApiKeyVisible" type="text" v-model="weatherApiKey" class="link-input"
            placeholder="Enter Weather API Key here and press Enter" @keyup.enter="saveWeatherApiKey" />

        <button class="action-button" @click="updateUserSettings">Update User Settings</button>
    </div>
</template>

<script>
export default {
    name: 'AddScheduleButton',
    data() {
        return {
            inputVisible: false,
            scheduleLink: '',
            showDietOptions: false,
            diets: { Milk: false, Laktos: false, Vege: false, Gluten: false },
            showWidgetOptions: false,
            widgets: { Schedule: false, Menu: false, Events: false, Weather: false },
            showAssociationOptions: false,
            associations: { TLK: false, HanSe: false, Hosk: false, Kult: false, Commedia: false },
            weatherApiKeyVisible: false, // New state for Weather API Key input visibility
            weatherApiKey: '', // New state for storing the Weather API Key
        };
    },
    methods: {
        toggleInputField() {
            this.inputVisible = !this.inputVisible;
        },
        savescheduleLink() {
        localStorage.setItem('scheduleLink', this.scheduleLink); // Save scheduleLink to local storage
        this.inputVisible = false;
        this.scheduleLink = ''; // Clear the input field after saving
        this.updateUserSettings(); // Call the updateUserSettings method to save the scheduleLink to the database
    },
        toggleDietOptions() {
            this.showDietOptions = !this.showDietOptions;
        },
        selectDiet(diet) {
            this.diets[diet] = !this.diets[diet];
            localStorage.setItem('Diets', JSON.stringify(this.diets));
        },
        toggleWidgetOptions() {
            this.showWidgetOptions = !this.showWidgetOptions;
        },
        selectWidget(widget) {
            const selectedWidgets = this.countSelectedWidgets();
            if (!this.widgets[widget] && selectedWidgets >= 2) {
                return;
            }
            this.widgets[widget] = !this.widgets[widget];
            localStorage.setItem('Widgets', JSON.stringify(this.widgets));
        },
        countSelectedWidgets() {
            return Object.values(this.widgets).filter(val => val).length;
        },
        toggleAssociationOptions() {
            this.showAssociationOptions = !this.showAssociationOptions;
        },
        selectAssociation(association) {
            Object.keys(this.associations).forEach((key) => {
                this.associations[key] = false;
            });
            this.associations[association] = true;
            localStorage.setItem('Associations', JSON.stringify(this.associations));
            this.$emit('associationSelected', association);
        },
        // New method for toggling Weather API Key input field visibility
        toggleWeatherApiKeyField() {
            this.weatherApiKeyVisible = !this.weatherApiKeyVisible;
        },
        // New method for saving the Weather API Key to local storage
        saveWeatherApiKey() {
            localStorage.setItem('weatherApiKey', this.weatherApiKey);
            this.weatherApiKeyVisible = false;
            this.weatherApiKey = '';
            this.updateUserSettings();
        },
        async updateUserSettings() {
        const user_id = localStorage.getItem('userId');
        const widgets = localStorage.getItem('Widgets');
        const diets = localStorage.getItem('Diets');
        const associations = localStorage.getItem('Associations');
        const weatherApiKey = localStorage.getItem('weatherApiKey');
        const scheduleLink = localStorage.getItem('scheduleLink'); 

        try {
            const response = await fetch('http://localhost:3000/api/updateUserSettings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, widgets, diets, associations, weatherApiKey, scheduleLink }), // Include scheduleLink in the request body
            });

            const result = await response.json();

            if (result.rowsAffected > 0) {
                console.log('User settings update successful');
            } else {
                console.error('User settings update failed');
            }
        } catch (error) {
            console.error('Error updating user settings', error);
        }
    },
    },
    mounted() {
        const savedDiets = localStorage.getItem('Diets');
        if (savedDiets) {
            this.diets = JSON.parse(savedDiets);
        }
        const savedWidgets = localStorage.getItem('Widgets');
        if (savedWidgets) {
            this.widgets = JSON.parse(savedWidgets);
        }
        const savedAssociations = localStorage.getItem('Associations');
        if (savedAssociations) {
            this.associations = JSON.parse(savedAssociations);
        }
        // Load saved Weather API Key from local storage on component mount
        const savedWeatherApiKey = localStorage.getItem('weatherApiKey');
        if (savedWeatherApiKey) {
            this.weatherApiKey = savedWeatherApiKey;
        }
        const savedscheduleLink = localStorage.getItem('scheduleLink');
        if (savedscheduleLink) {
            this.scheduleLink = savedscheduleLink;
        }
    }
};
</script>
  
<style scoped>
.schedule-button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 400px;
    gap: 40px;
}

.action-button {
    background-color: #4054B2;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 15px 30px;
    font-size: 18px;
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

.associationOptions button {
    /* combine these with rest of css */

    margin: 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.associationOptions button.active {

    background-color: #4CAF50;
    color: white;
}

.associationOptions {

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}</style>
  