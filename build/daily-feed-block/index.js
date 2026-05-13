/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/daily-feed-block/assets/css/calendar.css"
/*!******************************************************!*\
  !*** ./src/daily-feed-block/assets/css/calendar.css ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/daily-feed-block/assets/css/dailyApi.css"
/*!******************************************************!*\
  !*** ./src/daily-feed-block/assets/css/dailyApi.css ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

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

/***/ },

/***/ "./src/daily-feed-block/block.json"
/*!*****************************************!*\
  !*** ./src/daily-feed-block/block.json ***!
  \*****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/daily-feed-block","version":"0.1.0","title":"Daily Feed Block","author":"Christopher D Gibson","authorURI":"https://christopherdgibson.github.io","description":"A daily API display block with calendar navigation.","category":"widgets","icon":"rss","license":"GPL-2.0-or-later","licenseURI":"https://www.gnu.org/licenses/gpl-2.0.html","example":{},"attributes":{"align":{"type":"string","default":"wide"},"calendarBgColor":{"type":"string","default":"#262829"},"calendarFontColor":{"type":"string","default":"#fff"},"cardBgColor":{"type":"string","default":"#e3e3e3"},"cardFontColor":{"type":"string","default":"#0d3ca1"},"gradientColorLeft":{"type":"string","default":"#0000FF"},"gradientColorRight":{"type":"string","default":"#FFA500"}},"supports":{"align":["wide","full"],"color":{"text":true},"html":false},"usesContext":[],"render":"file:./render.php","textdomain":"daily-feed-block","editorScript":"file:./index.js","editorStyle":["file:./index.css"],"style":["file:./index.css"],"viewScript":"file:./view.js"}');

/***/ },

/***/ "./src/daily-feed-block/components/ui-panels/CalendarColorsPanel.jsx"
/*!***************************************************************************!*\
  !*** ./src/daily-feed-block/components/ui-panels/CalendarColorsPanel.jsx ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CalendarColorsPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TabButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabButton */ "./src/daily-feed-block/components/ui-panels/TabButton.jsx");
/* harmony import */ var _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @daily-feed-block/constants.json */ "./src/daily-feed-block/constants.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const DEFAULT_CAL_BG_COLOR = _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_3__.calendarDefaults.calendarBgColor;
const DEFAULT_CAL_FONT_COLOR = _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_3__.calendarDefaults.calendarFontColor;
function CalendarColorsPanel({
  attributes,
  setAttributes
}) {
  const {
    calendarBgColor,
    calendarFontColor
  } = attributes;
  const [activeTab, setActiveTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("background");
  const [isModalOpenDefaultCalendar, setIsModalOpenDefaultCalendar] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelBody, {
    title: "Calendar Design",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ButtonGroup, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_TabButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
        tabName: "background",
        tabText: "Background",
        activeTab: activeTab,
        setActiveTab: setActiveTab
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_TabButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
        tabName: "text",
        tabText: "Text",
        activeTab: activeTab,
        setActiveTab: setActiveTab
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_TabButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
        tabName: "defaults",
        tabText: "Defaults",
        activeTab: activeTab,
        setActiveTab: setActiveTab
      })]
    }), activeTab === "background" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ColorPicker, {
      color: calendarBgColor,
      onChangeComplete: value => setAttributes({
        calendarBgColor: value.hex
      }),
      disableAlpha: true
    }), activeTab === "text" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ColorPicker, {
      color: calendarFontColor,
      onChangeComplete: value => setAttributes({
        calendarFontColor: value.hex
      }),
      disableAlpha: true
    }), activeTab === "defaults" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      style: {
        marginTop: "1em",
        textAlign: "center"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        variant: "primary",
        onClickCapture: () => setIsModalOpenDefaultCalendar(true),
        children: "Restore to defaults"
      }), isModalOpenDefaultCalendar && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, {
        title: "Restore Defaults",
        onRequestClose: () => setIsModalOpenDefaultCalendar(false),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          children: "Are you sure you want to restore the default colors?"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          variant: "primary",
          onClick: () => {
            setAttributes({
              calendarBgColor: DEFAULT_CAL_BG_COLOR,
              calendarFontColor: DEFAULT_CAL_FONT_COLOR
            });
            setIsModalOpenDefaultCalendar(false);
          },
          children: "Yes, restore."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          variant: "secondary",
          onClick: () => setIsModalOpenDefaultCalendar(false),
          style: {
            marginLeft: "1em"
          },
          children: "Cancel"
        })]
      })]
    })]
  });
}

