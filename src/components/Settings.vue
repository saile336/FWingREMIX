<template>
    <div class="schedule-button-container">
      <button class="schedule-button" @click="showInputField">
        <i class="icon">A</i> Add to Schedule
      </button>
      <input
        v-if="inputVisible"
        type="text"
        v-model="link"
        class="link-input"
        placeholder="Enter link here"
        @keyup.enter="saveLink"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddScheduleButton',
    data() {
      return {
        inputVisible: false,
        link: '',
      };
    },
    methods: {
      showInputField() {
        this.inputVisible = true;
      },
      saveLink() {
        localStorage.setItem('scheduleLink', this.link);
        this.inputVisible = false;
        this.link = ''; // Reset link input
      }
    }
  }
  </script>
  
  <style scoped>
  .schedule-button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
  
  .schedule-button {
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
    margin-bottom: 10px; /* Spacing between button and input field */
  }
  
  .schedule-button i.icon {
    background-color: white;
    color: #4054B2;
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
  }
  
  .schedule-button:hover {
    background-color: #2D3A8C;
  }
  
  .link-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    width: 90%; /* Adjust width as necessary */
    margin-top: 10px;
  }
  </style>
  