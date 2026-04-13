/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/daily-api-block/assets/js/calendar.js"
/*!***************************************************!*\
  !*** ./src/daily-api-block/assets/js/calendar.js ***!
  \***************************************************/
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
function createCalendarControl(calendarRef, onDateChange) {
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
            ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]}
            ${calendarControl.localDate.getFullYear()}
          </div>
          <div class="calendar-body"></div></div>`;
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
        calendarRef.querySelector(".calendar-body").innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
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
          calendarRef.querySelector(".calendar-body").innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          calendarRef.querySelector(".calendar-body").innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }
      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        calendarRef.querySelector(".calendar-body").innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
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
          calendarRef.querySelector(".calendar-body").innerHTML += `<div class="next-dates">${i}</div>`;
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

/***/ "./src/daily-api-block/assets/js/dailyApi.js"
/*!***************************************************!*\
  !*** ./src/daily-api-block/assets/js/dailyApi.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchDailyApiData: () => (/* binding */ fetchDailyApiData)
/* harmony export */ });
function fetchDailyApiData(containerRef, date) {
  const apiDataDiv = containerRef.querySelector(".api-data");
  console.log("apiDataDiv:", apiDataDiv);
  if (apiDataDiv) {
    // console.log("entered if(apiDataDiv) block", apiDataDiv);
    const apiUrl = getApiDataUrl(date);
    console.log("apiUrl:", apiUrl);
    const apiPath = `/wordpress-6.9/wordpress/wp-admin/admin-ajax.php?action=api_proxy&url=${apiUrl}`;
    fetchWithRetry(apiPath).then(jsondta => {
      if (jsondta == null) {
        console.log("jsondta null");
        return;
      }
      console.log("jsondta:", jsondta);
      console.log("jsondta.data:", jsondta.data);
      let dataObj;
      const tempDiv = document.createElement("div");
      let bodyHTML = document.createElement("div");
      bodyHTML.className = "api-data-body";
      let referenceHTML = document.createElement("div");
      referenceHTML.className = "api-data-copyright";
      let outputHTML = "";
      dataObj = jsondta.data;
      console.log("dataObj", dataObj);
      //need if statement here so dataObj isn't null
      bodyHTML.innerHTML = dataObj.Events[0].text;
      referenceHTML.innerHTML = dataObj.Events[0].html;
      outputHTML += bodyHTML.outerHTML;
      outputHTML += referenceHTML.outerHTML;
      setApiDataDate(containerRef, date);
      apiDataDiv.innerHTML = outputHTML || "No data found. Try reloading page.";
    }).catch(error => console.error("Error:", error));
  }
}
function setApiDataDate(containerRef, date) {
  const monthName = date.toLocaleString("default", {
    month: "long"
  });
  const apiDataDate = containerRef.querySelector(".api-data-date");
  apiDataDate.innerHTML = `Daily api data for ${monthName} ${date.getDate()}.`;
  console.log("api data date element:", apiDataDate);
}
function getApiDataUrl(date, padded = true) {
  let day = date.getDate();
  if (padded == true && day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  return `https://today.zenquotes.io/api/${month}/${day}`;
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
        console.log("data missing expected structure error:", data);
        throw new Error("API data missing expected structure");
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

/***/ "./src/daily-api-block/block.json"
/*!****************************************!*\
  !*** ./src/daily-api-block/block.json ***!
  \****************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/daily-api-block","version":"0.1.0","title":"Daily Api Block","category":"widgets","icon":"calendar","description":"Example block scaffolded with Create Block tool.","example":{},"attributes":{"calendarBgColor":{"type":"string","default":"#262829"},"calendarFontColor":{"type":"string","default":"#fff"},"meetingsBgColor":{"type":"string","default":"#82c1f2"},"meetingsFontColor":{"type":"string","default":"#0d3ca1"},"meetingsDividerColorLeft":{"type":"string","default":"#0000FF"},"meetingsDividerColorRight":{"type":"string","default":"#FFA500"}},"supports":{"align":["wide","full"],"color":{"text":true},"html":false},"textdomain":"daily-api-block","editorScript":"file:./index.js","editorStyle":["file:./dailyApi.css","file:./calendar.css"],"style":["file:./dailyApi.css","file:./calendar.css"],"viewScript":"file:./view.js"}');

/***/ },

