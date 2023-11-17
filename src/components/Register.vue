<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="registerUser">

            <label>Username:</label>
            <input v-model="username" required>

            <button type="submit">Register</button>
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            username: '',
        };
    },
    methods: {
        async registerUser() {
            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.username,
                    }),
                });

                const data = await response.json();
                console.log('Registration response:', data);

            } catch (error) {
                console.error('Registration error:', error);
            }
        },
    },
}
</script>