/***/ },

/***/ "./src/daily-feed-block/components/ui-panels/CardColorsPanel/index.jsx"
/*!*****************************************************************************!*\
  !*** ./src/daily-feed-block/components/ui-panels/CardColorsPanel/index.jsx ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CardColorsPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.css */ "./src/daily-feed-block/components/ui-panels/CardColorsPanel/styles.css");
/* harmony import */ var _components_ui_panels_TabButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/ui-panels/TabButton */ "./src/daily-feed-block/components/ui-panels/TabButton.jsx");
/* harmony import */ var _components_ui_panels_PresetColorsPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/ui-panels/PresetColorsPanel */ "./src/daily-feed-block/components/ui-panels/PresetColorsPanel/index.jsx");
/* harmony import */ var _components_ui_panels_CustomColorsPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @components/ui-panels/CustomColorsPanel */ "./src/daily-feed-block/components/ui-panels/CustomColorsPanel/index.jsx");
/* harmony import */ var _components_ui_panels_RestoreToDefaults__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @components/ui-panels/RestoreToDefaults */ "./src/daily-feed-block/components/ui-panels/RestoreToDefaults.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








function CardColorsPanel({
  attributes,
  setAttributes
}) {
  const [activeTab, setActiveTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("presets");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelBody, {
    title: "Card Design",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ButtonGroup, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ui_panels_TabButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
        tabName: "presets",
        tabText: "Presets",
        activeTab: activeTab,
        setActiveTab: setActiveTab
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ui_panels_TabButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
        tabName: "custom",
        tabText: "Custom",
        activeTab: activeTab,
        setActiveTab: setActiveTab
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ui_panels_TabButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
        tabName: "defaults",
        tabText: "Defaults",
        activeTab: activeTab,
        setActiveTab: setActiveTab
      })]
    }), activeTab === "presets" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ui_panels_PresetColorsPanel__WEBPACK_IMPORTED_MODULE_4__["default"], {
      setAttributes: setAttributes
    }), activeTab === "custom" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ui_panels_CustomColorsPanel__WEBPACK_IMPORTED_MODULE_5__["default"], {
      attributes: attributes,
      setAttributes: setAttributes
    }), activeTab === "defaults" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ui_panels_RestoreToDefaults__WEBPACK_IMPORTED_MODULE_6__["default"], {
      setAttributes: setAttributes
    })]
  });
}

/***/ },

/***/ "./src/daily-feed-block/components/ui-panels/CardColorsPanel/styles.css"
/*!******************************************************************************!*\
  !*** ./src/daily-feed-block/components/ui-panels/CardColorsPanel/styles.css ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/daily-feed-block/components/ui-panels/CustomColorsPanel/index.jsx"
/*!*******************************************************************************!*\
  !*** ./src/daily-feed-block/components/ui-panels/CustomColorsPanel/index.jsx ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomColorsPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ui_panels_TabButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/ui-panels/TabButton */ "./src/daily-feed-block/components/ui-panels/TabButton.jsx");
/* harmony import */ var _components_ui_panels_GradientColorsPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/ui-panels/GradientColorsPanel */ "./src/daily-feed-block/components/ui-panels/GradientColorsPanel.jsx");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.css */ "./src/daily-feed-block/components/ui-panels/CustomColorsPanel/styles.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






function CustomColorsPanel({
  attributes,
  setAttributes
}) {
  const {
    cardBgColor,
    cardFontColor
  } = attributes;
  const [activeSubTab, setActiveSubTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("background");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_ui_panels_TabButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
        tabName: "background",
        tabText: "Background",
        activeTab: activeSubTab,
        setActiveTab: setActiveSubTab
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_ui_panels_TabButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
        tabName: "text",
        tabText: "Text",
        activeTab: activeSubTab,
        setActiveTab: setActiveSubTab
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_ui_panels_TabButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
        tabName: "gradient",
        tabText: "Gradient",
        activeTab: activeSubTab,
        setActiveTab: setActiveSubTab
      })]
    }), activeSubTab === "background" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
      color: cardBgColor,
      onChangeComplete: value => setAttributes({
        cardBgColor: value.hex
      }),
      disableAlpha: true
    }), activeSubTab === "text" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
      color: cardFontColor,
      onChangeComplete: value => setAttributes({
        cardFontColor: value.hex
      }),
      disableAlpha: true
    }), activeSubTab === "gradient" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_ui_panels_GradientColorsPanel__WEBPACK_IMPORTED_MODULE_3__["default"], {
      attributes: attributes,
      setAttributes: setAttributes
    })]
  });
}

