/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js-module.ts":
/*!**************************!*\
  !*** ./src/js-module.ts ***!
  \**************************/
/***/ (() => {

eval("\nconst docIndex = document.querySelector(\".layout .doc-index\");\nconst docIndexButton = document.querySelector(\".layout .doc-index-button\");\nif (docIndex && docIndexButton) {\n    docIndexButton.addEventListener(\"click\", () => {\n        docIndexButton.classList.toggle(\"on\");\n        docIndex.classList.toggle(\"active\");\n    });\n    if (window.innerWidth > 859) {\n        docIndexButton.click();\n    }\n}\n\n\n//# sourceURL=webpack:///./src/js-module.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js-module.ts"]();
/******/ 	
/******/ })()
;