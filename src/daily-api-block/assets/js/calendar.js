//check the console for date click event
//Fixed day highlight
//Added previous month and next month view

export class CalendarControl {
	constructor(calendarRef) {
		this.calendarRef = calendarRef;
		this.selectedDate = new Date();
		// this.onDateChange = null;
		//console.log("createCalendarControl constructor initialised");
		createCalendarControl(calendarRef, this.handleDateChange.bind(this));
	}

	handleDateChange(date) {
		console.log("Date cell clicked");
		this.selectedDate = date;
		if (this.onDateChange) {
			this.onDateChange(this.selectedDate);
		}
	}

	setOnDateChange(callback) {
		this.onDateChange = callback;
		if (this.onDateChange) {
			this.onDateChange(this.selectedDate);
		}
	}

	getActiveDate() {
		console.log("Active date:", this.selectedDate);
		return this.selectedDate;
	}
}

export function createCalendarControl(calendarRef, onDateChange) {
	const calendar = new Date();
	const calendarControl = {
		localDate: new Date(),
		prevMonthLastDate: null,
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
		daysInMonth: function (month, year) {
			return new Date(year, month, 0).getDate();
		},
		firstDay: function () {
			return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
		},
		lastDay: function () {
			return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
		},
		firstDayNumber: function () {
			return calendarControl.firstDay().getDay() + 1;
		},
		lastDayNumber: function () {
			return calendarControl.lastDay().getDay() + 1;
		},
		getPreviousMonthLastDate: function () {
			let lastDate = new Date(
				calendar.getFullYear(),
				calendar.getMonth(),
				0,
			).getDate();
			return lastDate;
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
			calendar.setYear(currentYear);
			calendarControl.attachEventsOnNextPrev();
		},
		displayYear: function () {
			let yearLabel = calendarRef.querySelector(".calendar-year-label");
			yearLabel.innerHTML = calendar.getFullYear();
		},
		displayMonth: function () {
			let monthLabel = calendarRef.querySelector(".calendar-month-label");
			monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
		},
		selectDate: function (e) {
			e.preventDefault();
			const day = parseInt(e.target.textContent, 10);
			const month = calendar.getMonth();
			const year = calendar.getFullYear();
			const selectedDate = new Date(year, month, day);
			if (onDateChange) {
				onDateChange(selectedDate);
			}
			console.log(
				`inside create block: ${e.target.textContent} ${
					calendarControl.calMonthName[calendar.getMonth()]
				} ${calendar.getFullYear()}`,
			);
			calendarControl.outlineSelected(e.target.textContent);
		},
		plotSelectors: function () {
			calendarRef.innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
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
          <div class="calendar-body"></div></div>`;
		},
		plotDayNames: function () {
			for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
				calendarRef.querySelector(
					".calendar-body",
				).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
			}
		},
		plotDates: function () {
			calendarRef.querySelector(".calendar-body").innerHTML = "";
			calendarControl.plotDayNames();
			calendarControl.displayMonth();
			calendarControl.displayYear();
			let count = 1;
			let prevDateCount = 0;

			calendarControl.prevMonthLastDate =
				calendarControl.getPreviousMonthLastDate();
			let prevMonthDatesArray = [];
			let calendarDays = calendarControl.daysInMonth(
				calendar.getMonth() + 1,
				calendar.getFullYear(),
			);
			// dates of current month
			for (let i = 1; i < calendarDays; i++) {
				if (i < calendarControl.firstDayNumber()) {
					prevDateCount += 1;
					calendarRef.querySelector(
						".calendar-body",
					).innerHTML += `<div class="prev-dates"></div>`;
					prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
				} else {
					calendarRef.querySelector(
						".calendar-body",
					).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
				}
			}
			//remaining dates after month dates
			for (let j = 0; j < prevDateCount + 1; j++) {
				calendarRef.querySelector(
					".calendar-body",
				).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
			}
			calendarControl.highlightToday();
			calendarControl.plotPrevMonthDates(prevMonthDatesArray);
			calendarControl.plotNextMonthDates();
		},
		attachEvents: function () {
			let prevBtn = calendarRef.querySelector(".calendar-prev a");
			let nextBtn = calendarRef.querySelector(".calendar-next a");
			let todayDate = calendarRef.querySelector(".calendar-today-date");
			let dateNumber = calendarRef.querySelectorAll(".dateNumber");
			prevBtn.addEventListener(
				"click",
				calendarControl.navigateToPreviousMonth,
				false
			);
			nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
			todayDate.addEventListener(
				"click",
				calendarControl.navigateToCurrentMonth,
				false
			);
			for (var i = 0; i < dateNumber.length; i++) {
				dateNumber[i].addEventListener(
					"click",
					calendarControl.selectDate,
					false
				);
			}
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
		outlineSelected: function (day) {
			let dateItems = calendarRef.querySelectorAll(".number-item");
			for (const item of dateItems) {
				const date = item.querySelector(".dateNumber");
				if (
					(date.innerHTML == day) &
					!item.classList.contains("calendar-today")
				) {
					item.classList.add("calendar-select");
				} else if (item.classList.contains("calendar-select")) {
					item.classList.remove("calendar-select");
				}
			}
			// console.log(dateItems.innerHTML);
			// console.log(day);
			// dateItems.classList.add("calendar-select");
		},
		plotPrevMonthDates: function (dates) {
			dates.reverse();
			for (let i = 0; i < dates.length; i++) {
				if (calendarRef.querySelectorAll(".prev-dates")) {
					calendarRef.querySelectorAll(".prev-dates")[i].textContent = dates[i];
				}
			}
		},
		plotNextMonthDates: function () {
			let childElemCount =
				calendarRef.querySelector(".calendar-body").childElementCount;
			//7 lines
			if (childElemCount > 42) {
				let diff = 49 - childElemCount;
				calendarControl.loopThroughNextDays(diff);
			}

			//6 lines
			if (childElemCount > 35 && childElemCount <= 42) {
				let diff = 42 - childElemCount;
				calendarControl.loopThroughNextDays(42 - childElemCount);
			}
		},
		loopThroughNextDays: function (count) {
			if (count > 0) {
				for (let i = 1; i <= count; i++) {
					calendarRef.querySelector(
						".calendar-body",
					).innerHTML += `<div class="next-dates">${i}</div>`;
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
			// const today = new Date();
			// return today;
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