// function customColorsPanel() {
//   return (
//     <>
//       <ButtonGroup>
//         {addActiveSubTab("background", "Background")}
//         {addActiveSubTab("text", "Text")}
//         {addActiveSubTab("gradient", "Gradient")}
//       </ButtonGroup>
//       {subTabContent[activeSubTab]}
//     </>
//   );
// }

// const subTabContent = {
//   background: (
//     <ColorPicker
//       color={cardBgColor}
//       onChangeComplete={(value) => setAttributes({ cardBgColor: value.hex })}
//       disableAlpha
//     />
//   ),
//   text: (
//     <ColorPicker
//       color={cardFontColor}
//       onChangeComplete={(value) =>
//         setAttributes({ cardFontColor: value.hex })
//       }
//       disableAlpha
//     />
//   ),
//   gradient: (
//     <GradientColorsPanel
//       gradientColorLeft={gradientColorLeft}
//       gradientColorRight={gradientColorRight}
//       setAttributes={setAttributes}
//     />
//   ),
// };

/***/ },

/***/ "./src/daily-feed-block/components/ui-panels/CustomColorsPanel/styles.css"
/*!********************************************************************************!*\
  !*** ./src/daily-feed-block/components/ui-panels/CustomColorsPanel/styles.css ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/daily-feed-block/components/ui-panels/GradientColorsPanel.jsx"
/*!***************************************************************************!*\
  !*** ./src/daily-feed-block/components/ui-panels/GradientColorsPanel.jsx ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GradientColorsPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @daily-feed-block/constants.json */ "./src/daily-feed-block/constants.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const DEFAULT_GRADIENT_LEFT = _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__.themePresets.default.gradientColorLeft;
const DEFAULT_GRADIENT_RIGHT = _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__.themePresets.default.gradientColorRight;
const DUOTONE_PALETTE = _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__.duotonePalette;
function GradientColorsPanel({
  attributes,
  setAttributes
}) {
  const duotoneRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // Remove unused Duotone elements
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!duotoneRef.current) return;
    duotoneRef.current.querySelectorAll(".components-color-list-picker__swatch-button").forEach(btn => btn.remove());
    duotoneRef.current.querySelector("button.components-circular-option-picker__clear")?.remove();
  }, []);
  const {
    gradientColorLeft,
    gradientColorRight
  } = attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelBody, {
    title: "Gradient Colors",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      ref: duotoneRef,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.DuotonePicker, {
        duotonePalette: DUOTONE_PALETTE,
        value: gradientColorLeft && gradientColorRight ? [gradientColorLeft, gradientColorRight] : [DEFAULT_GRADIENT_LEFT, DEFAULT_GRADIENT_LEFT],
        onChange: newValue => {
          if (newValue === undefined || newValue === "unset") {
            setAttributes({
              gradientColorLeft: "transparent",
              gradientColorRight: "transparent"
            });
          } else if (!Array.isArray(newValue) || newValue.length !== 2) {
            setAttributes({
              gradientColorLeft: DEFAULT_GRADIENT_LEFT,
              gradientColorRight: DEFAULT_GRADIENT_RIGHT
            });
          } else {
            setAttributes({
              gradientColorLeft: newValue[0],
              gradientColorRight: newValue[1]
            });
          }
        }
      })
    })
  });
}

/***/ },

/***/ "./src/daily-feed-block/components/ui-panels/PresetColorsPanel/index.jsx"
/*!*******************************************************************************!*\
  !*** ./src/daily-feed-block/components/ui-panels/PresetColorsPanel/index.jsx ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PresetColorsPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @daily-feed-block/constants.json */ "./src/daily-feed-block/constants.json");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.css */ "./src/daily-feed-block/components/ui-panels/PresetColorsPanel/styles.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const THEME_PRESETS = _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__.themePresets;
