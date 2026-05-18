interface CalendarControlState {
    localDate: Date;
    prevMonthLastDayNum: number | null;
    calWeekDays: string[];
	calMonthName: string[];
    daysInMonth: (month: number, year: number) => number;
    firstDate: () => Date;
    lastDate: () => Date;
    firstDateNumber: () => number;
    lastDayNumber: () => number;
    getPreviousMonthLastDateNum: () => number;
    navigateToPreviousMonth: () => void;
    navigateToNextMonth: () => void;
    navigateToCurrentMonth: () => void;
    displayYear: () => void;
    displayMonth: () => void;
    selectDate: (e: Event) => void;
    plotSelectors: () => void;
    plotDayNames: () => void;
    plotDates: () => void;
    attachEvents: () => void;
    highlightToday: () => void;
    outlineSelected: (day: number) => void;
    plotPrevMonthDates: (dates: number[]) => void;
    plotNextMonthDates: () => void;
    loopThroughNextDays: (count: number) => void;
    attachEventsOnNextPrev: () => void;
    init: () => void;
}

interface ICalendarControl {
    handleDateChange(date: Date): void;
    setOnDateChange(callback: ((date: Date) => void) | null): void;
    getActiveDate(): Date;
}


export class CalendarControl implements ICalendarControl {
	// private calendarContainerRef: HTMLDivElement;
    private selectedDate: Date;
    private onDateChange: ((date: Date) => void) | null = null;

	constructor(container: HTMLDivElement) {
		// this.calendarContainerRef = container;
		this.selectedDate = new Date();
		createCalendarControl(container, this.handleDateChange.bind(this));
	}
	handleDateChange(date: Date) : void {
		console.log("Date cell clicked");
		this.selectedDate = date;
		if (this.onDateChange) {
			this.onDateChange(this.selectedDate);
		}
	}
	setOnDateChange(callback: ((date: Date) => void) | null) : void {
		this.onDateChange = callback;
		if (this.onDateChange) {
			this.onDateChange(this.selectedDate);
		}
	}
	getActiveDate() : Date {
		console.log("Active date:", this.selectedDate);
		return this.selectedDate;
	}
}

