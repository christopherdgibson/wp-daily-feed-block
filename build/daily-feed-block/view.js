/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/daily-feed-block/assets/js/calendar.js"
/*!****************************************************!*\
  !*** ./src/daily-feed-block/assets/js/calendar.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalendarControl: () => (/* binding */ CalendarControl),
/* harmony export */   createCalendarControl: () => (/* binding */ createCalendarControl)
/* harmony export */ });
//check the console for date click event
//Fixed day highlight
//Added previous month and next month view

class CalendarControl {
  constructor(calendarContainerRef) {
    this.calendarContainerRef = calendarContainerRef;
    this.selectedDate = new Date();
    // this.onDateChange = null;
    //console.log("createCalendarControl constructor initialised");
    createCalendarControl(calendarContainerRef, this.handleDateChange.bind(this));
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
function createCalendarControl(calendarContainerRef, onDateChange) {
  const calendarRef = calendarContainerRef.querySelector('.calendar');
  const calendar = new Date();
  const calendarControl = {
    localDate: new Date(),
    prevMonthLastDate: null,
    calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calMonthName: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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
      let lastDate = new Date(calendar.getFullYear(), calendar.getMonth(), 0).getDate();
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
      console.log(`inside create block: ${e.target.textContent} ${calendarControl.calMonthName[calendar.getMonth()]} ${calendar.getFullYear()}`);
      calendarControl.outlineSelected(e.target.textContent);
    },
    plotSelectors: function () {
      // calendarRef.innerHTML += 
      calendarRef.insertAdjacentHTML('beforeend', `<div class="calendar-inner"><div class="calendar-controls">
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
            ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]}
            ${calendarControl.localDate.getFullYear()}
          </div>
          <div class="calendar-body"></div></div>`);
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
        calendarRef.querySelector(".calendar-body").insertAdjacentHTML('beforeend', `<div>${calendarControl.calWeekDays[i]}</div>`);
        // calendarRef.querySelector(
        // 	".calendar-body",
        // ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
      }
    },
    plotDates: function () {
      calendarRef.querySelector(".calendar-body").innerHTML = "";
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
      let count = 1;
      let prevDateCount = 0;
      calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl.daysInMonth(calendar.getMonth() + 1, calendar.getFullYear());
      // dates of current month
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          // calendarRef.querySelector(
          // 	".calendar-body",
          // ).innerHTML += `<div class="prev-dates"></div>`;
          calendarRef.querySelector(".calendar-body").insertAdjacentHTML('beforeend', `<div class="prev-dates"></div>`);
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          // calendarRef.querySelector(
          // 	".calendar-body",
          // ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
          calendarRef.querySelector(".calendar-body").insertAdjacentHTML('beforeend', `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`);
        }
      }
      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        // calendarRef.querySelector(
        // 	".calendar-body",
        // ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        calendarRef.querySelector(".calendar-body").insertAdjacentHTML('beforeend', `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`);
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
      prevBtn.addEventListener("click", calendarControl.navigateToPreviousMonth, false);
      nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
      todayDate.addEventListener("click", calendarControl.navigateToCurrentMonth, false);
      for (var i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener("click", calendarControl.selectDate, false);
      }
    },
    highlightToday: function () {
      let currentMonth = calendarControl.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (currentYear === changedYear && currentMonth === changedMonth && calendarRef.querySelectorAll(".number-item")) {
        calendarRef.querySelectorAll(".number-item")[calendar.getDate() - 1].classList.add("calendar-today");
      }
    },
    outlineSelected: function (day) {
      let dateItems = calendarRef.querySelectorAll(".number-item");
      for (const item of dateItems) {
        const date = item.querySelector(".dateNumber");
        if (date.innerHTML == day & !item.classList.contains("calendar-today")) {
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
      let childElemCount = calendarRef.querySelector(".calendar-body").childElementCount;
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
          // calendarRef.querySelector(".calendar-body").innerHTML += `<div class="next-dates">${i}</div>`;
          calendarRef.querySelector(".calendar-body").insertAdjacentHTML('beforeend', `<div class="next-dates">${i}</div>`);
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
    }
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

/***/ },

/***/ "./src/daily-feed-block/assets/js/dailyApi.js"
/*!****************************************************!*\
  !*** ./src/daily-feed-block/assets/js/dailyApi.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populateDailyApiData: () => (/* binding */ populateDailyApiData),
