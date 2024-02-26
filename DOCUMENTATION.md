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

# Documentation for App.vue
This documentation provides an overview of a Vue component designed for a web application. The component integrates various features such as user authentication, dynamic UI updates based on user settings, and interaction with a backend API for data retrieval and storage.

## Features

- **User Authentication**: Supports user login and registration workflows.
- **Dynamic UI Customization**: Allows users to customize the UI, including association logos and background colors.
- **Data Fetching and Storage**: Interacts with a backend API to check username availability, login users, register new users, and fetch user-specific settings.

## Components

The main Vue component integrates several child components, each responsible for a specific part of the UI:

- `TheClock`: Displays the current time.
- `FetchKide`: Fetches and displays data from an external source.
- `Navbar`: Provides navigation between different pages of the application.
- `FetchMenu`: Fetches and displays menu items from an external source.
- `Classes`: Displays class schedules
- `Settings`: Allows users to customize their application settings.
- `Widgets`: Displays user-specific widgets on the homepage.

## Data Properties

- `kideOrg`: Organization key for `FetchKide` component.
- `currentPage`: Tracks the currently active page.
- `logoSrc`: Stores the path to the currently selected logo image.
- `enteredUsername`: Temporary storage for username input during login/registration.
- `usernameCheckInProgress`: Indicates whether a username check is currently being performed.
- `usernameExists`: Indicates whether the entered username exists in the database.
- `isLoggedIn`: Tracks whether the user is currently logged in.

## Methods

### Authentication

- `checkLogin()`: Checks if the user is already logged in.
- `promptLogin()`: Prompts the user to enter their username for login.
- `loginUser()`: Attempts to log in the user with the entered username.
- `registerUser()`: Registers a new user with the entered username.

### User Settings and UI Customization

- `fetchUserSettings(user_id)`: Fetches and applies user-specific settings.
- `updatePage(page)`: Updates the current page view.
- `updateAssociation(associationKey)`: Updates the UI based on the selected association.
- `loadAssociationLogoAndColor()`: Loads and applies the association-specific logo and color scheme from local storage.

### Utility

- `isMobile()`: Checks if the application is being accessed from a mobile device.

## Lifecycle Hooks

- `mounted()`: Performs initial setup tasks such as loading the association logo and checking login status.

## Watchers

Watchers are used to reactively update the UI based on changes to certain data properties:

- `associationColor`: Updates the background color when the association color changes.
- `secondColor`: Updates the navigation color when the secondary color changes.


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

The Classes.vue component, in the context of fetching and displaying a user's schedule, is designed to interface with an external source, to retrieve and present schedules. This documentation details its structure, functionality, props, methods, and how it interacts within a Vue.js application for the specific purpose of schedule management.

## Overview




### Features

- **iCal Parsing**: Utilizes the `ical` library to parse .ics files and extract event data.
- **Dynamic Event Display**: Shows events for the current day, including course name, start time, end time, and location.
- **Local Storage Integration**: Retrieves the iCal feed link from local storage for use in fetching the .ics file.

### Data Properties

- `link`: The URL of the .ics file to parse, initially set to an empty string.
- `courses`: An array to store the events for the current day after parsing.

### Methods
    fetchClasses(): This method is responsible for asynchronously fetching the schedule data from an external API. Upon invocation, it sets isLoading to true, makes a request to the designated endpoint (using Axios or a similar HTTP client), processes the response to update the classes data property, and handles any errors encountered by updating the error property. It finally sets isLoading to false.

    parseIcal(): Given the mention of iCal format in the context, this method likely parses iCal data received from the backend into a more usable format for the component. This might involve converting the iCal data into an array of class/event objects with fields like startDate, endDate, summary, and location.

    formatTime() and formatEndTime(): These helper methods format date and time strings for display within the component, ensuring consistency and readability of schedule timings.
### parseIcal

Asynchronously fetches and parses the .ics file specified by the `link` property. It filters the events to find those occurring on the current day and stores relevant details in the `courses` array.

- Checks local storage for a stored iCal link.
- Fetches the .ics file and parses it using the `ical` library.
- Filters events for the current day and with a specified location.
- Stores event details in the `courses` array.

### formatTime

Formats the start time of an event to a more readable format (`HH:MM`).

- `startDate`: The start date and time of an event.

### formatEndTime

Formats the end time of an event to a more readable format (`HH:MM`), adjusting for differences in time representation.

- `endTime`: The end time of an event in `HH.MM` format.


### mounted

Calls the `parseIcal` method to fetch and parse the .ics file upon component mounting. Includes error handling for potential failures in parsing.

## Template

The template section includes dynamic rendering of today's events, displaying the course name, start and end times, and location for each. It uses the `v-for` directive to iterate over the `courses` array and display each event's details.

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
## Setup and Configuration

### Dependencies

- `dotenv`: Loads environment variables from a `.env` file.
- `express`: Web application framework for Node.js.
- `body-parser`: Middleware to parse incoming request bodies.
- `cors`: Middleware to enable Cross-Origin Resource Sharing.
- `pg`: PostgreSQL client for Node.js.

### Environment Configuration

Environment variables are configured through a `.env` file located in the parent directory. These variables include database connection parameters and potentially other sensitive configurations.

## Middleware

- **CORS**: Configured to allow requests from the development server running the Vue application. This setup might require adjustment when deploying the server to handle different origins.
- **Body Parser**: Parses JSON request bodies, enabling the server to easily retrieve request data.

## Database Connection

Utilizes the `pg` module to connect to a PostgreSQL database using environment variables for connection details. Includes a test query to verify the connection upon server start.

## API Endpoints

### Test Endpoint

- `GET /api/test`: Returns a simple message indicating that the server is operational.

### User Settings

- `GET /api/getUserSettings/:user_id`: Retrieves user settings based on the provided user ID.
- `POST /api/addUser`: Adds a new user with the specified username.
- `POST /api/login`: Authenticates a user based on the provided username.
- `PUT /api/updateUserSettings`: Updates user settings for widgets, diets, and associations based on the provided user ID.

### Username Checks

- `GET /api/checkUsername/:username`: Checks if the provided username exists in the database.

### Data Manipulation Templates

- `PUT /api/update`: Template endpoint for updating database records.
- `GET /api/get`: Template endpoint for fetching data from the database.

### Kide Data Fetching

- `GET /api/getKide`: Fetches data for all organizations from Kide API.
- `GET /api/getKide/:name`: Fetches data for a specific organization from Kide API.

### Restaurant Menu Fetching

- `GET /api/getMenu`: Fetches menus for all configured restaurants.
- `GET /api/getMenu/:restaurant`: Fetches the menu for a specific restaurant.

## Utility Functions

### fetchKide

Periodically fetches data from the Kide API for predefined organizations and updates the server's local cache of this data.

### fetchRestaurants

Fetches daily menus from predefined restaurant APIs and stores them in the server's local cache.

## Running the Server

The server is configured to listen on port 3000, with console output confirming the server's operational status and successful database connection.