function PresetColorsPanel({
  setAttributes
}) {
  const [activeTheme, setActiveTheme] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("default-colors");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "btn-grid",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ThemeButton, {
      themeName: "blue",
      themeText: "Blue theme",
      activeTheme: activeTheme,
      setActiveTheme: setActiveTheme,
      setAttributes: setAttributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ThemeButton, {
      themeName: "forest",
      themeText: "Forest theme",
      activeTheme: activeTheme,
      setActiveTheme: setActiveTheme,
      setAttributes: setAttributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ThemeButton, {
      themeName: "plum",
      themeText: "Plum theme",
      activeTheme: activeTheme,
      setActiveTheme: setActiveTheme,
      setAttributes: setAttributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ThemeButton, {
      themeName: "slate",
      themeText: "Slate theme",
      activeTheme: activeTheme,
      setActiveTheme: setActiveTheme,
      setAttributes: setAttributes
    })]
  });
}
function ThemeButton({
  themeName,
  themeText,
  activeTheme,
  setActiveTheme,
  setAttributes
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
    className: `btn-theme-color btn-${themeName}${activeTheme === themeName ? " selected" : ""}`,
    onClick: () => {
      setActiveTheme(themeName);
      setAttributes({
        ...THEME_PRESETS[themeName]
      });
    },
    children: themeText
  });
}

/***/ },

/***/ "./src/daily-feed-block/components/ui-panels/PresetColorsPanel/styles.css"
/*!********************************************************************************!*\
  !*** ./src/daily-feed-block/components/ui-panels/PresetColorsPanel/styles.css ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/daily-feed-block/components/ui-panels/RestoreToDefaults.jsx"
/*!*************************************************************************!*\
  !*** ./src/daily-feed-block/components/ui-panels/RestoreToDefaults.jsx ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RestoreToDefaults)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @daily-feed-block/constants.json */ "./src/daily-feed-block/constants.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const DEFAULT_GRADIENT_LEFT = _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__.themePresets.default.gradientColorLeft;
const DEFAULT_GRADIENT_RIGHT = _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__.themePresets.default.gradientColorRight;
const DEFAULT_BG_COLOR = _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__.themePresets.default.cardBgColor;
const DEFAULT_FONT_COLOR = _daily_feed_block_constants_json__WEBPACK_IMPORTED_MODULE_2__.themePresets.default.cardFontColor;
function RestoreToDefaults({
  setAttributes
}) {
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    style: {
      marginTop: "1em",
      textAlign: "center"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
      variant: "primary",
      onClickCapture: () => setIsModalOpen(true),
      children: "Restore to defaults"
    }), isModalOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, {
      title: "Restore Defaults",
      onRequestClose: () => setIsModalOpen(false),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
        children: "Are you sure you want to restore the default colors?"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        variant: "primary",
        onClick: () => {
          setAttributes({
            gradientColorLeft: DEFAULT_GRADIENT_LEFT,
            gradientColorRight: DEFAULT_GRADIENT_RIGHT,
            cardBgColor: DEFAULT_BG_COLOR,
            cardFontColor: DEFAULT_FONT_COLOR
          });
          setIsModalOpen(false);
        },
        children: "Yes, restore."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        variant: "secondary",
        onClick: () => setIsModalOpen(false),
        style: {
          marginLeft: "1em"
        },
        children: "Cancel"
      })]
    })]
  });
}

/***/ },

/***/ "./src/daily-feed-block/components/ui-panels/TabButton.jsx"
/*!*****************************************************************!*\
  !*** ./src/daily-feed-block/components/ui-panels/TabButton.jsx ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TabButton)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function TabButton({
  tabName,
  tabText,
  activeTab,
  setActiveTab
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: activeTab === tabName ? "primary" : "secondary",
    onClick: () => setActiveTab(tabName),
    children: tabText
  });
}

/***/ },

