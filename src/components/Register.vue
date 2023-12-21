
<template>
    <div>
      <form @submit.prevent="registerUser">
        <label for="username">Username:</label>
        <input v-model="formData.username" type="text" id="username" name="username" required>
  
        <button type="submit">Add User</button>
      </form>
  
      <p v-if="successMessage">{{ successMessage }}</p>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          username: '',
        },
        successMessage: '',
        errorMessage: '',
      };
    },
    methods: {
    registerUser() {
      const { username } = this.formData;

      
      const apiUrl = 'http://localhost:3000/api/addUser';

      // Making a POST request to add a user
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            this.errorMessage = `Error: ${data.error}`;
            this.successMessage = '';
          } else {
            this.successMessage = `User added successfully: ${data.username}`;
            this.errorMessage = '';
          }
        })
        .catch(error => {
          this.errorMessage = `Error: ${error.message}`;
          this.successMessage = '';
        });
    },
  },
};
  </script>
  
  <style scoped>
  </style>