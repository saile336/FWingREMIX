# App Documentation

The "App" segment of the project primarily focuses on the Vue.js frontend application, detailing the architecture, navigation, state management, and key components that facilitate user interaction and functionality within the application.

## Overview

The frontend application is designed as a single-page application (SPA) using Vue.js, leveraging Vue Router for navigation and optionally Vuex for state management, to provide a dynamic and responsive user experience. The application integrates with the backend server via API calls to fetch and manipulate data, including user settings, events, weather, and restaurant menus.
### Project Setup

    Framework: Vue.js
    Routing: Vue Router
    HTTP Requests: Axios for API calls

### Installation and Running Locally

    Ensure Node.js and npm are installed.
    Clone the project repository.
    Navigate to the client directory.
    Install dependencies:

```bash
npm install
```
    Serve the application locally:
```bash
 npm run serve
```

    The application will be available at http://localhost:8080.

## Directory Structure

    src/
        assets/: Static assets like images and global styles.
        components/: Vue components for specific features (e.g., weather display, settings form).
        App.vue: The main application component that ties everything together.
        main.js: The entry point for the Vue application.

## Navigation with Vue Router

    Configuration: The router is configured in src/router/index.js, defining paths and associated components for the application's routes.
    Usage: Navigation is achieved using <router-link> for declarative links or this.$router.push('/path') for programmatic navigation.
    Routes Example:

```javascript

    const routes = [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/settings',
        name: 'Settings',
        // Lazy-loaded component
        component: () => import('../views/Settings.vue')
      }
    ];
```
## State Management with Vuex (Optional)

    Purpose: Manages application state globally, useful for sharing data between components.
    Store Setup: Located in src/store/index.js, defines the state, mutations, actions, and getters.
    Usage: Components access the state directly through $store.state or use mapState helper; mutations and actions are called via $store.commit('mutationName') and $store.dispatch('actionName').

## Key Components

    NavBar: Handles user navigation across different parts of the application.
    UserSettingsForm: Allows users to update their preferences and settings.
    WeatherWidget: Displays weather information based on the user's location.
    EventList: Shows upcoming events fetched from the backend or external APIs.

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
### Development Practices

    Component Design: Components are designed to be reusable and modular.
    Code Splitting: Use dynamic imports for routes and components to improve loading times.
    Environment Variables: Store API URLs and sensitive information in .env files.

### Security Considerations

    Ensure all user input is validated before submission to prevent XSS attacks.
    Use HTTPS for all API calls to secure data in transit.

### Future Enhancements

    Implementing more dynamic components based on user feedback.
    Expanding the application's functionality with additional APIs and integrations.

This documentation provides a foundation for understanding and working with the Vue.js frontend part of the application. Further details should be added as the application evolves and new features are implemented.

# Documentation for FetchMenu.vue

The FetchMenu.vue component is designed for fetching and displaying restaurant menus. It interacts with a backend or external API to retrieve daily or weekly menus and presents them in a user-friendly format within a Vue.js application. This documentation outlines its core functionalities based on the provided code snippets.
## Overview

FetchMenu.vue serves as a dynamic component within a Vue.js application, aimed at providing users with up-to-date restaurant menus. It is particularly useful for platforms that aggregate food service information, such as university campus apps, food delivery services, or restaurant review sites.



