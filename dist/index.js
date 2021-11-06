/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/js/helpFunctions.js":
/*!*********************************!*\
  !*** ./app/js/helpFunctions.js ***!
  \*********************************/
/***/ ((module) => {

eval("function validShortUrl(shortUrl) {\r\n  if (shortUrl === \"\") {\r\n    throw { message: \"Short url cant be null\" };\r\n  }\r\n}\r\n\r\nfunction validCustom(custom) {\r\n  if (custom === \"\") {\r\n    throw { message: \"Custom name cant be null\" };\r\n  }\r\n}\r\n\r\nfunction validYear(year) {\r\n  if (year < 2020 || year >= 2030) {\r\n    throw { message: \"Year should be between 2020 - 2030\" };\r\n  }\r\n}\r\n\r\nfunction isUrlValid(url) {\r\n  if (url === \"\") {\r\n    throw { message: \"Url cant be null\" };\r\n  } else if (url.length > 800) {\r\n    throw { message: \"Url is too long\" };\r\n  } else {\r\n    const pattern = new RegExp(\r\n      \"^(https?:\\\\/\\\\/)?\" + // protocol\r\n        \"((([a-z\\\\d]([a-z\\\\d-]*[a-z\\\\d])*)\\\\.)+[a-z]{2,}|\" +\r\n        \"((\\\\d{1,3}\\\\.){3}\\\\d{1,3}))\" +\r\n        \"(\\\\:\\\\d+)?(\\\\/[-a-z\\\\d%_.~+]*)*\" +\r\n        \"(\\\\?[;&a-z\\\\d%_.~+=-]*)?\" +\r\n        \"(\\\\#[-a-z\\\\d_]*)?$\",\r\n      \"i\"\r\n    );\r\n    if (pattern.test(url)) {\r\n      return true;\r\n    }\r\n    throw { message: \"Url is not valid\" };\r\n  }\r\n}\r\n\r\nfunction getLogsByYear(logsArray, year) {\r\n  return logsArray.map((date) => {\r\n    if (new Date(date).getFullYear() === parseInt(year)) return new Date(date);\r\n  });\r\n}\r\n\r\nfunction createChart(\r\n  header,\r\n  columsFunction,\r\n  logsArray,\r\n  xTitle,\r\n  year,\r\n  month = undefined\r\n) {\r\n  let chart = new CanvasJS.Chart(\"chartContainer\", {\r\n    title: {\r\n      text: header,\r\n    },\r\n    axisY: {\r\n      title: \"Entries\",\r\n    },\r\n    axisX: {\r\n      title: xTitle,\r\n    },\r\n    data: [\r\n      {\r\n        type: \"line\",\r\n        dataPoints: columsFunction(logsArray, year, month),\r\n      },\r\n    ],\r\n  });\r\n  chart.render();\r\n}\r\n\r\nfunction countMonthEntries(array, month) {\r\n  return array.filter((date) => {\r\n    return date.getMonth() + 1 === month;\r\n  });\r\n}\r\n\r\nfunction countDayEntries(array, month, day) {\r\n  return array.filter((date) => {\r\n    return date.getMonth() + 1 === month && date.getDate() === day;\r\n  });\r\n}\r\n\r\nfunction getColumnsMonth(logArray) {\r\n  let array = [];\r\n  for (let month = 1; month <= 12; month++) {\r\n    array.push({ label: month, y: countMonthEntries(logArray, month).length });\r\n  }\r\n  return array;\r\n}\r\n\r\nfunction getColumnsDays(logArray, year, month) {\r\n  let array = [];\r\n  let numberOfDays = new Date(year, month, 0).getDate();\r\n  for (let day = 1; day <= numberOfDays; day++) {\r\n    array.push({ label: day, y: countDayEntries(logArray, month, day).length });\r\n  }\r\n  return array;\r\n}\r\n\r\nmodule.exports = {\r\n  validShortUrl,\r\n  validCustom,\r\n  validYear,\r\n  isUrlValid,\r\n  getLogsByYear,\r\n  createChart,\r\n  getColumnsMonth,\r\n  getColumnsDays,\r\n};\r\n\n\n//# sourceURL=webpack://calc/./app/js/helpFunctions.js?");

/***/ }),

