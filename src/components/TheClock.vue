<script>

export default {
    data() {
        return {
            time: "",
            date: ""
        }
    },
    methods: {
        TheClock() {
            console.log("theClock()");

            let date = new Date();
            let day = date.getDate();
            let mo = date.getMonth() + 1;
            let year = date.getFullYear();
            let hh = date.getHours();
            let mm = date.getMinutes();
            let ss = date.getSeconds();


            hh = (hh < 10) ? "0" + hh : hh;
            mm = (mm < 10) ? "0" + mm : mm;
            ss = (ss < 10) ? "0" + ss : ss;
            day = (day < 10) ? "0" + day : day;
            mo = (mo < 10) ? "0" + mo : mo;

            this.time = `${hh}:${mm}:${ss}`;
            this.date = `${day}.${mo}.${year}`;

        }
    },
    mounted() {
        this.TheClock();
        setInterval(this.TheClock, 1000);
    }
}

</script>

<template>
    <div id="dateAndTime">
        <p id="date" v-html="date"></p>
        <p id="clock" v-html="time"></p>
    </div>
</template>

<style scoped>

#dateAndTime {
    display:flex;
    flex-direction: column;
}

p{
    height:fit-content;
    padding:0;
    margin:0;
    line-height: 1;
}

#date {
    font-size: 60px;
    color: white;
    padding-left: 10px;
}

#clock {
    font-size: 120px;
    color: white;
}

</style>
