<script>
import VueQr from 'qrcode.vue';

export default {
    data() {
        return {
            backEndURL: "http://localhost:3000/api/getKide/" ,
            kideData: {
                

            },
            imgUrl: "https://portalvhdsp62n0yt356llm.blob.core.windows.net/bailataan-mediaitems/",
            qr: "https://kide.app/events/"
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
            console.log(this.kideData);
        },

    },
    mounted() {
        this.fetchApi(this.bim);
    },

}

</script>

<template>
    <div id="events">
        <div v-for="forening in kideData" :key="forening">
        <div class="event" v-for="event in forening.kideData.model.events" :key="event.id">
            <div class="image-container">
                <img class="img" :src="imgUrl + event.mediaFilename" />
                <div class="QR">
                    <VueQr :value="qr + event.id" />
                </div>
                <div :style="[event.salesStarted === true ? event.salesEnded ? {'backgroundColor': 'rgba(153, 0, 0,.7)'} : {'backgroundColor': 'rgba(51, 153, 51,.7)'} : {}]" class="details" >
                    <div class="name">{{ event.name }}</div>
                    <div class="place">{{ event.place }}</div>
                </div>
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


#events {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 75vh;
}

.event {
    margin-top: 25px;
    font-size: 25px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 15px 15px 1px 1px rgba(0, 0, 0, 0.5);
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
    display:block;
    background-color: rgba(0, 0, 0, .7);
    padding: 10px;
    position:absolute;
    bottom:0;
    left:50%;
    transform:translateX(-50%);
    width:75%;
    border-radius: 10px 10px 0 0;
}

.name {
    text-align: center;
    font-size: 30px;
    z-index: 12;
}

.place {
    text-align: center;

}

.QR {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 100px;
    height: 100px;
}
</style>