export function createCalendarControl(calendarContainerRef: HTMLDivElement, onDateChange: ((date: Date) => void) | null = null) {
	const calendarRef = calendarContainerRef.querySelector('.calendar') as HTMLDivElement;
	const calendar = new Date();
	const calendarControl: CalendarControlState = {
	// const calendarControl = {
		localDate: new Date(),
		prevMonthLastDayNum: null as number | null,
		calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		calMonthName: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		daysInMonth: function (month: number, year: number) {
			return new Date(year, month, 0).getDate();
		},
		firstDate: function () {
			return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
		},
		lastDate: function () {
			return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
		},
		firstDateNumber: function () {
			return calendarControl.firstDate().getDay() + 1;
		},
		lastDayNumber: function () {
			return calendarControl.lastDate().getDay() + 1;
		},
		getPreviousMonthLastDateNum: function () {
			let lastDayNum = new Date(
				calendar.getFullYear(),
				calendar.getMonth(),
				0,
			).getDate();
			return lastDayNum;
		},
		navigateToPreviousMonth: function () {
			calendar.setMonth(calendar.getMonth() - 1);
			calendarControl.attachEventsOnNextPrev();
		},
		navigateToNextMonth: function () {
			calendar.setMonth(calendar.getMonth() + 1);
			calendarControl.attachEventsOnNextPrev();
		},
		navigateToCurrentMonth: function () {
			let currentMonth = calendarControl.localDate.getMonth();
			let currentYear = calendarControl.localDate.getFullYear();
			calendar.setMonth(currentMonth);
			calendar.setFullYear(currentYear);
			calendarControl.attachEventsOnNextPrev();
		},
		displayYear: function () {
			let yearLabel = calendarRef.querySelector(".calendar-year-label") as HTMLDivElement;
			yearLabel.innerHTML = calendar.getFullYear().toString();
		},
		displayMonth: function () {
			let monthLabel = calendarRef.querySelector(".calendar-month-label") as HTMLDivElement;
			monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
		},
		selectDate: function (e: Event) {
			e.preventDefault();
			const dateLink = (e.target as Element).closest(".dateNumber");
			if (dateLink == null) return;
			const day = parseInt(dateLink?.textContent ?? "", 10);
			if (isNaN(day)) return;
			const month = calendar.getMonth();
			const year = calendar.getFullYear();
			const selectedDate = new Date(year, month, day);
			if (onDateChange) {
				onDateChange(selectedDate);
			}
			// console.log(
			// 	`inside create block: ${e.target.textContent} ${
			// 		calendarControl.calMonthName[calendar.getMonth()]
			// 	} ${calendar.getFullYear()}`,
			// );
			calendarControl.outlineSelected(day);
		},
		plotSelectors: function () {
			// calendarRef.innerHTML += 
			calendarRef.insertAdjacentHTML('beforeend',`<div class="calendar-inner"><div class="calendar-controls">
          <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
          <div class="calendar-year-month">
          <div class="calendar-month-label"></div>
          <div>-</div>
          <div class="calendar-year-label"></div>
          </div>
          <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
          </div>
          <div class="calendar-today-date">Today:
            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]},
            ${calendarControl.localDate.getDate()},
            ${
				calendarControl.calMonthName[calendarControl.localDate.getMonth()]
			}
            ${calendarControl.localDate.getFullYear()}
          </div>
          <div class="calendar-body"></div></div>`);
		},
		plotDayNames: function () {
			for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
				calendarRef.querySelector(".calendar-body")?.insertAdjacentHTML('beforeend',
					`<div>${calendarControl.calWeekDays[i]}</div>`);
			}
		},
		plotDates: function () {
			const calendarBody = calendarRef.querySelector(".calendar-body");
			if (calendarBody == null) return;
			calendarBody.innerHTML = "";
			calendarControl.plotDayNames();
			calendarControl.displayMonth();
			calendarControl.displayYear();
			let count = 1;
			let prevDateCount = 0;
			calendarControl.prevMonthLastDayNum = calendarControl.getPreviousMonthLastDateNum();
			let prevMonthDatesArray: number[] = [];
			let calendarDays = calendarControl.daysInMonth(
				calendar.getMonth() + 1,
				calendar.getFullYear(),
			);
			// dates of current month
			for (let i = 1; i < calendarDays; i++) {
				if (i < calendarControl.firstDateNumber()) {
					prevDateCount += 1;
					calendarRef.querySelector(".calendar-body")?.insertAdjacentHTML('beforeend',
						`<div class="prev-dates"></div>`);
					prevMonthDatesArray.push(calendarControl.prevMonthLastDayNum--);
				} else {
					calendarRef.querySelector(".calendar-body")?.insertAdjacentHTML('beforeend',
						`<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`);
				}
			}
			//remaining dates after month dates
			for (let j = 0; j < prevDateCount + 1; j++) {
				calendarRef.querySelector(".calendar-body")?.insertAdjacentHTML('beforeend',
					`<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`);
			}
			calendarControl.highlightToday();
			calendarControl.plotPrevMonthDates(prevMonthDatesArray);
			calendarControl.plotNextMonthDates();
		},
		attachEvents: function () {
			calendarRef.querySelector(".calendar-prev a")?.addEventListener("click", calendarControl.navigateToPreviousMonth, false);
			calendarRef.querySelector(".calendar-next a")?.addEventListener("click", calendarControl.navigateToNextMonth);
			calendarRef.querySelector(".calendar-today-date")?.addEventListener("click", calendarControl.navigateToCurrentMonth, false);
			let dateNumber = calendarRef.querySelectorAll(".dateNumber");
			dateNumber.forEach(date => {
				date.addEventListener("click", calendarControl.selectDate, false);
			});
		},
		highlightToday: function () {
			let currentMonth = calendarControl.localDate.getMonth() + 1;
			let changedMonth = calendar.getMonth() + 1;
			let currentYear = calendarControl.localDate.getFullYear();
			let changedYear = calendar.getFullYear();
			if (
				currentYear === changedYear &&
				currentMonth === changedMonth &&
				calendarRef.querySelectorAll(".number-item")
			) {
				calendarRef
					.querySelectorAll(".number-item")
					[calendar.getDate() - 1].classList.add("calendar-today");
			}
		},
		outlineSelected: function (day: number) {
			let dateItems = calendarRef.querySelectorAll(".number-item");
			for (const item of dateItems) {
				const date = item.querySelector(".dateNumber");
				if (date == null) return;
				if (
					(date.innerHTML == day.toString()) &&
					!item.classList.contains("calendar-today")
				) {
					item.classList.add("calendar-select");
				} else if (item.classList.contains("calendar-select")) {
					item.classList.remove("calendar-select");
				}
			}
		},
		plotPrevMonthDates: function (dates: number[]): void {
    		dates.reverse();
			for (let i = 0; i < dates.length; i++) {
				const prevDates = calendarRef.querySelectorAll(".prev-dates")[i];
				if (prevDates instanceof HTMLElement) {
					prevDates.textContent = dates[i].toString();
				}
			}
		},
		plotNextMonthDates: function () {
			let childElemCount =
				calendarRef.querySelector(".calendar-body")?.childElementCount;
				if (childElemCount == null) return;
			//7 lines
			if (childElemCount > 42) {
				let diff = 49 - childElemCount;
				calendarControl.loopThroughNextDays(diff);
			}

			//6 lines
			if (childElemCount > 35 && childElemCount <= 42) {
				let diff = 42 - childElemCount;
				calendarControl.loopThroughNextDays(diff);
			}
		},
		loopThroughNextDays: function (count: number) {
			if (count > 0) {
				for (let i = 1; i <= count; i++) {
					calendarRef.querySelector(".calendar-body")?.insertAdjacentHTML('beforeend',
						`<div class="next-dates">${i}</div>`);
				}
			}
		},
		attachEventsOnNextPrev: function () {
			calendarControl.plotDates();
			calendarControl.attachEvents();
		},
		init: function () {
			calendarControl.plotSelectors();
			calendarControl.plotDates();
			calendarControl.attachEvents();
		},
	};
	calendarControl.init();
}

// wp.domReady(function () {
// 	const calendar = document.querySelector(".calendar");
//   console.log(calendar);
// 	if (calendar) {
//     console.log(calendar);
// 		const calendarControl = new CalendarControl();
// 	}
// });

// function initCalendars() {
//   console.log('initCalendars run. Found:', document.querySelectorAll('.calendar').length, 'calendar elements');
//     document.querySelectorAll('.calendar').forEach(function(calendar) {
//       console.log(calendar);
//         if (!calendar.dataset.calendarInitialized) {
//             const calendarControl = new CalendarControl();
//             calendar.dataset.calendarInitialized = "true";
//         }
//     });
// }

// // Run on domReady
// if (window.wp && wp.domReady) {
//     wp.domReady(initCalendars);
// } else {
//     document.addEventListener('DOMContentLoaded', initCalendars);
// }

// // Observe for dynamically added blocks (editor)
// if (window.MutationObserver) {
//     const observer = new MutationObserver(initCalendars);
//     observer.observe(document.body, { childList: true, subtree: true });
// }