## Methods

    fetchRestaurants(): This method is crucial for asynchronously fetching the restaurant menus. It would typically set isLoading to true, perform an HTTP GET request to the designated endpoint, process the response to update the menus data property, and handle any errors by updating the error property. Finally, it sets isLoading to false.

    formatDate(date): A utility method that formats the date for display or as required by the API endpoint for fetching menus.

    desiredDateHandler(bim): A method that adjusts the desiredDate based on user interaction, allowing for navigation through different dates' menus.

    findUnicafeDate(list): Specifically designed for handling menu data from Unicafe (a common restaurant choice in Finnish universities), this method finds and processes the date matching the desiredDate.

    restaurantSelect(nam): Handles user selection of a specific restaurant from the displayed list, potentially triggering a detailed view of the selected restaurant's menu.

    getLunchData(restaurant): Processes and returns the lunch data for a given restaurant, tailored to handle different data structures depending on the restaurant (e.g., Unicafe's unique format).

## Computed Properties and Watchers

The component might employ computed properties or watchers to reactively update the UI based on changes to reactive data properties like menus or desiredDate, although specifics were not provided.
Example Usage

```html

<template>
  <div>
    <FetchMenu :restaurantId="selectedRestaurant" :date="currentDate" />
  </div>
</template>
```
This example shows how FetchMenu could be used in a parent component, passing in a selectedRestaurant and a currentDate to fetch and display the menu for a specific restaurant and date.

## Conclusion

FetchMenu.vue enhances a Vue.js application by providing dynamic, up-to-date restaurant menu information to users. Through its asynchronous data fetching, careful error handling, and user-friendly display, it serves as a valuable component for any application focusing on food service information dissemination.


# Documentation for Weather.vue

Weather.vue is a Vue.js component designed to fetch and display weather information based on a user's location or a specified location. It communicates with a weather API to retrieve current conditions, forecasts, and other relevant meteorological data, presenting it in a user-friendly interface. This documentation outlines its core functionalities based on the provided code snippets.
## Overview

The component is integral for applications requiring real-time weather data, such as travel apps, event planning platforms, or any application where weather conditions could affect user decisions. It aims to provide concise, accurate, and timely weather information.



## Methods

    fetchWeather(): This method performs the core functionality of asynchronously fetching weather data from the specified API. It would set isLoading to true at the start, make an HTTP GET request to the weather API with the appropriate query parameters (e.g., location, API key, units), then process the response to update weatherData and reset isLoading to false. Error handling would update the error property.

    formatWeatherData(response): A utility method to process and format the raw response from the weather API into a more usable structure for the component. This could involve mapping response data to weatherData properties, converting temperature units, or parsing forecast data.

## Example Usage

```html

<template>
  <div>
    <Weather location="Helsinki" units="metric" />
  </div>
</template>
```
In this example, the Weather component is used with the location and units props to fetch and display weather data for Helsinki in metric units.
Styling

The component is expected to include scoped CSS for styling the presentation of the weather data. This might involve styles for temperature display, condition icons, forecast layouts, and responsive design considerations to ensure readability across devices.
## Conclusion

Weather.vue provides a dynamic and essential feature for Vue.js applications that benefit from integrating real-time weather information. Through its efficient fetching of weather data, robust error handling, and user-centric display, it significantly enhances user experience in applications where weather conditions are a critical factor.

# Documentation for TheClock.vue

TheClock.vue is a Vue.js component designed to display a real-time clock, showing the current time to users. It typically includes both digital and optional analog representations of the current time. Based on the provided code snippets, this documentation will detail the core functionalities and structure of the component, focusing on its implementation as a digital clock.
## Overview

The TheClock.vue component is a versatile element suitable for applications requiring time display, such as dashboards, time tracking tools, or any user interface that benefits from showing the current time. Its implementation is focused on providing a lightweight, accurate, and aesthetically pleasing time display.
### Data Properties

    currentTime: A string that represents the current time. It is formatted according to the user's locale or a specified format, updating in real-time to ensure accuracy.

### Methods

    updateTime(): This method is responsible for updating the currentTime data property at a set interval (typically every second). It retrieves the current system time, formats it appropriately (e.g., HH:mm:ss for a 24-hour format), and updates the currentTime property to reflect the change.

### Computed Properties

    There might be computed properties for additional time-related information, such as currentDate or timeOfDay (morning, afternoon, evening), depending on the design and requirements of the application. However, based on the provided code, the primary focus is on displaying the current time.

### Lifecycle Hooks

    mounted(): Upon mounting the component, this lifecycle hook initiates the updateTime() method at a regular interval using setInterval(). This ensures that the clock starts and continues to display the current time accurately as long as the component is mounted.

    beforeDestroy(): To prevent memory leaks or performance issues, it's crucial to clear the interval set for updating the time when the component is about to be destroyed. This lifecycle hook is used to clear the interval, ensuring efficient resource management.

## Example Usage

```html

<template>
  <div class="clock-container">
    The current time is: {{ currentTime }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: null,
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000); // Update the time every second
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString(); // Adjust format as needed
    },
  },
};
</script>

<style scoped>
.clock-container {
  /* Styling for the clock display */
}
</style>
```
In this example, TheClock.vue component displays the current time, which updates every second. The updateTime method ensures the displayed time remains accurate, and lifecycle hooks manage the timing interval responsibly.
## Conclusion

TheClock.vue is a simple yet highly functional component for Vue.js applications, providing users with accurate and real-time clock functionality. It can be customized and extended to include additional time-related features, making it a versatile component for a wide range of applications.


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
## Conclusion

Widgets.vue provides a modular and extensible solution for managing and displaying widgets within a Vue.js application. By allowing users to customize their dashboard with preferred widgets, it enhances the user experience and makes the application more versatile and adaptable to individual needs.

# Documentation for FetchKide.vue

The FetchKide.vue component is designed to fetch and display event data from the Kide platform. This documentation provides a comprehensive overview of its functionalities, props, methods, and how it integrates within a Vue.js application.
## Overview

FetchKide.vue serves as a dynamic component to retrieve and present events from an external API, specifically tailored for the Kide platform. It showcases various events, potentially including information like event names, dates, and locations, and it may offer functionality for user interaction, such as clicking on an event to get more details.
### Props

FetchKide.vue accepts two props for customization and control:

    bim: A String indicating the organization or category of events to fetch. This prop allows the component to request specific events related to a given organization from the Kide platform.
    widgetMode: A Boolean that adjusts the display mode of the component. When true, it alters the layout to fit within a widget space, possibly changing its style or the amount of information displayed.

### Data

The component maintains an internal state that includes:

    kideData: An object to store the fetched events. It's structured to hold events categorized by organizations.
    imgUrl: A String holding the base URL for event images. This URL is prepended to image paths returned by the API to construct the full image URLs.
    qr: A String containing the base URL for QR codes associated with events. This base URL is used in conjunction with event-specific data to direct users to more detailed event pages.
    isDataFetched: A Boolean indicating whether the event data has been successfully fetched from the API.

### Methods

    fetchApi(bim): An asynchronous method that performs an API request to the Kide platform to retrieve events based on the bim prop. Upon receiving the data, it updates kideData and sets isDataFetched to true.
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
Conclusion

FetchKide.vue is a versatile component within a Vue.js application, designed to enhance user engagement by dynamically presenting event information from the Kide platform. Through its props, reactive data properties, and methods, it offers a tailored user experience, encouraging interaction with the displayed events.

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

## Conclusion

Classes.vue, within the schedule-fetching context, is a vital component for educational or event-based applications, providing users with a clear and interactive view of their schedules. Through its asynchronous data fetching, error handling, and user-friendly display, it enhances the overall user experience by keeping individuals informed and organized.


# Documentation for User Settings Component in Vue.js

This document provides comprehensive details on the AddScheduleButton Vue.js component, designed for managing user preferences including schedule links, dietary restrictions, widgets, and associations within a web application.

## Overview

The AddScheduleButton component allows users to customize their experience by selecting dietary preferences, widgets, and associations. It features a dynamic UI where users can add links to their schedules, choose dietary restrictions, select up to two widgets for their dashboard, and associate themselves with groups or organizations.

## Features

    Add Schedule Links: Users can add a link to their personal or professional schedules.
    Dietary Preferences: Users can select their dietary restrictions from a predefined list.
    Widget Selection: Users can choose up to two widgets to be displayed on their dashboard.
    Association Membership: Users can select their affiliation with groups or organizations from a list.

## Component Structure
## Template

The template consists of multiple button-triggered actions for showing input fields and menus for schedules, diets, widgets, and associations. Each section has its UI elements that are conditionally rendered based on user interactions.

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
## Integration with Backend

The component makes a PUT request to update user settings. Ensure your backend is configured to receive JSON payloads and update user settings accordingly. The request includes user_id, widgets, diets, and associations as part of the request body.
Security Considerations

    Validate all inputs on the backend to prevent SQL injection and other common web vulnerabilities.
    Do not store sensitive information in localStorage as it's accessible through client-side scripts.

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

