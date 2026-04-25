import { CalendarControl } from "./assets/js/calendar.js";
import { fetchDailyApiData } from "./assets/js/dailyApi.js";

document.addEventListener("DOMContentLoaded", () => {
    const calendarCard = document.querySelector('.api-data-container .card');
    const calendarContainer = calendarCard.querySelector('.calendar-container');

    // Set calendar events
    const instance = new CalendarControl(calendarContainer);
    instance.setOnDateChange((date) => {
        fetchDailyApiData(calendarCard, date);
    });
    
    // Set mobile pop-up events
    const calendarOverlay = calendarCard.querySelector('.calendar-overlay');
    const calendar = calendarContainer.querySelector('.calendar');

    calendarCard.querySelector('.btn-calendar-toggle').addEventListener("click", () => {
        calendarOverlay.classList.add('expanded');
    });
    calendarOverlay.addEventListener("click", function (e) {
        if (!calendar.contains(e.target)) {
            calendarOverlay.classList.remove('expanded');
        }
    })

});