<script>
export default {
    data() {
        return {
            pages: [
                'home',
                'restaurants',
                'calendar',
                'events',
                'settings'
            ]
        }
    },

    props: {
        page: String
    },

    methods: {
        navbarHandler(page) {
            console.log("navbarHandler");
            this.$emit('navbarHandler', page);
        },

    },

    mounted() {
        console.log("navbar mounted");
    }
}
</script>

<template>
    <div id="navbar">
        <img v-for="page in pages" :key="page" :id="page" @click="navbarHandler(page)"
            :src="'src/assets/images/navbar/' + page + '.svg'" :style="[page == this.page ? {'background-color': '#969cff'} : {}]" :alt="page">
    </div>
</template>

<style scoped>
#navbar {
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height: 10%;
    background-color: #4b4ebb;
    justify-content: space-evenly;
    align-items: center;
}

@media (min-width: 600px) {
    #navbar {
        justify-content: center;
        gap: 1%;
    }
}

#navbar img {
    width: 10%;
    max-width:100px;
    height: 45%;
    padding: 15px;
    border-radius: 10px;
}
</style>