/***/ "./src/daily-api-block/edit.js"
/*!*************************************!*\
  !*** ./src/daily-api-block/edit.js ***!
  \*************************************/
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
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/daily-api-block/block.json");
/* harmony import */ var _assets_js_calendar_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/js/calendar.js */ "./src/daily-api-block/assets/js/calendar.js");
/* harmony import */ var _assets_js_dailyApi_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/js/dailyApi.js */ "./src/daily-api-block/assets/js/dailyApi.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
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
    calendarFontColor
  } = attributes;
  const [activeTab, setActiveTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)("background");
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: "api-data-container"
  });
  const calendarInstance = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useRef)();
  const containerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useRef)();
  const apiDataRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useRef)();
  const calendarRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useRef)();
  const DEFAULT_CAL_FONT_COLOR = _block_json__WEBPACK_IMPORTED_MODULE_3__.attributes.calendarFontColor.default;
  const DEFAULT_CAL_BG_COLOR = _block_json__WEBPACK_IMPORTED_MODULE_3__.attributes.calendarBgColor.default;
  const {
    meetingsDividerColorLeft,
    meetingsDividerColorRight,
    meetingsBgColor,
    meetingsFontColor
  } = attributes;
  const DEFAULT_FONT_COLOR = _block_json__WEBPACK_IMPORTED_MODULE_3__.attributes.meetingsFontColor.default;
  const DEFAULT_BG_COLOR = _block_json__WEBPACK_IMPORTED_MODULE_3__.attributes.meetingsBgColor.default;
  const DEFAULT_LEFT_COLOR = _block_json__WEBPACK_IMPORTED_MODULE_3__.attributes.meetingsDividerColorLeft.default;
  const DEFAULT_RIGHT_COLOR = _block_json__WEBPACK_IMPORTED_MODULE_3__.attributes.meetingsDividerColorRight.default;
  const DEFAULT_DUOTONE_COLORS = [DEFAULT_LEFT_COLOR, DEFAULT_RIGHT_COLOR];
  // const [color, setColor] = useState("#f00");
  // const colors = [
  // 	{ name: "red", color: "#f00" },
  // 	{ name: "white", color: "#fff" },
  // 	{ name: "blue", color: "#00f" },
  // ];
  const [duotone, setDuotone] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useState)(DEFAULT_DUOTONE_COLORS);
  const DUOTONE_PALETTE = [{
    colors: DEFAULT_DUOTONE_COLORS,
    name: "Default",
    slug: "default-theme-colors"
  }, {
    colors: ["#8c00b7", "#fcff41"],
    name: "Purple and yellow",
    slug: "purple-yellow"
  }, {
    colors: ["#6e0edc", "#b7b7b7"],
    name: "Blue and light blue",
    slug: "blue-light-blue"
  }, {
    colors: ["#000097", "#ff4747"],
    name: "Blue and red",
    slug: "blue-red"
  }, {
    colors: ["#000097", "#82c1f2"],
    name: "Blue and light blue",
    slug: "blue-light-blue"
  }];
  const COLOR_PALETTE = [{
    color: "#ff4747",
    name: "Red",
    slug: "red"
  }, {
    color: "#fcff41",
    name: "Yellow",
    slug: "yellow"
  }, {
    color: "#000097",
    name: "Blue",
    slug: "blue"
  }, {
    color: "#8c00b7",
    name: "Purple",
    slug: "purple"
  }];
  //console.log('Component rendered');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {
    //console.log('useEffect ran');
    const placeholderApiData = containerRef.current?.querySelector(".api-data");
    console.log("placeholderApiData (edit.js):", placeholderApiData);
    const placeholderDate = containerRef.current?.querySelector(".api-data-date");
    console.log("placeholderDate (edit.js):", placeholderDate);
    if (placeholderApiData && placeholderDate && !calendarInstance.current) {
      calendarInstance.current = new _assets_js_calendar_js__WEBPACK_IMPORTED_MODULE_4__.CalendarControl(calendarRef.current);
      calendarInstance.current.setOnDateChange(date => {
        (0,_assets_js_dailyApi_js__WEBPACK_IMPORTED_MODULE_5__.fetchDailyApiData)(containerRef.current, date);
        console.log("Main logic callback:", date);
      });
    }
  }, []);
  const currentDate = new Date();
  const currentDay = currentDate.getDate().toString();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long"
  });
  function addDailyApi() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      class: "card",
      ref: containerRef,
      style: {
        "--meetings_description_bl": meetingsBgColor,
        "--meetings-font-color": meetingsFontColor,
        "--grad-color-left": meetingsDividerColorLeft,
        "--grad-color-right": meetingsDividerColorRight
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        class: "api-data-column calendar-container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          class: "calendar",
          ref: calendarRef,
          style: {
            "--calendar-bg-color": calendarBgColor,
            "--calendar-font-color": calendarFontColor
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            class: "api-data-date-container",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
                type: "checkbox",
                id: "check-calendar"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
                for: "check-calendar",
                class: "checkbtn-calendar",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("svg", {
                  width: "40",
                  height: "40",
                  xmlns: "http://www.w3.org/2000/svg",
                  viewbox: "0 -50 448 512",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("path", {
                    fill: "black",
                    d: "M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                  })
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              class: "api-data-date",
              children: ["Daily api for ", currentDay, " ", currentMonth]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            class: "api-data",
            ref: apiDataRef,
            children: "Loading api data..."
          })]
        })]
      })
    });
  }
  function apiColorsPanel() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: "Calendar Colors",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: activeTab === "background" ? "primary" : "secondary",
          onClick: () => setActiveTab("background"),
          children: "Background"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: activeTab === "text" ? "primary" : "secondary",
          onClick: () => setActiveTab("text"),
          children: "Text"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: activeTab === "defaults" ? "primary" : "secondary",
          onClick: () => setActiveTab("defaults"),
          children: "Defaults"
        })]
      }), activeTab === "background" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
        color: calendarBgColor,
        onChangeComplete: value => setAttributes({
          calendarBgColor: value.hex
        }),
        disableAlpha: true
      }), activeTab === "text" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
        color: calendarFontColor,
        onChangeComplete: value => setAttributes({
          calendarFontColor: value.hex
        }),
        disableAlpha: true
      }), activeTab === "defaults" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        style: {
          marginTop: "1em",
          textAlign: "center"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "primary",
          onClickCapture: () => setIsModalOpen(true),
          children: "Restore to defaults"
        }), isModalOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
          title: "Restore Defaults",
          onRequestClose: () => setIsModalOpen(false),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
            children: "Are you sure you want to restore the default colors?"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            variant: "primary",
            onClick: () => {
              setAttributes({
                calendarBgColor: DEFAULT_CAL_BG_COLOR,
                calendarFontColor: DEFAULT_CAL_FONT_COLOR
              });
              setIsModalOpen(false);
            },
            children: "Yes, restore."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            variant: "secondary",
            onClick: () => setIsModalOpen(false),
            style: {
              marginLeft: "1em"
            },
            children: "Cancel"
          })]
        })]
      })]
    });
  }
  function dividerColorsPanel() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: "Divider Colors",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.DuotonePicker, {
          duotonePalette: DUOTONE_PALETTE,
          colorPalette: COLOR_PALETTE,
          value: Array.isArray(duotone) && duotone.length === 2 ? duotone : DEFAULT_DUOTONE_COLORS,
          onChange: newValue => {
            if (!Array.isArray(newValue) || newValue.length !== 2) {
              setDuotone(DEFAULT_DUOTONE_COLORS);
            } else {
              setDuotone(newValue);
            }
          },
          onChangeComplete: setAttributes({
            meetingsDividerColorLeft: duotone[0],
            meetingsDividerColorRight: duotone[1]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.DuotoneSwatch, {
          values: duotone
        })]
      })
    });
  }
  console.log("SegmentedControl:", _wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SegmentedControl);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [apiColorsPanel(), dividerColorsPanel()]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      ...blockProps,
      children: addDailyApi()
    })]
  });
}

/***/ },

/***/ "./src/daily-api-block/save.js"
/*!*************************************!*\
  !*** ./src/daily-api-block/save.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */

function save() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save(),
    children: 'Daily Api Block – hello from the saved content!'
  });
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
/*!**************************************!*\
  !*** ./src/daily-api-block/index.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/daily-api-block/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/daily-api-block/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/daily-api-block/block.json");
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
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map