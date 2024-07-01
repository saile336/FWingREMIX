<script>

export default {
    data() {
        return {
            kideData: {


            },
            imgUrl: "https://portalvhdsp62n0yt356llm.blob.core.windows.net/bailataan-mediaitems/",
            isDataFetched: false,
            orgs: {
                TLK:
                {
                    kideUrl: "https://api.kide.app/api/companies/8216a1bc-760d-407b-9c77-5e26a041a25c",
                    kideData: {}
                },

                HanSe:
                {
                    kideUrl: "https://api.kide.app/api/companies/90d58532-87be-4a30-b4e3-6053db20caa5",
                    kideData: {}
                },

                Hosk: {
                    kideUrl: "https://api.kide.app/api/companies/45719a1d-a1ef-44a5-ab61-3d81f23614b5",
                    kideData: {}
                },

                Commedia:
                {
                    kideUrl: "https://api.kide.app/api/companies/b7b04c01-6c49-4c74-81da-9f4147aca6db",
                    kideData: {}
                },

                Kult:
                {
                    kideUrl: "https://api.kide.app/api/companies/d12f83ed-8efa-40d9-8288-e62f1ac8fc43",
                    kideData: {}
                }
            }
        }
    },

    props: {
        bim: String,
        widgetMode: Boolean
    },

    methods: {
        async fetchKide() {
            console.log("fetchKide()");

            try {
                for (const org in this.orgs) {
                    await fetch(this.orgs[org].kideUrl)
                        .then(res => res.json())
                        .then(data => {
                            this.orgs[org].kideData = data;
                        })
                }
            }

            catch (error) {
                console.log("Could not fetch kide, " + error);
            }
        },

        clickHandler(id) {
            console.log("clickHandler()");
            console.log(id);
            window.open("https://kide.app/events/" + id, "_self");
        },

        getBackgroundColor(forening) {
            switch (forening) {
                case 'Commedia rf':
                    return { borderColor: 'rgba(213, 70, 60, .7)' };
                case 'HanSe SF':
                    return { borderColor: 'rgba(255, 220, 44, 0.7)' };
                case 'Hosk rf':
                    return { borderColor: 'rgba(41,105,55, .7)' };
                case 'Kult rf':
                    return { borderColor: 'rgba(94, 189, 179, .7)' };
                case 'Tekniska Läroverkets Kamratförbund r.f.':
                    return { borderColor: 'rgba(68, 71, 164, .7)' };
                default:
                    return { borderColor: 'white' };
            }
        },

        /*hoverEvent(event) {
            if (event == "stop") {
                const hoverCont = document.querySelector("#hoverCont");
                hoverCont.style.opacity = "0";
            }
            else if (this.$parent.isMobile() == false) {

                const hoverCont = document.querySelector("#hoverCont");
                hoverCont.style.opacity = "1";
                const hoverImg = document.querySelector(".hoverImg");
                const hoverName = document.querySelector(".hoverName");
                const hoverDate = document.querySelector(".hoverDate");
                hoverImg.src = this.imgUrl + event.mediaFilename;
                hoverName.innerHTML = event.name;
                hoverDate.innerHTML = new Date(event.dateActualFrom).toLocaleDateString('fi-FI');

                // In i html event
                @mouseover="hoverEvent(event)" @mouseleave="hoverEvent('stop')"
            }
        }*/

    },
    mounted() {
        this.fetchKide().then(() => {
            this.isDataFetched = true;
        })
    },

}

</script>

<template>
    <div id="events" v-if="isDataFetched"
        :style="[widgetMode == true ? { 'position': 'static', 'height': '50vh', 'transform': 'translate(0, 0)' } : {}]">
        <div class='föreningar' v-for="forening in kideData" :key="forening">
            <div class="event" v-for="event in forening.kideData.model.events" :key="event.id"
                :style="getBackgroundColor(event.companyName)" @click="clickHandler(event.id)">
                <div class="image-container">
                    <img class="img" :src="imgUrl + event.mediaFilename" />
                    <div :style="[event.salesStarted === true ? event.salesOngoing === false ? { 'color': '#820000' } : { 'color': '#277027' } : {}]"
                        class="details">
                        <div class="name">{{ event.name }}</div>
                        <div class="date">{{ new Date(event.dateActualFrom).toLocaleDateString('fi-FI') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <div id="hoverCont" v-if="this.$parent.isMobile() == false && this.widgetMode == false">
        <div class="hoverEvent">
            <div class="hover-image-container">
                <img class="hoverImg" />
                <div class="hoverDetails">
                    <div class="hoverName"></div>
                    <div class="hoverDate"></div>
                </div>
            </div>
        </div>
    </div> -->
</template>

<style scoped>
/* CSS mobile */
* {
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
    padding: 10px 0 10px 0;
}

.event {
    border-radius: 10px;
    overflow: hidden;
    height: 150px;
    margin: 10px 20px 10px 20px;
    border: 5px solid;
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
    font-family: 'Quicksand';
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    line-height: 1;
    background-color: rgba(255, 255, 255, 0.6);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.name {
    text-align: center;
    font-size: 30px;
    z-index: 12;
}

.date {
    text-align: center;
    font-size: 25px;

}

/* CSS Desktop */
@media screen and (min-width: 768px) {
    #events {
        flex-direction: column;
        align-items: center;
        height: 70vh;
        width: fit-content;
        top: 50%;
        left: 50%;
        background-color: rgba(255, 255, 255);

        -ms-overflow-style: none;
        /* IE and Edge */
        scrollbar-width: none;
        /* Firefox */
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    #events::-webkit-scrollbar {
        display: none;
    }


    .event {
        overflow: hidden;
        width: 25vw;
        height: 17vh;
        border: 5px solid;
        margin: 10px 20px 10px 20px;
    }

    .event:hover {
        cursor: pointer;
        scale: 1.05;
        transition: .1s;
    }

    .name {
        text-align: center;
        font-size: 35px;
        z-index: 12;
    }

    .date {
        text-align: center;
        font-size: 25px;

    }

    #hoverCont {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(0, -55%);
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        overflow-y: hidden;
        overflow-x: hidden;
        width: calc(25vw + 40px);
        background-color: white;
        height: fit-content;
        opacity: 0;
        transition: .1s;
    }

    .hoverImg {
        display: block;
        width: 100%;
        height: auto;
    }

    .hoverDetails {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0;
        line-height: 1;
        background-color: rgba(255, 255, 255, 0.6);
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>