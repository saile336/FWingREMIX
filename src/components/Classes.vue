<script>
import ical from 'ical';

export default {
    data() {
        // init the link empty, will set it later
        return {
            link: "",
            courses: [] 
        };
    },
    methods: {
        async parseIcal() {
            // grabbing the link from storage, if it's there
            const storedLink = localStorage.getItem('scheduleLink');
            if (storedLink) {
                
                this.link = `https://corsproxy.io/?${storedLink}`;
            }
            
            // get the data and parse it
            const response = await fetch(this.link);
            const ics = await response.text();
            const data = ical.parseICS(ics);
            const today = new Date();
            for (let k in data) {
                if (data.hasOwnProperty(k)) {
                    var ev = data[k];
                    if (data[k].type == "VEVENT") {
                        const eventStartDate = new Date(ev.start);
                        // checking if it's today and there's a location
                        if (eventStartDate.getDate() === today.getDate() && ev.location) {
                            this.courses.push({
                                course: ev.summary,
                                startdate: ev.start,
                                endtime: ev.end.toLocaleTimeString("fi-FI"),
                                room: ev.location,
                            });
                        }
                    }
                }
            }
            console.log(this.courses); // just to check if stuffs right
        },
        formatTime(startDate) {
   
            const date = new Date(startDate);
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
        },
        formatEndTime(endTime) {
   
            const parts = endTime.split(".");
            endTime = parts[0] + ":" + parts[1];
            return endTime;
        },
    },
    mounted() {

        this.parseIcal().catch(error => {
            console.error("Failed to parse iCal:", error); // if something goes wrong
        });
    },
};
</script>

<template>

    <div class="classes">
        <div class="classText" v-for="(course, index) in courses" :key="index">
            <h2 class="course">{{ course.course }}</h2>

            <div class="timeBar">
                <div class="timeBox">
                    <p class="time">
                        {{ formatTime(course.startdate) }} -
                        {{ formatEndTime(course.endtime) }}
                    </p>
                </div>
                <div class="roomBox">
                    <p class="room">{{ course.room }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.classes {
    display: flex;
    flex-direction: column;
    gap: 10px; 
}

.classText {
    background-color: #f0f0f0; 
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    padding: 20px; 
    margin: 20px;
    overflow: hidden; 

}

.course {
    font-size: 1.5em; 
    font-weight: bold;


}

.timeBar {
    display: flex;
    justify-content: space-between;
    margin-top: 10px; 
}

.timeBox, .roomBox {
    padding: 5px 10px;
    background-color: #d8e0ff; 
    border-radius: 5px; 
}

.time, .room {
    font-size: 1em;
}
</style>
