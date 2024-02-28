<script>
import ical from 'ical';

export default {
    data() {
        // init the link empty, will set it later
        return {
            link: "",
            courses: [],
            coursesTomorrow: []
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
            console.log(data)
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
                                duration: ev.duration,
                                room: ev.location,
                            });
                        }

                        else if (eventStartDate.getDate() === today.getDate() + 1 && ev.location) {
                            this.coursesTomorrow.push({
                                course: ev.summary,
                                startdate: ev.start,
                                duration: ev.duration,
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
        formatEndTime(startDate, duration) {

            const date = new Date(startDate);

            const matches = duration.match(/PT(\d+)H(\d+)?M?/);
            const durationHours = parseInt(matches[1]);
            const durationMinutes = matches[2] ? parseInt(matches[2]) : 0;
            date.setHours(date.getHours() + durationHours);
            date.setMinutes(date.getMinutes() + durationMinutes);

            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");

            return `${hours}:${minutes}`;
        },

        parseSummary(summary) {
            const parts = summary.split(',');

            const result = parts[2];

            return result.trim();
        },

        parseRoom(room) {
            const parts = room.split(' ');

            const result = parts[0];

            return result;
        }
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
        <p id="today">Today's courses</p>
        <div class="classText" v-for="(course, index) in courses" :key="index">
            <p class="course">{{ parseSummary(course.course) }}</p>

            <div class="timeBar">
                <div class="timeBox">
                    <p class="time">
                        {{ formatTime(course.startdate) }} -
                        {{ formatEndTime(course.startdate, course.duration) }}
                    </p>
                </div>
                <div class="roomBox">
                    <p class="room">{{ parseRoom(course.room) }}</p>
                </div>
            </div>
        </div>

        <p id="today">Tomorrow's courses</p>
        <div class="classText" v-for="(course, index) in coursesTomorrow" :key="index">
            <p class="course">{{ parseSummary(course.course) }}</p>

            <div class="timeBar">
                <div class="timeBox">
                    <p class="time">
                        {{ formatTime(course.startdate) }} -
                        {{ formatEndTime(course.startdate, course.duration) }}
                    </p>
                </div>
                <div class="roomBox">
                    <p class="room">{{ parseRoom(course.room) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#today {
    font-weight: 400;
    text-align: center;
    font-size: 2em;
    margin: 5% 0 5% 0;
    width: 100%;
    color: black;
    text-decoration: underline;
}

.classes {
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
    font-family: Quicksand;
    font-weight: 700;
    justify-content: flex-start;
    align-items: center;
}

.classText {
    background-color: #f0f0f0;
    height:auto;
    margin: 0 10vw 10vw 10vw;
    border-radius: 5px;   
}

.course {
    font-size: 1.5em;
    text-align: center;
    font-weight: bold;
    color: black;
    margin: 0;
    padding: 5%;
}

.timeBar {
    display: flex;
    justify-content: center;
    gap: 15%;
    padding: 5px 10px;
    background-color: #d8e0ff;
    border-radius: 5px;
}

.timeBox,
.roomBox {
    
}

.time,
.room {
    font-size: 1em;
}

.room{
    color: rgb(189, 0, 0);
}
</style>
