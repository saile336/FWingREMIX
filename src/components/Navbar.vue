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
            :src="'src/assets/images/navbar/' + page + '.svg'"
            :style="[page == this.page ? { 'border': 'solid #7e7e7e' } : {}]" :alt="page">
    </div>
</template>

<style scoped>
#navbar {
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10vh;
    background-color: #ffffff;
    justify-content: space-evenly;
    align-items: center;
    -webkit-box-shadow: 0px 2px 5px 5px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 2px 5px 5px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 2px 5px 5px rgba(0, 0, 0, 0.2);
}

#navbar img {
    border: solid white;
}

@media (min-width: 600px) {
    #navbar {
        border: solid white;
        justify-content: center;
        gap: 1%;
    }
}

#navbar img {
    width: 10%;
    max-width: 100px;
    height: 45%;
    padding: 15px;
    border-radius: 15px;
}
</style>