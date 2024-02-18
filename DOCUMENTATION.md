# Documentation for User Settings Component in Vue.js

This document provides comprehensive details on the AddScheduleButton Vue.js component, designed for managing user preferences including schedule links, dietary restrictions, widgets, and associations within a web application.

# Overview

The AddScheduleButton component allows users to customize their experience by selecting dietary preferences, widgets, and associations. It features a dynamic UI where users can add links to their schedules, choose dietary restrictions, select up to two widgets for their dashboard, and associate themselves with groups or organizations.

# Features

    Add Schedule Links: Users can add a link to their personal or professional schedules.
    Dietary Preferences: Users can select their dietary restrictions from a predefined list.
    Widget Selection: Users can choose up to two widgets to be displayed on their dashboard.
    Association Membership: Users can select their affiliation with groups or organizations from a list.

# Component Structure
# Template

The template consists of multiple button-triggered actions for showing input fields and menus for schedules, diets, widgets, and associations. Each section has its UI elements that are conditionally rendered based on user interactions.

# Script

Data Properties

    inputVisible: Controls the visibility of the schedule link input field.
    link: Temporarily stores the user's schedule link.
    showDietOptions, showWidgetOptions, showAssociationOptions: Control the visibility of their respective menus.
    diets, widgets, associations: Objects that store the user's selections for each category.

Methods

    toggleInputField(): Toggles the visibility of the schedule link input field.
    saveLink(): Saves the schedule link to localStorage and resets the input field.
    toggleDietOptions(), toggleWidgetOptions(), toggleAssociationOptions(): Toggle the visibility of their respective option menus.
    selectDiet(diet), selectWidget(widget), selectAssociation(association): Handle selection logic for diets, widgets, and associations, including saving these preferences to localStorage.
    countSelectedWidgets(): Counts the number of widgets selected by the user.
    updateUserSettings(): Updates user settings on the backend via an API call.

Lifecycle Hooks

    mounted(): On component mount, loads saved settings from localStorage and updates component state accordingly.

Style

Scoped CSS provides styles for the component, ensuring a responsive and user-friendly interface. It includes styles for buttons, input fields, and option menus, with active state styles for selections.
Usage

To use this component, include it within a parent component or Vue application. Ensure the backend endpoint for updating user settings (http://localhost:3000/api/updateUserSettings) is correctly configured to handle PUT requests as per the component's updateUserSettings method.

```html
<template>
  <div>
    <add-schedule-button></add-schedule-button>
  </div>
</template>

<script>
import AddScheduleButton from './components/AddScheduleButton.vue';

export default {
  name: 'App',
  components: {
    AddScheduleButton
  }
};
</script>
```
# Integration with Backend

The component makes a PUT request to update user settings. Ensure your backend is configured to receive JSON payloads and update user settings accordingly. The request includes user_id, widgets, diets, and associations as part of the request body.
Security Considerations

    Validate all inputs on the backend to prevent SQL injection and other common web vulnerabilities.
    Do not store sensitive information in localStorage as it's accessible through client-side scripts.