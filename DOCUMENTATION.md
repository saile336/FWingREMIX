# App Documentation

The "App" segment of the project primarily focuses on the Vue.js frontend application, detailing the architecture, navigation, state management, and key components that facilitate user interaction and functionality within the application.

## Overview

The frontend application is designed as a single-page application (SPA) using Vue.js to provide a dynamic and responsive user experience. The application integrates with the backend server via API calls to fetch and manipulate data, including user settings, kide events, weather, and restaurant menus.
### Project Setup

    Framework: Vue.js
    HTTP Requests: Axios for API calls

### Installation and Running Locally

    Ensure Node.js and npm are installed.
    Clone the project repository.
    Install dependencies:

```bash
npm install
```
    Run the application locally:
```bash
 npm run dev
```

    The application will be available at http://localhost:5173.

## Directory Structure

    src/
        assets/: Static assets like images and global styles.
        components/: Vue components for specific features (e.g., weather display, settings form).
        App.vue: The main application component that ties everything together.
        main.js: The entry point for the Vue application.

## Key Components

    NavBar: Handles user navigation across different parts of the application.
    Settings: Allows users to update their preferences and settings.
    Weather: Displays weather information based on the user's location.
    FetchKide: Shows upcoming events fetched from the backend.
    FetchMenu: Shows lunch menus from student restaurants near Arcada.

## API Integration

    Axios: Used for sending HTTP requests to the backend API.
    Example Call: Fetching user settings

```javascript

    axios.get(`/api/getUserSettings/${userId}`)
         .then(response => {
           // Handle success
           console.log(response.data);
         })
         .catch(error => {
           // Handle error
           console.error(error);
         });
```

### Security Considerations

    Ensure all user input is validated before submission to prevent XSS attacks.
    Use HTTPS for all API calls to secure data in transit.

### Future Enhancements

    Implementing more dynamic components based on user feedback.
    Expanding the application's functionality with additional APIs and integrations.

This documentation provides a foundation for understanding and working with the Vue.js frontend part of the application. Further details should be added as the application evolves and new features are implemented.

# Documentation for FetchMenu.vue

The FetchMenu.vue component is designed for fetching and displaying restaurant menus. It interacts with the backend, which in turn fetches from the restaurants own APIs to retrieve daily or weekly menus and presents them in a user-friendly format within a Vue.js application. This documentation outlines its core functionalities based on the provided code snippets.