/* harmony export */   refreshRawJsonData: () => (/* binding */ refreshRawJsonData)
/* harmony export */ });
async function populateDailyApiData(containerRef, date, updateDate = true, eventKey = "Events") {
  const apiDataDiv = containerRef.querySelector(".api-data");
  if (!apiDataDiv) return;
  const result = await fetchDailyApiData(date, eventKey);
  if (result.success) {
    apiDataDiv.innerHTML = `
			<div class="api-data-body">${result.body}</div>
			<div class="api-data-copyright">${result.reference}</div>
		`;
  } else {
    apiDataDiv.innerHTML = result.error;
    // setApiError(result.error);
    if (result.skipDate) {
      return; // Do not set date 
    }
  }
  if (updateDate) {
    setApiDataDate(containerRef, date);
  }
}
async function fetchDailyApiData(date, eventKey = "Events") {
  // if (no proxy) // for additional parameter to select proxy, otw try catch try proxy
  // const apiUrl = getApiUrl(date);
  // console.log("apiUrl:", apiUrl);

  const proxyPath = getProxyUrl(date);
  const mapResponse = (data, key) => ({
    body: data?.[key]?.[0]?.text,
    reference: data?.[key]?.[0]?.html
  });
  return fetchWithRetry(proxyPath).then(jsondta => {
    const {
      body,
      reference
    } = mapResponse(jsondta?.data, eventKey);
    if (body) {
      console.log("jsondta.data:", jsondta.data);
      return {
        success: true,
        body: body,
        reference: reference
      };
    } else {
      if (jsondta == "Too many requests.") {
        return {
          success: false,
          skipDate: false,
          error: "Too many requests. Please wait at least 30 seconds."
        };
      } else {
        return {
          success: false,
          skipDate: false,
          error: "No data found. Try reloading page."
        };
      }
    }
  }).catch(error => {
    console.error("Error:", error);
    return {
      success: false,
      skipDate: true,
      error: "An unexpected error occurred."
    };
  });
}
async function refreshRawJsonData(rawJsonRef, date) {
  if (!rawJsonRef) return;
  rawJsonRef.innerHTML = "Loading raw data...";
  const proxyPath = getProxyUrl(date);
  fetchWithRetry(proxyPath).then(jsondta => {
    rawJsonRef.innerHTML = renderValueCollapsible(jsondta);
  });
}
function renderValueRecursive(val) {
  if (val === null) return `<span class="null">null</span>`;
  if (typeof val !== 'object') return `<span>${val}</span>`;
  if (Array.isArray(val)) {
    return `<ul>${val.map(item => `<li>${renderValueRecursive(item)}</li>`).join('')}</ul>`;
  }

  // Plain object
  return `<dl>
    ${Object.entries(val).map(([k, v]) => `<dt><b>${k}</b></dt><dd>${renderValueRecursive(v)}</dd>`).join('')}
  </dl>`;
}
function renderValueCollapsible(val, key = '') {
  if (val === null || typeof val !== 'object') {
    return `${key ? `<b>${key}:</b> ` : ''}${val}`;
  }
  const entries = Array.isArray(val) ? val.map((v, i) => renderValueCollapsible(v, i)) : Object.entries(val).map(([k, v]) => renderValueCollapsible(v, k));
  const label = key ? `${key} (${Array.isArray(val) ? `${val.length} items` : 'object'})` : 'root';
  return `<details open>
    <summary>${label}</summary>
    <div style="padding-left:1em">${entries.join('<br>')}</div>
  </details>`;
}
function setApiDataDate(containerRef, date) {
  const monthName = date.toLocaleString("default", {
    month: "long"
  });
  const apiDataDate = containerRef.querySelector(".api-data-date");
  apiDataDate.innerHTML = `Daily api data for ${monthName} ${date.getDate()}.`;
  console.log("api data date element:", apiDataDate);
}
function getApiUrl(date, padded = true) {
  let day = date.getDate();
  if (padded == true && day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  return `https://today.zenquotes.io/api/${month}/${day}`;
}
function getProxyUrl(date, padded = true) {
  const apiUrl = getApiUrl(date, padded);
  return `${dailyFeedBlock.ajaxUrl}?action=api_proxy&url=${apiUrl}`;
}
function fetchJsonAsync(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then(res => res.json()).then(jsondta => resolve(jsondta)).catch(error => {
      console.error(err);
      reject(error);
    });
  });
}
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      if ("success" in data && !data.success) {
        if (data.data && data.data.error && data.data.error.includes("cURL error 28")) {
          throw new Error("timeout");
        }
        throw new Error(data.message || "API returned success: false");
      }
      if (!data.data || !data.data.Events) {
        if (data[0]?.q && data[0]?.q?.includes("Too many requests. Obtain an auth key for unlimited access")) {
          console.log("Too many requests: ", data);
          return "Too many requests.";
        } else {
          console.log("data missing expected structure error:", data);
          throw new Error("API data missing expected structure.");
        }
      }
      return data;
    } catch (err) {
      if (attempt < retries && (err.message === "timeout" || err.name === "TypeError")) {
        console.log("Trying to fetch again, attempt:", attempt);
        await new Promise(res => setTimeout(res, delay));
        // retry!
      } else {
        throw err;
      }
    }
  }
}

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/daily-feed-block/view.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_js_calendar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/js/calendar.js */ "./src/daily-feed-block/assets/js/calendar.js");
/* harmony import */ var _assets_js_dailyApi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/js/dailyApi.js */ "./src/daily-feed-block/assets/js/dailyApi.js");


document.addEventListener("DOMContentLoaded", () => {
  const calendarCard = document.querySelector('.api-data-container .card');
  const calendarContainer = calendarCard.querySelector('.calendar-container');

  // Set calendar events
  const instance = new _assets_js_calendar_js__WEBPACK_IMPORTED_MODULE_0__.CalendarControl(calendarContainer);
  instance.setOnDateChange(date => {
    (0,_assets_js_dailyApi_js__WEBPACK_IMPORTED_MODULE_1__.populateDailyApiData)(calendarCard, date, true);
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
  });
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map