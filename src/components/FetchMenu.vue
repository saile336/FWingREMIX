<script>
export default {
    data() {
        return {
            backEndURL: "http://localhost:3000/api/getMenu/",
            restaurantData: {

            },
        }
    },

    methods: {
        async fetchRestaurants() {
            console.log("fetchRestaurants()");
            const res = await fetch(this.backEndURL);
            const data = await res.json();
            this.restaurantData = data;
            console.log(this.restaurantData);
        }
    },

    mounted() {
        this.fetchRestaurants();
    }
}
</script>

<template>
    <div id="flexBox" v-if="restaurantData[0]">
        <div class="menu" v-for="restaurant in restaurantData" :key="restaurant">
            <div v-if="restaurant.name === 'Diak'">
                <div class="menuItem" v-for="option in restaurant.menu.MenusForDays[0].SetMenus" :text="option.Name"
                    :key="option"></div>
            </div>

            <div v-else-if="restaurant.name === 'Unicafe'">

            </div>

            <div v-else class="menuItem" v-for="option in restaurant.menu.MenusForDays[0].SetMenus" :text="option.Name"
                :key="option">
            </div>
        </div>
    </div>
</template>

<style scoped>
#flexBox {
    display: flex;
    flex-direction: column;
}

.menu {
    display: flex;
    flex-direction: column;
}
</style>