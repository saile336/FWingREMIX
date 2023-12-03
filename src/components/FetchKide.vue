<script>
import VueQr from 'qrcode.vue';

export default {
    data() {
        return {
            backEndURL: "http://localhost:3000/api/getKide/",
            kideData: {


            },
            imgUrl: "https://portalvhdsp62n0yt356llm.blob.core.windows.net/bailataan-mediaitems/",
            qr: "https://kide.app/events/",
            isDataFetched: false,
        }
    },
    components: {
        VueQr,
    },

    props: {
        bim: String
    },

    methods: {
        async fetchApi(bim) {
            console.log("fetchApi()");
            const res = await fetch(this.backEndURL + bim);
            const data = await res.json();
            this.kideData = data;
            this.isDataFetched = true;
            console.log(this.kideData);
        },

        clickHandler(id) {
            console.log("clickHandler()");
            console.log(id);
            window.open("https://kide.app/events/" + id, "_self");
        }

    },
    mounted() {
        this.fetchApi(this.bim);
    },

}

</script>

<template>
    <div id="events" v-if="isDataFetched">
        <div class='föreningar' v-for="forening in kideData" :key="forening">
            <div class="event" v-for="event in forening.kideData.model.events" :key="event.id"
                @click="clickHandler(event.id)">
                <div class="image-container">
                    <img class="img" :src="imgUrl + event.mediaFilename" />
                    <div :style="[event.salesStarted === true ? event.availability === 0 ? { 'color': '#800000' } : { 'color': '#006600' } : {}]"
                        class="details">
                        <div class="name">{{ event.name }}</div>
                        <div class="date">{{ new Date(event.dateActualFrom).toLocaleDateString('fi-FI') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

h2 {
    font-size: 40px;
    margin: 0;
    text-align: center;
}

#events {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 80vh;
    width: 85vw;
    background-color: white;
}

.event {
    border-radius: 10px;
    overflow: hidden;
    height: 150px;
    margin: 30px 25px 0 25px;
}

.event:hover {
    cursor: pointer;
    scale: 1.1;
    transition: .1s;
}


.image-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.img {
    display: block;
    width: 100%;
    height: auto;
}


.details {
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:0;
    line-height: 1;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0 0;
}

.name {
    text-align: center;
    font-size: 40px;
    z-index: 12;
}

.date {
    text-align: center;
    font-size: 30px;

}

.QR {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 100px;
    height: 100px;
}
</style>