/***/ "./app/js/serverRequests.js":
/*!**********************************!*\
  !*** ./app/js/serverRequests.js ***!
  \**********************************/
/***/ ((module) => {

eval("async function getInfo(shortUrl) {\r\n  try {\r\n    let response = await axios.get(`/api/shorturl/info/${shortUrl}`);\r\n    return response.data;\r\n  } catch (error) {\r\n    throw error.hasOwnProperty(\"data\")\r\n      ? error.response.data\r\n      : \"Connection problem\";\r\n  }\r\n}\r\n\r\nasync function getShortUrl(fullUrl) {\r\n  try {\r\n    let response = await axios.post(\"/api/shorturl/\", {\r\n      url: fullUrl,\r\n    });\r\n    return response.data.shorturlId;\r\n  } catch (error) {\r\n    throw error.hasOwnProperty(\"data\")\r\n      ? error.response.data\r\n      : \"Connection problem\";\r\n  }\r\n}\r\n\r\nasync function getCustomShortUrl(fullUrl, custom) {\r\n  try {\r\n    let response = await axios.post(\"/api/shorturl/custom\", {\r\n      url: fullUrl,\r\n      custom: custom,\r\n    });\r\n    return response.data.custom;\r\n  } catch (error) {\r\n    console.log(error.response);\r\n    throw error.hasOwnProperty(\"data\")\r\n      ? error.response.data\r\n      : \"Connection problem\";\r\n  }\r\n}\r\n\r\nmodule.exports = {\r\n  getInfo,\r\n  getShortUrl,\r\n  getCustomShortUrl,\r\n};\r\n\n\n//# sourceURL=webpack://calc/./app/js/serverRequests.js?");

/***/ }),

