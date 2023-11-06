<script>

export default {
    data() {
        return {
            kideData: [],
            imgUrl: "https://portalvhdsp62n0yt356llm.blob.core.windows.net/bailataan-mediaitems/"
        }
    },

    props: {
        bim: String,
    },

    methods: {
        async fetchApi(bam) {
            console.log("fetchApi()");
            const res = await fetch(`http://localhost:3000/api/getKide/${bam}`); //Fetch by name, OBS case sensitive
            const data = await res.json();
            this.kideData = data.kideData.model;
            console.log(this.kideData);
        },
    },
    created() {
        //Fetchar med respektive organisations namn
        this.fetchApi(this.bim);
    },

    
}

</script>

<template>
    <div class="container">
        <h2 id="forening" v-html="kideData.company.name"></h2>
        <div id="events">
            <div class="event" v-for="event in kideData.events" :key="event.id">
                <img class="img" :src="imgUrl + event.mediaFilename">
                <div class="details">
                    <div class="name">{{ event.name }}</div>
                    <div class="place">{{ event.place }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h2 {
    font-size: 40px;
    margin: 0;
    text-align: center;
}

.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: rgba(0, 0, 0, .5);
    color: white;
    border-radius: 10px;
    padding: 0;
    width: 1300px;
    height: 580px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */

}

.container::-webkit-scrollbar {
    display: none;
}

#rightArrow {
    position: absolute;
    top: 20%;
    left:90%;
    transform: translate(-50%, -50%);
    height: 100px;
    width: 100px;
    z-index: 1;
    filter: invert(1);
    transition: .1s;
}

#rightArrow:hover {
    cursor: pointer;
    scale: 1.1;
    transition: .1s;
}

#events {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
}

.event {
    background-color: rgba(0, 0, 0, .5);
    display: block;
    font-size: 30px;
    padding: 20px;
    margin: 10px;
    box-sizing: border-box;
    width: 540px;
    height: 300px;
    border-radius: 10px;
    transition: 0.1s;
    overflow: hidden;
}

.event:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: 0.1s;
}

.img {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 540px;
    height: auto;
}

.details {
    background-color: rgba(0, 0, 0, .7);
    position: relative;
    top: -45%;

}

.name {
    text-align: center;
    font-size: 35px;
}

.place {
    text-align: center;
}
</style>