/***/ "./src/daily-feed-block/constants.json"
/*!*********************************************!*\
  !*** ./src/daily-feed-block/constants.json ***!
  \*********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"calendarDefaults":{"calendarBgColor":"#262829","calendarFontColor":"#fff"},"duotonePalette":[{"colors":["#0000FF","#FFA500"],"name":"Default","slug":"default-theme-colors"},{"colors":["#1a56d6","#e07b20"],"name":"Blue and orange","slug":"blue-orange"},{"colors":["#1a6b3c","#c4962a"],"name":"Forest and gold","slug":"forest-gold"},{"colors":["#5b2d8e","#c0392b"],"name":"Plum and red","slug":"plum-red"},{"colors":["#2c4a6e","#e05c3a"],"name":"Slate and salmon","slug":"slate-salmon"},{"colors":["#8c00b7","#fcff41"],"name":"Purple and yellow","slug":"purple-yellow"},{"colors":["#6e0edc","#b7b7b7"],"name":"Purple and grey","slug":"purple-grey"},{"colors":["#000097","#ff4747"],"name":"Blue and red","slug":"blue-red"},{"colors":["#000097","#82c1f2"],"name":"Blue and light blue","slug":"blue-light-blue"}],"themePresets":{"default":{"cardBgColor":"#e3e3e3","cardFontColor":"#0d3ca1","gradientColorLeft":"#0000FF","gradientColorRight":"#FFA500"},"blue":{"gradientColorLeft":"#1a56d6","gradientColorRight":"#e07b20","cardFontColor":"#1a56d6","cardBgColor":"#c2ddf7"},"forest":{"gradientColorLeft":"#1a6b3c","gradientColorRight":"#c4962a","cardFontColor":"#1a6b3c","cardBgColor":"#b8dfc8"},"plum":{"gradientColorLeft":"#5b2d8e","gradientColorRight":"#c0392b","cardFontColor":"#5b2d8e","cardBgColor":"#d4bfee"},"slate":{"gradientColorLeft":"#2c4a6e","gradientColorRight":"#e05c3a","cardFontColor":"#2c4a6e","cardBgColor":"#b8cfe0"}}}');

/***/ },

/***/ "./src/daily-feed-block/edit.js"
/*!**************************************!*\
  !*** ./src/daily-feed-block/edit.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_css_dailyApi_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/css/dailyApi.css */ "./src/daily-feed-block/assets/css/dailyApi.css");
/* harmony import */ var _assets_css_calendar_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/css/calendar.css */ "./src/daily-feed-block/assets/css/calendar.css");
/* harmony import */ var _assets_js_calendar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/js/calendar.js */ "./src/daily-feed-block/assets/js/calendar.js");
/* harmony import */ var _assets_js_dailyApi_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/js/dailyApi.js */ "./src/daily-feed-block/assets/js/dailyApi.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_ui_panels_CalendarColorsPanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @components/ui-panels/CalendarColorsPanel */ "./src/daily-feed-block/components/ui-panels/CalendarColorsPanel.jsx");
/* harmony import */ var _components_ui_panels_CardColorsPanel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @components/ui-panels/CardColorsPanel */ "./src/daily-feed-block/components/ui-panels/CardColorsPanel/index.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import "./editor.scss";