## Methods

    fetchRestaurants(): This method is crucial for asynchronously fetching the restaurant menus. Updates the isDataFetched property to true upon completion, which lets Vue render the component.

    formatDate(date): A utility method that formats the date as required by the Unicafe API endpoint for fetching menus.

    desiredDateHandler(bim): A method that adjusts the desiredDate based on user interaction, allowing for navigation through different dates' menus.

    findUnicafeDate(list): Checks unicafe array of objects' dates for date that corresponds to desiredDate, returns index of object with that date.

    restaurantSelect(nam): Handles user selection of a specific restaurant from the displayed list, potentially triggering a detailed view of the selected restaurant's menu.

    getLunchData(restaurant): Processes and returns the lunch data for a given restaurant, tailored to handle different data structures depending on the restaurant (e.g., Unicafe's unique format).


# Documentation for Weather.vue

Weather.vue is a Vue.js component designed to fetch and display weather information based on a user's location or a specified location. It communicates with a weather API to retrieve current conditions, forecasts, and other relevant meteorological data, presenting it in a user-friendly interface. This documentation outlines its core functionalities based on the provided code snippets.

## Methods

    fetchWeather(): This method performs the core functionality of asynchronously fetching weather data from the specified API. It would set isLoading to true at the start, make an HTTP GET request to the weather API with the appropriate query parameters (e.g., location, API key, units), then process the response to update weatherData and reset isLoading to false. Error handling would update the error property.

    formatWeatherData(response): A utility method to process and format the raw response from the weather API into a more usable structure for the component. This could involve mapping response data to weatherData properties, converting temperature units, or parsing forecast data.


# Documentation for TheClock.vue

TheClock.vue is a Vue.js component designed to display a real-time clock, showing the current time to users.

### Methods

    TheClock(): This method is responsible for updating the current time at a set interval of 1 second. It retrieves the current system time, formats it appropriately.

### Lifecycle Hooks

    mounted(): Upon mounting the component, this lifecycle hook initiates the TheClock() method at a regular interval using setInterval(). This ensures that the clock starts and continues to display the current time accurately as long as the component is mounted.


# Documentation for Widgets.vue

Widgets.vue is a Vue.js component designed to manage and render a collection of widgets on a user interface. It orchestrates the display of various widgets based on user preferences or application settings.
## verview

The Widgets.vue component serves as a container for multiple widgets, each representing a distinct piece of information or functionality. It dynamically renders these widgets based on their activation status, which is determined by user preferences stored in local storage.
Template

The template section of Widgets.vue defines the layout and structure of the widget container. It conditionally renders different types of widgets based on their activation status. Currently supported widgets include weather, schedule, menu, and events fetched from the Kide API.
### Data

The widgets data object stores the activation status of each supported widget. Initially, all widgets are deactivated (set to false). The kideOrg data property specifies the organization used for fetching events from the Kide API, with a default value of "TLK".
Methods

    switchWidget(widgetName, isActive): This method toggles the activation status of a widget specified by widgetName. It updates the widgets data object accordingly.
    checkForActiveWidgets(): This method reads user preferences stored in local storage and activates widgets based on the retrieved settings.
    setActiveAssociation(): This method determines the active association (organization) for fetching events from the Kide API by reading user preferences from local storage.

### Lifecycle Hooks

The mounted() lifecycle hook is used to initialize the component when it is mounted. It triggers the retrieval of user preferences and association settings, activating the corresponding widgets and configuring the Kide API fetch accordingly.

# Documentation for FetchKide.vue

The FetchKide.vue component is designed to fetch and display Kide event data from the backend.

### Props

FetchKide.vue accepts two props for customization and control:

    bim: A String indicating the organization or category of events to fetch. This prop allows the component to request specific events related to a given organization from the Kide platform.
    widgetMode: A Boolean that adjusts the display mode of the component. When true, it alters the layout to fit within a widget space, changing its style or the amount of information displayed.

### Data

The component maintains an internal state that includes:

    kideData: An object to store the fetched events. It's structured to hold events categorized by organizations.
    imgUrl: A String holding the base URL for event images. This URL is prepended to image paths returned by the API to construct the full image URLs.
    qr: A String containing the base URL for QR codes associated with events. This base URL is used in conjunction with event-specific data to direct users to more detailed event pages.
    isDataFetched: A Boolean indicating whether the event data has been successfully fetched from the API.

### Methods

    fetchApi(bim): An asynchronous method that performs an API request to the backend to retrieve events based on the bim prop. If no bim prop is provided all events are fetched. Upon receiving the data, it updates kideData and sets isDataFetched to true.
    clickHandler(id): A method that is triggered when an event is clicked. It uses the event id to navigate the user to the event's detailed page on the Kide platform.
    getBackgroundColor(forening): Determines the background color for an event element based on the organization (forening) it's associated with. This method returns an object with CSS styles.

### Mounted Hook

    The component uses the mounted lifecycle hook to call fetchApi(this.bim) when the component is mounted to the DOM, initiating the fetch operation with the current bim prop value.

### Template and Styling

    The template iterates over kideData, displaying each event with its associated image, name, and date. It applies dynamic styles for background colors using getBackgroundColor.
    Events are rendered as clickable elements, with the clickHandler method bound to the click event to handle navigation.
    The component uses scoped CSS for styling, ensuring that its styles do not leak into the global scope. This includes styles for event presentation, image formatting, and conditional styling based on the widgetMode prop.

### Example Usage

```html

<FetchKide :bim="organizationKey" :widgetMode="false" />
```
This usage example demonstrates how to embed the FetchKide component into a parent component, passing the organization key and widget mode as props.

# Documentation for Classes.vue 

The Classes.vue component, in the context of fetching and displaying a user's schedule, is designed to interface with an external source, typically a backend server, to retrieve and present schedules. This documentation details its structure, functionality, props, methods, and how it interacts within a Vue.js application for the specific purpose of schedule management.
Overview

Classes.vue is a Vue.js component aimed at dynamically displaying a schedule of classes or events. It is particularly tailored for educational platforms or applications where users need to view a list of their enrolled classes, upcoming events, or similar scheduled activities. The component fetches data asynchronously and renders a user-friendly view of the schedule.


### Methods

    fetchClasses(): This method is responsible for asynchronously fetching the schedule data from an external API. Upon invocation, it sets isLoading to true, makes a request to the designated endpoint (using Axios or a similar HTTP client), processes the response to update the classes data property, and handles any errors encountered by updating the error property. It finally sets isLoading to false.

    parseIcal(): Given the mention of iCal format in the context, this method likely parses iCal data received from the backend into a more usable format for the component. This might involve converting the iCal data into an array of class/event objects with fields like startDate, endDate, summary, and location.

    formatTime() and formatEndTime(): These helper methods format date and time strings for display within the component, ensuring consistency and readability of schedule timings.

## Example Usage

```html

<template>
  <div class="schedule">
    <Classes v-if="!isLoading && classes.length" :userId="currentUser.id" />
    <p v-if="isLoading">Loading your schedule...</p>
    <p v-if="error">An error occurred: {{ error }}</p>
  </div>
</template>
```
This example demonstrates how to conditionally render the Classes.vue component, showing loading feedback and handling errors. It assumes the existence of a currentUser object with an id property.

# Documentation for Settings.vue

This document provides comprehensive details on the AddScheduleButton Vue.js component, designed for managing user preferences including schedule links, dietary restrictions, widgets, and associations within a web application.

## Features

    Add Schedule Links: Users can add a link to their personal or professional schedules.
    Dietary Preferences: Users can select their dietary restrictions from a predefined list.
    Widget Selection: Users can choose up to two widgets to be displayed on their dashboard.
    Association Membership: Users can select their affiliation with groups or organizations from a list inorder to dispaly the correct color and logo.
    It works by saving the information to localStorage and then uploading it to the server, it's done this way becuse we neither got sensitive data to hide nor was the project started with a server.


## Script

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
## Integration with Backend

The component makes a PUT request to update user settings. Ensure your backend is configured to receive JSON payloads and update user settings accordingly. The request includes user_id, widgets, diets, and associations as part of the request body.
Security Considerations


# Documentation for server.js

server.js is the main server file for the application, responsible for handling HTTP requests, managing database connections, and orchestrating data fetching operations.
## Dependencies

    dotenv: Used to load environment variables from a .env file.
    express: A web application framework for Node.js, utilized for building the server.
    body-parser: Middleware to parse incoming request bodies in a middleware before handlers, allowing easier access to request data.
    cors: Middleware to enable Cross-Origin Resource Sharing (CORS), allowing restricted resources on a web page to be requested from another domain.

## Initialization

    Loads environment variables from a .env file using dotenv.
    Initializes an Express application.
    Defines the port number (3000) for the server to listen on.
    Configures CORS middleware to allow requests from the specified Vue application URL (http://localhost:5173) and enables credentials.

## Routes

    Test Route (/api/test):
        Responds with a JSON object containing a test message ("Hello from the server!") to verify server connectivity.

    Database Connection:
        Establishes a connection to a PostgreSQL database using the pg module.
        Tests the database connection by executing a query to retrieve the current timestamp.

    Update Data Route (PUT /api/update):
        Allows updating data in the database by sending a PUT request with parameters id and newField.
        Executes a SQL UPDATE query on the database table myTable based on the provided parameters.

    Get Data Route (GET /api/get):
        Retrieves data from the database by sending a GET request.
        Executes a SQL SELECT query to fetch all records from the myTable table.

    Create Table Query:
        Defines a SQL query to create a table named user_settings if it doesn't already exist.
        Executes the create table query to ensure the table's existence in the database.

    Get User Settings Route (GET /api/getUserSettings/:user_id):
        Retrieves user settings from the database based on the provided user_id.
        Executes a SQL SELECT query to fetch user settings from the user_settings table.

    Check Username Route (GET /api/checkUsername/:username):
        Checks if a username exists in the database.
        Sanitizes the provided username to ensure it meets certain format requirements.
        Executes a SQL SELECT query to check for the existence of the username.

    User Login Route (POST /api/login):
        Handles user login by checking if the provided username exists in the database.
        Executes a SQL SELECT query to find a matching username.

    Add User Route (POST /api/addUser):
        Adds a new user to the database.
        Executes a SQL INSERT query to insert a new user record into the user_settings table.

    Update User Settings Route (PUT /api/updateUserSettings):
        Updates user settings in the database.
        Executes a SQL UPDATE query to modify user settings based on the provided parameters (user_id, widgets, diets, associations).

    Fetch Kide Data:
        Defines an object orgs containing URLs for fetching data from different organizations via the Kide API.
        Implements a function fetchKide() to fetch data from Kide for each organization asynchronously.
        Runs fetchKide() on startup and refreshes data every hour using setInterval.

    Kide Routes:
        Provides routes to fetch all Kide data and specific Kide data by organization name.

    Restaurant Data Fetching:
        Defines an object restaurants containing URLs for fetching restaurant menus.
        Implements a function fetchRestaurants() to fetch menu data for each restaurant asynchronously.

    Menu Routes:
        Provides routes to fetch all restaurant menu data and specific menu data by restaurant name.

Server Initialization

    Starts the Express server, listening on the specified port (3000).
    Logs a message indicating that the server is running and listening for incoming requests.

