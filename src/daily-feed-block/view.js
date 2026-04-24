import { CalendarControl } from "./assets/js/calendar.js";
import { fetchDailyApiData } from "./assets/js/dailyApi.js";

document.addEventListener("DOMContentLoaded", () => {
    const calendarCard = document.querySelector('.api-data-container .card');
    const calendarContainerRef = calendarCard.querySelector('.calendar-container');
    
    const instance = new CalendarControl(calendarContainerRef);
    instance.setOnDateChange((date) => {
        fetchDailyApiData(calendarCard, date);
    });
});