/***/ "./app/main.js":
/*!*********************!*\
  !*** ./app/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_serverRequests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/serverRequests */ \"./app/js/serverRequests.js\");\n/* harmony import */ var _js_serverRequests__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_serverRequests__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/helpFunctions */ \"./app/js/helpFunctions.js\");\n/* harmony import */ var _js_helpFunctions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/styles.css */ \"./app/styles/styles.css\");\n/* harmony import */ var _images_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/logo.png */ \"./app/images/logo.png\");\n// ==============================\r\n// ======== Imports =============\r\n// ==============================\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// ==============================\r\n// ====== Add Events ============\r\n// ==============================\r\n\r\ndocument.querySelector(\"#activate\").addEventListener(\"click\", onActivateClick);\r\ndocument.querySelector(\"#copyToClip\").addEventListener(\"click\", onCopyClick);\r\ndocument\r\n  .querySelector(\"#copyToClipCustom\")\r\n  .addEventListener(\"click\", onCopyCustomClick);\r\n\r\ndocument\r\n  .querySelector(\"#activateCustom\")\r\n  .addEventListener(\"click\", onActivateCustomClick);\r\ndocument\r\n  .querySelector(\"#getStatisticsMonth\")\r\n  .addEventListener(\"click\", onStatisticsMonthClick);\r\ndocument\r\n  .querySelector(\"#getStatisticsYear\")\r\n  .addEventListener(\"click\", onStatisticsYearClick);\r\n\r\n// ==============================\r\n// ====== Event Listeners =======\r\n// ==============================\r\n\r\nasync function onActivateClick() {\r\n  try {\r\n    resetErrors();\r\n    let url = document.querySelector(\"#url\").value;\r\n    if ((0,_js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.isUrlValid)(url)) {\r\n      let shortUrl = await (0,_js_serverRequests__WEBPACK_IMPORTED_MODULE_0__.getShortUrl)(url);\r\n      document.querySelector(\"#result\").value = \"\";\r\n      document.querySelector(\"#result\").value = \"/api/shorturl/\" + shortUrl;\r\n    }\r\n  } catch (error) {\r\n    if (typeof error === \"string\") {\r\n      document.querySelector(\"#urlError\").textContent = \"Connection problem\";\r\n    } else {\r\n      document.querySelector(\"#urlError\").textContent = error.message;\r\n    }\r\n  }\r\n}\r\n\r\nfunction onCopyCustomClick() {\r\n  copyToClipBoard(\"resultCustom\");\r\n  resetErrors();\r\n}\r\n\r\nfunction onCopyClick() {\r\n  copyToClipBoard(\"result\");\r\n  resetErrors();\r\n}\r\n\r\nasync function onActivateCustomClick() {\r\n  try {\r\n    resetErrors();\r\n    let url = document.querySelector(\"#urlCustomInput\").value;\r\n    if ((0,_js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.isUrlValid)(url)) {\r\n      let custom = document.querySelector(\"#castonShortUrlInput\").value;\r\n      (0,_js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.validCustom)(custom);\r\n      let short = await (0,_js_serverRequests__WEBPACK_IMPORTED_MODULE_0__.getCustomShortUrl)(url, custom);\r\n      document.querySelector(\"#resultCustom\").value = \"\";\r\n      document.querySelector(\"#resultCustom\").value = \"/api/shorturl/\" + short;\r\n    }\r\n  } catch (error) {\r\n    if (typeof error === \"string\") {\r\n      document.querySelector(\"#customError\").textContent =\r\n        \"Connection problem \" + error;\r\n    } else {\r\n      document.querySelector(\"#customError\").textContent = error.message;\r\n    }\r\n  }\r\n}\r\n\r\nasync function onStatisticsMonthClick() {\r\n  try {\r\n    resetErrors();\r\n    let shortUrl = document.querySelector(\"#satisticInput\").value;\r\n    (0,_js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.validShortUrl)(shortUrl);\r\n    let shortUrlInfo = await (0,_js_serverRequests__WEBPACK_IMPORTED_MODULE_0__.getInfo)(shortUrl);\r\n    let date = new Date(document.querySelector(\"#satisticInputMonth\").value);\r\n    let year = date.getFullYear();\r\n    let month = date.getMonth() + 1;\r\n    let yearLogsArray = (0,_js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.getLogsByYear)(shortUrlInfo.redirectEntriesLog, year);\r\n    let monthName = date.toLocaleString(\"en-US\", { month: \"long\" });\r\n    let header = `Entries for year ${year} in ${monthName}`;\r\n    document.querySelector(\".div8\").classList.add(\"visible\");\r\n    (0,_js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.createChart)(header, _js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.getColumnsDays, yearLogsArray, \"Days\", year, month);\r\n  } catch (error) {\r\n    if (typeof error === \"string\") {\r\n      document.querySelector(\"#statistisError\").textContent =\r\n        \"Connection problem\";\r\n    } else {\r\n      document.querySelector(\"#statistisError\").textContent = error.message;\r\n    }\r\n  }\r\n}\r\n\r\nasync function onStatisticsYearClick() {\r\n  try {\r\n    resetErrors();\r\n    let shortUrl = document.querySelector(\"#satisticInput\").value;\r\n    (0,_js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.validShortUrl)(shortUrl);\r\n    let shortUrlInfo = await (0,_js_serverRequests__WEBPACK_IMPORTED_MODULE_0__.getInfo)(shortUrl);\r\n    let year = document.querySelector(\"#satisticInputYear\").value;\r\n    let yearLogArray = (0,_js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.getLogsByYear)(shortUrlInfo.redirectEntriesLog, year);\r\n    let header = `Entries for year ${year}`;\r\n    document.querySelector(\".div8\").classList.add(\"visible\");\r\n    (0,_js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.createChart)(header, _js_helpFunctions__WEBPACK_IMPORTED_MODULE_1__.getColumnsMonth, yearLogArray, \"Month\", year);\r\n  } catch (error) {\r\n    if (typeof error === \"string\") {\r\n      document.querySelector(\"#statistisError\").textContent =\r\n        \"Connection problem\";\r\n    } else {\r\n      document.querySelector(\"#statistisError\").textContent = error.message;\r\n    }\r\n  }\r\n}\r\n\r\n// ==============================\r\n// ====== DOM Functions ========\r\n// ==============================\r\n\r\nfunction resetErrors() {\r\n  document.querySelector(\"#statistisError\").textContent = \"\";\r\n  document.querySelector(\"#customError\").textContent = \"\";\r\n  document.querySelector(\"#urlError\").textContent = \"\";\r\n}\r\n\r\nfunction copyToClipBoard(inputId) {\r\n  let resultInput = document.querySelector(`#${inputId}`);\r\n  resultInput.select();\r\n  resultInput.setSelectionRange(0, 99999);\r\n  navigator.clipboard.writeText(resultInput.value);\r\n}\r\n\n\n//# sourceURL=webpack://calc/./app/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/styles/styles.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/styles/styles.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".parent {\\r\\n  display: grid;\\r\\n  grid-template-columns: repeat(5, 1fr);\\r\\n  grid-template-rows: repeat(5, 1fr);\\r\\n  grid-column-gap: 0px;\\r\\n  grid-row-gap: 0px;\\r\\n}\\r\\nbody {\\r\\n  background-color: #769ce4;\\r\\n}\\r\\n.div1 {\\r\\n  position: relative;\\r\\n  padding: 20px;\\r\\n  background-color: #d8d8d8;\\r\\n  height: 20%;\\r\\n  margin-left: -10px;\\r\\n  margin-right: -10px;\\r\\n  margin-top: -10px;\\r\\n  grid-area: 1 / 1 / 2 / 6;\\r\\n}\\r\\n.div2 {\\r\\n  height: 80%;\\r\\n  background-color: white;\\r\\n  border: gray 2px solid;\\r\\n  border-radius: 10px;\\r\\n  margin-top: 90px;\\r\\n  grid-area: 1 / 2 / 2 / 5;\\r\\n}\\r\\n.div3 {\\r\\n  margin-left: -30px;\\r\\n  margin-top: -52%;\\r\\n  height: 130%;\\r\\n  grid-area: 1 / 1 / 6 / 2;\\r\\n}\\r\\n.div4 {\\r\\n  margin-right: -30px;\\r\\n  margin-top: -52%;\\r\\n  height: 130%;\\r\\n  grid-area: 1 / 5 / 6 / 6;\\r\\n}\\r\\n.div5 {\\r\\n  position: fixed;\\r\\n  padding: 0.02%;\\r\\n  width: 100%;\\r\\n  background-color: #b0b0b0;\\r\\n  left: 0px;\\r\\n  bottom: 0px;\\r\\n  height: 10%;\\r\\n  grid-area: 5 / 1 / 5 / 6;\\r\\n}\\r\\n.div6 {\\r\\n  height: 95%;\\r\\n  /* margin-top: 50px; */\\r\\n  background-color: white;\\r\\n  border: gray 2px solid;\\r\\n  border-radius: 10px;\\r\\n  margin-top: 50px;\\r\\n  grid-area: 2 / 2 / 3 / 5;\\r\\n}\\r\\n.div7 {\\r\\n  height: 90%;\\r\\n  /* margin-top: 50px; */\\r\\n  background-color: white;\\r\\n  border: gray 2px solid;\\r\\n  border-radius: 10px;\\r\\n  margin-top: 50px;\\r\\n  grid-area: 3 / 2 / 3 / 5;\\r\\n}\\r\\n.div8 {\\r\\n  position: static;\\r\\n  height: 95%;\\r\\n  margin-top: 40px;\\r\\n  background-color: white;\\r\\n  border: gray 2px solid;\\r\\n  border-radius: 10px;\\r\\n  grid-area: 4 / 2 / 4 / 5;\\r\\n}\\r\\n.headerH {\\r\\n  margin-left: 80px;\\r\\n}\\r\\n.img {\\r\\n  float: left;\\r\\n  max-width: 100%;\\r\\n  width: 60px;\\r\\n  height: 60px;\\r\\n}\\r\\n.img::after {\\r\\n  opacity: 0.6;\\r\\n}\\r\\n.headerLabel {\\r\\n  text-align: center;\\r\\n  font-family: Cambria, Cochin, Georgia, Times, \\\"Times New Roman\\\", serif;\\r\\n}\\r\\n.inputUrlLabel {\\r\\n  text-align: center;\\r\\n  font-weight: bold;\\r\\n}\\r\\n.inputDiv {\\r\\n  width: 100%;\\r\\n  text-align: center;\\r\\n  display: block;\\r\\n  margin-left: auto;\\r\\n  margin-right: auto;\\r\\n}\\r\\n.urlInput {\\r\\n  width: 90%;\\r\\n  height: 18px;\\r\\n  border-radius: 5px;\\r\\n  border: black 1px solid;\\r\\n  transition: border 0.35s ease-in-out;\\r\\n  transition: box-shadow 0.35s ease-in-out;\\r\\n}\\r\\n.urlInput:focus {\\r\\n  outline: none;\\r\\n  border: rgb(116, 170, 204) 1px solid;\\r\\n  box-shadow: 0px 0px 4px 1px grey;\\r\\n}\\r\\n.standartButton {\\r\\n  border: none;\\r\\n  padding: 5px 16px;\\r\\n  border-radius: 4px;\\r\\n  color: white;\\r\\n  background-color: rgb(111, 111, 255);\\r\\n  transition: box-shadow 0.35s ease-in-out;\\r\\n}\\r\\n.standartButton:hover {\\r\\n  box-shadow: 0px 0px 4px 1px grey;\\r\\n}\\r\\n.standartButton[value=\\\"copy\\\"]:active {\\r\\n  transition: 0.3s;\\r\\n  color: green;\\r\\n}\\r\\n.urlInputCustom {\\r\\n  width: 90%;\\r\\n  border-radius: 5px;\\r\\n  border: black 1px solid;\\r\\n  height: 18px;\\r\\n  transition: border 0.35s ease-in-out;\\r\\n  transition: box-shadow 0.35s ease-in-out;\\r\\n}\\r\\n.urlInputCustom:focus {\\r\\n  outline: none;\\r\\n  border: rgb(116, 170, 204) 1px solid;\\r\\n  box-shadow: 0px 0px 4px 1px grey;\\r\\n}\\r\\n.inputDivCustom {\\r\\n  text-align: center;\\r\\n  /* margin: auto; */\\r\\n  display: block;\\r\\n  margin-left: auto;\\r\\n  margin-right: auto;\\r\\n}\\r\\n.customTable {\\r\\n  margin: auto;\\r\\n  text-align: left;\\r\\n  width: 70%;\\r\\n}\\r\\n.urlTable {\\r\\n  margin-left: auto;\\r\\n  margin-right: auto;\\r\\n  text-align: left;\\r\\n  width: 70%;\\r\\n}\\r\\n.labelShorter {\\r\\n  width: 30%;\\r\\n}\\r\\n.statistisTable {\\r\\n  margin-left: auto;\\r\\n  margin-right: auto;\\r\\n  text-align: left;\\r\\n  width: 70%;\\r\\n}\\r\\n.tdSelectMonth {\\r\\n  width: 30%;\\r\\n}\\r\\n.urlInputStatistis {\\r\\n  width: 90%;\\r\\n  border-radius: 5px;\\r\\n  border: black 1px solid;\\r\\n  height: 18px;\\r\\n  transition: border 0.35s ease-in-out;\\r\\n  transition: box-shadow 0.35s ease-in-out;\\r\\n}\\r\\n.urlInputStatistis:focus {\\r\\n  outline: none;\\r\\n  border: rgb(116, 170, 204) 1px solid;\\r\\n  box-shadow: 0px 0px 4px 1px grey;\\r\\n}\\r\\n.customError {\\r\\n  font-family: \\\"Segoe UI\\\", Tahoma, Geneva, Verdana, sans-serif;\\r\\n  font-size: 13px;\\r\\n  color: red;\\r\\n}\\r\\n.urlError {\\r\\n  font-family: \\\"Segoe UI\\\", Tahoma, Geneva, Verdana, sans-serif;\\r\\n  font-size: 13px;\\r\\n  color: red;\\r\\n}\\r\\n.statistisError {\\r\\n  font-family: \\\"Segoe UI\\\", Tahoma, Geneva, Verdana, sans-serif;\\r\\n  font-size: 10px;\\r\\n  color: red;\\r\\n}\\r\\n.hiiden {\\r\\n  display: none;\\r\\n}\\r\\n.visible {\\r\\n  display: inline-block;\\r\\n}\\r\\n\\r\\n/* ========================= */\\r\\n/* == animated background == */\\r\\n/* ========================= */\\r\\n\\r\\n.area {\\r\\n  background: #6469cf;\\r\\n  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);\\r\\n  width: 100%;\\r\\n  height: 100vh;\\r\\n}\\r\\n\\r\\n.circles {\\r\\n  top: 0;\\r\\n  left: 0;\\r\\n  width: 100%;\\r\\n  height: 100%;\\r\\n  overflow: hidden;\\r\\n}\\r\\n\\r\\n.circles li {\\r\\n  position: absolute;\\r\\n  display: block;\\r\\n  list-style: none;\\r\\n  width: 20px;\\r\\n  height: 20px;\\r\\n  background: rgba(255, 255, 255, 0.2);\\r\\n  animation: animate 25s linear infinite;\\r\\n  bottom: -150px;\\r\\n}\\r\\n\\r\\n.circles li:nth-child(1) {\\r\\n  left: 25%;\\r\\n  width: 80px;\\r\\n  height: 80px;\\r\\n  animation-delay: 0s;\\r\\n}\\r\\n\\r\\n.circles li:nth-child(2) {\\r\\n  left: 10%;\\r\\n  width: 20px;\\r\\n  height: 20px;\\r\\n  animation-delay: 2s;\\r\\n  animation-duration: 12s;\\r\\n}\\r\\n\\r\\n.circles li:nth-child(3) {\\r\\n  left: 70%;\\r\\n  width: 20px;\\r\\n  height: 20px;\\r\\n  animation-delay: 4s;\\r\\n}\\r\\n\\r\\n.circles li:nth-child(4) {\\r\\n  left: 40%;\\r\\n  width: 60px;\\r\\n  height: 60px;\\r\\n  animation-delay: 0s;\\r\\n  animation-duration: 18s;\\r\\n}\\r\\n\\r\\n.circles li:nth-child(5) {\\r\\n  left: 65%;\\r\\n  width: 20px;\\r\\n  height: 20px;\\r\\n  animation-delay: 0s;\\r\\n}\\r\\n\\r\\n.circles li:nth-child(6) {\\r\\n  left: 75%;\\r\\n  width: 110px;\\r\\n  height: 110px;\\r\\n  animation-delay: 3s;\\r\\n}\\r\\n\\r\\n.circles li:nth-child(7) {\\r\\n  left: 35%;\\r\\n  width: 150px;\\r\\n  height: 150px;\\r\\n  animation-delay: 7s;\\r\\n}\\r\\n\\r\\n.circles li:nth-child(8) {\\r\\n  left: 50%;\\r\\n  width: 25px;\\r\\n  height: 25px;\\r\\n  animation-delay: 15s;\\r\\n  animation-duration: 45s;\\r\\n}\\r\\n\\r\\n.circles li:nth-child(9) {\\r\\n  left: 20%;\\r\\n  width: 15px;\\r\\n  height: 15px;\\r\\n  animation-delay: 2s;\\r\\n  animation-duration: 35s;\\r\\n}\\r\\n\\r\\n.circles li:nth-child(10) {\\r\\n  left: 85%;\\r\\n  width: 150px;\\r\\n  height: 150px;\\r\\n  animation-delay: 0s;\\r\\n  animation-duration: 11s;\\r\\n}\\r\\n\\r\\n@keyframes animate {\\r\\n  0% {\\r\\n    transform: translateY(0) rotate(0deg);\\r\\n    opacity: 1;\\r\\n    border-radius: 0;\\r\\n  }\\r\\n\\r\\n  100% {\\r\\n    transform: translateY(-1000px) rotate(720deg);\\r\\n    opacity: 0;\\r\\n    border-radius: 50%;\\r\\n  }\\r\\n}\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://calc/./app/styles/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://calc/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://calc/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./app/styles/styles.css":
/*!*******************************!*\
  !*** ./app/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./app/styles/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://calc/./app/styles/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./app/images/logo.png":
/*!*****************************!*\
  !*** ./app/images/logo.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"images/logo.png\";\n\n//# sourceURL=webpack://calc/./app/images/logo.png?");

/***/ })

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
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "./";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app/main.js");
/******/ 	
/******/ })()
;