<script>
export default {
    data() {
        return {
            backEndURL: "http://localhost:3000/api/getMenu/",
            restaurantData: {

            },
            isDataFetched: false,
            desiredDate: new Date(),
            todayIsWeekend: false,
        }
    },

    methods: {

        //Fetches ALL restaurant data from backend.
        async fetchRestaurants() {
            console.log("fetchRestaurants()");
            const res = await fetch(this.backEndURL);
            const data = await res.json();
            this.restaurantData = data;
            this.isDataFetched = true;
            console.log(this.restaurantData);
        },

        formatDate(date) {
            // Formats raw date into 'Weekday DD.MM.'
            const options = { weekday: 'short', day: '2-digit', month: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options)
                .replace(/(\d{1,2})\/(\d{1,2})/, '$2.$1.') // Swap the positions of day and month
                .replace(/^\w/, c => c.toUpperCase())
                .replace(',', ''); // Remove the comma after the weekday
            console.log(formattedDate);
            return formattedDate;
        },

        findUnicafeDate(list) {

            //Checks unicafe array of objects' dates for date that corresponds to desiredDate, returns index of object with that date
            console.log("Desired date's unicafe index: " + list.findIndex(x => x.date === this.formatDate(this.desiredDate)));
            return list.findIndex(x => x.date === this.formatDate(this.desiredDate))
        },

        restaurantSelect(nam) {
            console.log(nam);
            const thisMenu = document.querySelector('#' + nam);


            //Makes the selected menus items visible
            thisMenu.querySelector('.foodContainer').classList.toggle("selected");


            //Makes background transparent
            thisMenu.querySelector('img').classList.toggle("selected");


            //All menus except the selected one are made non active
            document.querySelectorAll('.menu').forEach(menu => {
                if (menu.id !== nam) {
                    menu.classList.toggle("nonActiveMenu");
                }
                else {
                    menu.classList.toggle("activeMenu");
                }
            });
        }

    },

    mounted() {
        this.fetchRestaurants({ date: this.formatDate(this.desiredDate) });

        //Checks if today is weekend, if so, displays message
        if (this.desiredDate.getDay() === 6 || this.desiredDate.getDay() === 0) {
            this.todayIsWeekend = true;
        }
    }
}
</script>

<template>
    <!-- QUICKFIX FÖR WEEKEND PLEASE FIX -->
    <div v-if="todayIsWeekend">
        <h2 style="margin-top: 200px;">AAAAA IT IS THE WEEKEND NO FOOD ://// WAIT FOR MONDAY!!! LASAGNA MMMMMMMM</h2>
    </div>
    <!-- QUICKFIX FÖR WEEKEND PLEASE FIX -->

    <!-- Checks if restaurant data has been fetched before looping -->
    <div id="flexBox" v-else-if="isDataFetched">

        <!-- Creates separate menu div for each restaurant in restaurantData -->
        <div class="menu" :id="restaurant.name" v-for="restaurant in restaurantData" :key="restaurant"
            @click="restaurantSelect(restaurant.name)">
            <img class="selected" :src="'src/assets/images/lunch/' + restaurant.name + '.png'" :alt="restaurant.name">

            <!-- Creates separate lunch types, ie vege soppa lunch efterrätt
            Unicafe has different rules so it has its own loop
            -->
            <div v-if="restaurant.name === 'Unicafe'" class="foodContainer">
                <ul class="lunchType"
                    v-for="lunch in restaurant.menu[18].menuData.menus[this.findUnicafeDate(restaurant.menu[18].menuData.menus)].data"
                    :key="lunch">
                    <!-- {{ lunch.price.name }} -->
                    <li class="menuItem" v-text="lunch.name"></li>
                </ul>
            </div>

            <div v-else class="foodContainer">
                <ul class="lunchType" v-for="lunchtype in restaurant.menu.MenusForDays[0].SetMenus" :key="lunchtype">
                    <!-- {{ lunchtype.Name }} -->
                    <li class="menuItem" v-for="option in lunchtype.Components" :key="option" v-text="option"></li>
                </ul>
            </div> 
        </div>

    </div>
</template>

<style scoped>
#flexBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5%;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

.menu {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: white;
    color: #1e22aa;
    width: 90%;
    height: 20vh;
    border-radius: 20px;
    overflow: hidden;
    box-sizing: border-box;
    transition: .2s;
}

.menu img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: auto;
    opacity: .1;
    z-index: 0;
}

.menuItem {}


.foodContainer {
    z-index: 1;
    opacity: 0;
    transition: .1s;
}

.selected {
    opacity: 1 !important;
}

.activeMenu {
    height: 50vh;
    overflow-y: scroll;
}

.nonActiveMenu {
    height: 10vh;
    opacity: .1;
    pointer-events: none;
}

.lunchType {
    font-size: 25px;
    list-style: none;
    padding: 10px;
    border-bottom: solid rgba(0, 0, 0, .3) 2px;
    margin: 0;
}

.lunchType:last-child {
    border-bottom: none;
}
</style>