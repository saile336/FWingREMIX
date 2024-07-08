<template>
    <div id="container">
        <h2>Settings</h2>
        <ul>
            <li>Calendar Link
                <form  class="dropContent" >
                    <input type="text" v-model="calendarLink"
                        placeholder="Enter Calendar Link (Ical)">
                    <input type="Submit">
                </form>
            </li>

            <li>Association
                <div class="dropContent">
                    <input type="radio" v-model="association" value="Option 1"> Option 1
                    <input type="radio" v-model="association" value="Option 2"> Option 2
                    <input type="radio" v-model="association" value="Option 3"> Option 3
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            calendarLink: "",
            association: "",

        };
    },
    methods: {

    }
};
</script>

<style scoped>
#container {
    width: 100vw;
    height: 100vh;
    background-color: white;

    h2 {
        color: black;
        padding-top: 5vh;
    }

    ul {
        margin: 0;
        padding: 15vh 5vw 0 5vw;

        li {
            list-style-type: none;
            font-size: 25px;
            padding: 0 0 0 5%;
        }

        .dropContent {
            display: none;
        }

        li:hover {
            .dropContent {
                display: block;
            }
        }
    }
}
</style>