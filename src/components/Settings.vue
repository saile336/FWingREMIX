<template>
    <!-- Main container for schedule buttons and associated options -->
    <div class="schedule-button-container">
        <!-- Button to toggle input field for adding schedule links -->
        <button class="action-button" @click="toggleInputField">Add to Schedule</button>
        <!-- Input field for adding schedule links, visible when inputVisible is true -->
        <input v-if="inputVisible" type="text" v-model="link" class="link-input" placeholder="Enter link here" @keyup.enter="saveLink" />

        <!-- Button to toggle diet options menu -->
        <button class="action-button" @click="toggleDietOptions">Diet</button>
        <!-- Diet options, displayed when showDietOptions is true -->
        <div v-if="showDietOptions" class="dietOptions">
            <!-- Buttons for each diet option, toggles selection state on click -->
            <button v-for="(selected, diet) in diets" :key="diet" :class="{ active: selected }" @click="selectDiet(diet)">
                {{ diet }}
            </button>
        </div>

        <!-- Button to toggle widget options menu -->
        <button class="action-button" @click="toggleWidgetOptions">Widgets</button>
        <!-- Disclaimer for widget selection, visible when showWidgetOptions is true -->
        <p v-if="showWidgetOptions" class="disclaimer">Choose up to 2 widgets:</p>
        <!-- Widget options, displayed when showWidgetOptions is true -->
        <div v-if="showWidgetOptions" class="widgetOptions">
            <!-- Buttons for each widget option, toggles selection state on click -->
            <button v-for="(selected, widget) in widgets" :key="widget" :class="{ active: selected }" @click="selectWidget(widget)">
                {{ widget }}
            </button>
        </div>

        <!-- Button to toggle association options menu -->
        <button class="action-button" @click="toggleAssociationOptions">Associations</button>
        <!-- Association options, displayed when showAssociationOptions is true -->
        <div v-if="showAssociationOptions" class="associationOptions">
            <!-- Buttons for each association option, toggles selection state on click -->
            <button v-for="(selected, association) in associations" :key="association" :class="{ active: selected }" @click="selectAssociation(association)">
                {{ association }}
            </button>
        </div>
        <button class="action-button" @click="updateUserSettings">Update User Settings</button>
    </div>
</template>

<script>
export default {
    name: 'AddScheduleButton',
    data() {
        // Component state variables
        return {
            inputVisible: false,  // Controls visibility of the link input field
            link: '',             // Stores the schedule link input by the user
            showDietOptions: false,  // Controls visibility of diet options menu
            diets: { Milk: false, Laktos: false, Vege: false, Gluten: false },  // Diet options state
            showWidgetOptions: false,  // Controls visibility of widget options menu
            widgets: { Schedule: false, Menu: false, Events: false, Weather: false },  // Widget options state
            showAssociationOptions: false,  // Controls visibility of association options menu
            associations: { TLK: false, HanSe: false, Hosk: false, Kult: false, Commedia: false },  // Association options state
        };
    },
    methods: {
        // Toggles visibility of the link input field
        toggleInputField() {
            this.inputVisible = !this.inputVisible;
        },
        // Saves the entered link to local storage and hides the input field
        saveLink() {
            localStorage.setItem('scheduleLink', this.link);
            this.inputVisible = false;
            this.link = '';
        },
        // Toggles visibility of diet options menu
        toggleDietOptions() {
            this.showDietOptions = !this.showDietOptions;
        },
        // Toggles selection state of a diet option and updates local storage
        selectDiet(diet) {
            this.diets[diet] = !this.diets[diet];
            localStorage.setItem('Diets', JSON.stringify(this.diets));
        },
        // Toggles visibility of widget options menu
        toggleWidgetOptions() {
            this.showWidgetOptions = !this.showWidgetOptions;
        },
        // Toggles selection state of a widget and limits selection to 2 widgets
        selectWidget(widget) {
            const selectedWidgets = this.countSelectedWidgets();
            if (!this.widgets[widget] && selectedWidgets >= 2) {
                return;
            }
            this.widgets[widget] = !this.widgets[widget];
            localStorage.setItem('Widgets', JSON.stringify(this.widgets));
        },
        // Counts the number of selected widgets
        countSelectedWidgets() {
            return Object.values(this.widgets).filter(val => val).length;
        },
        // Toggles visibility of association options menu
        toggleAssociationOptions() {
            this.showAssociationOptions = !this.showAssociationOptions;
        },
        // Selects an association and updates local storage, allowing only one selection
        selectAssociation(association) {
            Object.keys(this.associations).forEach((key) => {
                this.associations[key] = false;
            });
            this.associations[association] = true;
            localStorage.setItem('Associations', JSON.stringify(this.associations));
            this.$emit('associationSelected', association);
        },
     async updateUserSettings() {
      const user_id = localStorage.getItem('userId'); 
      const widgets = localStorage.getItem('Widgets'); 
      const diets = localStorage.getItem('Diets');
      const associations = localStorage.getItem('Associations');

      try {
        const response = await fetch('http://localhost:3000/api/updateUserSettings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, widgets, diets, associations }),
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
        // Load saved settings from local storage on component mount
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
    }
}
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
}
</style>
  