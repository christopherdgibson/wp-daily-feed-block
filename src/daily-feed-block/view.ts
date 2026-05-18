import { CalendarControl } from "./lib/calendar/calendarControl";
import { populateDailyFeedData } from "./lib/api/dailyApi";

document.addEventListener("DOMContentLoaded", () => {
    const calendarCard = document.querySelector('.api-data-container .card') as HTMLElement;
    const calendarContainer = calendarCard?.querySelector('.calendar-container') as HTMLElement;
    if (calendarCard == null || calendarContainer == null) return;
    // Set calendar events
    const instance = new CalendarControl(calendarContainer);
    instance.setOnDateChange((date) => {
        populateDailyFeedData(calendarCard, date, true);
    });
    
    // Set mobile pop-up events
    const calendarOverlay = calendarCard.querySelector('.calendar-overlay');
    const calendar = calendarContainer.querySelector('.calendar');
    if (calendar == null || calendarOverlay == null) return;

    calendarCard.querySelector('.btn-calendar-toggle')?.addEventListener("click", () => {
        calendarOverlay.classList.add('expanded');
    });
    calendarOverlay.addEventListener("click", function (e: Event) {
        if (e.target == null) return;
        const eTarget = e.target as Node;
        if (!calendar.contains(eTarget)) {
            calendarOverlay.classList.remove('expanded');
        }
    })

});