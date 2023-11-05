<template>
    <div>
        <h1>{{ message }}</h1>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            message: '',
        };
    },
    mounted() {
        // Test requests
        fetch('http://localhost:3000/api/test')
            .then(response => response.json())
            .then(data => {
                console.log("Response from server: " + data.message);
                this.message = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        fetch('http://localhost:3000/api/createSample')
            .then(response => response.json())
            .then(data => {
                console.log('Database Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        fetch('http://localhost:3000/api/testDatabase')
            .then(response => response.json())
            .then(data => {
                console.log('Database Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },
};
</script>
  
<style src="src/assets/main.css"></style>
  