const CalendarMount = React.memo(({
  containerRef,
  style
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
  ref: containerRef,
  class: "calendar",
  style: style
}), () => true
// (prevProps, nextProps) => prevProps.style.display === nextProps.style.display
);

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
function Edit({
  attributes,
  setAttributes
}) {
  const {
    calendarBgColor,
    calendarFontColor,
    cardBgColor,
    cardFontColor,
    gradientColorLeft,
    gradientColorRight
  } = attributes;
  const [calendarInstance, setCalendarInstance] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(null);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: "api-data-container"
  });
  const [isCalendarOpen, setIsCalendarOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
  const containerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)();
  const apiDataRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)();
  const calendarContainerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)();
  const rawJsonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)();
  const calendarRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useRef)();
  const [selectedDate, setSelectedDate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(new Date());
  const [isRawExpanded, setIsRawExpanded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    // prime the proxy with a cheap request on mount
    console.log("Prime the proxy with a cheap request on mount.");
    fetch(`${dailyFeedBlock.ajaxUrl}?action=api_proxy&url=https://today.zenquotes.io/api/01/01;`).catch(() => {}); // silently discard result
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    if (!calendarInstance && calendarContainerRef.current) {
      const instance = new _assets_js_calendar_js__WEBPACK_IMPORTED_MODULE_5__.CalendarControl(calendarContainerRef.current);
      instance.setOnDateChange(date => {
        (0,_assets_js_dailyApi_js__WEBPACK_IMPORTED_MODULE_6__.populateDailyApiData)(containerRef.current, date);
        setSelectedDate(date);
      });
      setCalendarInstance(instance);
    }
  }, [calendarInstance]);

  // const currentDate = new Date();
  // const currentDay = currentDate.getDate().toString();
  // const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentDay = selectedDate.getDate().toString();
  const currentMonth = selectedDate.toLocaleString("default", {
    month: "long"
  });
  function DailyApi() {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_ui_panels_CalendarColorsPanel__WEBPACK_IMPORTED_MODULE_8__["default"], {
        attributes: attributes,
        setAttributes: setAttributes
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_ui_panels_CardColorsPanel__WEBPACK_IMPORTED_MODULE_9__["default"], {
        attributes: attributes,
        setAttributes: setAttributes
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      ...blockProps,
      style: {
        "--base-bg": cardBgColor,
        "--font-selected": cardFontColor,
        "--accent-primary": gradientColorLeft,
        "--accent-secondary": gradientColorRight
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("svg", {
        width: "0",
        height: "0",
        style: {
          position: "absolute"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("defs", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("linearGradient", {
            id: "iconGrad",
            x1: "0",
            y1: "0",
            x2: "1",
            y2: "1",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("stop", {
              offset: "0%",
              stopColor: "var(--accent-primary)"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("stop", {
              offset: "100%",
              stopColor: "var(--accent-secondary)"
            })]
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        class: "card",
        ref: containerRef,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "card-container",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            class: `calendar-overlay${isCalendarOpen ? " expanded" : ""}`,
            onClick: e => {
              if (!calendarRef.current.contains(e.target)) setIsCalendarOpen(false);
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
              ref: calendarContainerRef,
              class: "calendar-container",
              style: {
                "--calendar-bg-color": calendarBgColor,
                "--calendar-font-color": calendarFontColor
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("button", {
                class: "close-popup",
                children: "X"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(CalendarMount, {
                containerRef: calendarRef
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "api-data-column",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
              class: "api-data-date-container",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                class: "api-data-date",
                children: ["Daily feed for ", currentDay, " ", currentMonth]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("button", {
                className: "btn-calendar-toggle",
                onClick: e => {
                  // e.preventDefault();
                  setIsCalendarOpen(true);
                  e.stopPropagation();
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                  class: "calendar-icon",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                    className: "tool-tip",
                    children: "Open calendar to choose date"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("svg", {
                    viewBox: "0 0 32 32",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("g", {
                      fill: "url(#iconGrad)",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                        d: "M24,29H8a5,5,0,0,1-5-5V10A5,5,0,0,1,8,5H24a5,5,0,0,1,5,5V24A5,5,0,0,1,24,29ZM8,7a3,3,0,0,0-3,3V24a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3Z"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                        d: "M24,25H20a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v4A1,1,0,0,1,24,25Zm-3-2h2V21H21Z"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                        d: "M28,13H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                        d: "M11,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,11,9Z"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                        d: "M21,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,21,9Z"
                      })]
                    })
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              class: "api-data",
              ref: apiDataRef,
              children: "Loading api data..."
            })]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        className: "raw-json-btn-container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("button", {
          className: "btn-raw-json primary",
          onClick: e => {
            setIsRawExpanded(true);
            (0,_assets_js_dailyApi_js__WEBPACK_IMPORTED_MODULE_6__.refreshRawJsonData)(rawJsonRef.current, selectedDate);
            e.stopPropagation();
          },
          children: "Refresh raw data"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("button", {
          className: "btn-raw-json secondary",
          onClick: e => {
            setIsRawExpanded(!isRawExpanded);
          },
          children: [isRawExpanded ? " Hide " : "Show ", "raw data"]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        ref: rawJsonRef,
        className: `raw-json-dta${isRawExpanded ? " expanded" : ""}`,
        children: "Click \"Refresh raw data\" to populate."
      })]
    })]
  });
}

/***/ },

/***/ "./src/daily-feed-block/save.js"
/*!**************************************!*\
  !*** ./src/daily-feed-block/save.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
function save() {
  return null;
}

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/*!***************************************!*\
  !*** ./src/daily-feed-block/index.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_css_dailyApi_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/css/dailyApi.css */ "./src/daily-feed-block/assets/css/dailyApi.css");
/* harmony import */ var _assets_css_calendar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/css/calendar.css */ "./src/daily-feed-block/assets/css/calendar.css");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/daily-feed-block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/daily-feed-block/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/daily-feed-block/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';




/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map