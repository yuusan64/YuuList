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

/***/ "./src/domManage.js":
/*!**************************!*\
  !*** ./src/domManage.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TaskDomManager: () => (/* binding */ TaskDomManager)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : String(i); }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\nvar TaskDomManager = /*#__PURE__*/function () {\n  function TaskDomManager(taskManager, rootElement) {\n    _classCallCheck(this, TaskDomManager);\n    this.taskManager = taskManager;\n    this.rootElement = rootElement;\n  }\n  _createClass(TaskDomManager, [{\n    key: \"addTaskToDOM\",\n    value: function addTaskToDOM(task) {\n      //create task element\n      var taskElement = document.createElement('div');\n      taskElement.id = \"task-\".concat(task.id);\n      taskElement.className = 'task';\n\n      //checkbox\n      var checkbox = document.createElement('input');\n      checkbox.type = 'checkbox';\n      checkbox.checked = task.isCompleted;\n      checkbox.onchange = function () {\n        return toggleTaskStatus(task.id);\n      };\n      taskElement.appendChild(checkbox);\n\n      //description\n      var description = document.createElement('span');\n      if (task.isCompleted) {\n        description.classList.add('completed');\n      }\n      description.textContent = task.description;\n      taskElement.appendChild(description);\n\n      //delete button\n      var deleteButton = document.createElement('button');\n      deleteButton.textContent = 'Delete';\n      deleteButton.onclick = function () {\n        return deleteTaskfromDOM(task.id);\n      };\n      taskElement.appendChild(deleteButton);\n      this.rootElement.appendChild(taskElement);\n    }\n  }, {\n    key: \"refreshTaskList\",\n    value: function refreshTaskList() {\n      var _this = this;\n      this.rootElement.innerHTML = '';\n      this.taskManager.taskList.tasks.forEach(function (task) {\n        _this.addTaskToDOM(task);\n      });\n    }\n  }, {\n    key: \"removeTaskFromDom\",\n    value: function removeTaskFromDom(taskId) {\n      var taskElement = document.getElementById(\"task-\".concat(taskId));\n      if (taskElement) {\n        this.rootElement.removeChild(taskElement);\n      }\n    }\n  }]);\n  return TaskDomManager;\n}();\n\n//# sourceURL=webpack://todo-list/./src/domManage.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteTaskFromDOM: () => (/* binding */ deleteTaskFromDOM)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : String(i); }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar _require = __webpack_require__(/*! ./domManage */ \"./src/domManage.js\"),\n  TaskDomManager = _require.TaskDomManager;\nvar Task = /*#__PURE__*/_createClass(function Task(id, description) {\n  var _this = this;\n  var isCompleted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  _classCallCheck(this, Task);\n  _defineProperty(this, \"toggleCompletion\", function () {\n    _this.isCompleted != _this.isCompleted;\n  });\n  this.id = id;\n  this.description = description;\n  this.isCompleted = isCompleted;\n});\nvar TaskList = /*#__PURE__*/function () {\n  function TaskList() {\n    _classCallCheck(this, TaskList);\n    this.tasks = [];\n  }\n  _createClass(TaskList, [{\n    key: \"addTask\",\n    value: function addTask(description) {\n      var id = this.tasks.length + 1;\n      var newTask = new Task(id, description);\n      this.tasks.push(newTask);\n    }\n  }, {\n    key: \"removeTask\",\n    value: function removeTask(taskId) {\n      this.tasks = this.tasks.filter(function (task) {\n        return task.id !== taskId;\n      });\n    }\n  }, {\n    key: \"getTask\",\n    value: function getTask(taskId) {\n      return this.tasks.find(function (task) {\n        return task.id === taskId;\n      });\n    }\n  }, {\n    key: \"toggleTaskCompletion\",\n    value: function toggleTaskCompletion(taskId) {\n      var task = this.getTask(taskId);\n      if (task) {\n        task.toggleCompletion();\n      }\n    }\n  }]);\n  return TaskList;\n}();\nvar TaskManager = /*#__PURE__*/function () {\n  function TaskManager() {\n    _classCallCheck(this, TaskManager);\n    this.taskList = new taskList();\n  }\n  _createClass(TaskManager, [{\n    key: \"addNewTask\",\n    value: function addNewTask(description) {\n      this.taskList.addTask(description);\n    }\n  }, {\n    key: \"deleteTask\",\n    value: function deleteTask(taskID) {\n      this.taskList.removeTask(taskID);\n    }\n  }, {\n    key: \"toggleTaskStatus\",\n    value: function toggleTaskStatus(taskId) {\n      this.taskList.toggleTaskCompletion(taskId);\n    }\n  }]);\n  return TaskManager;\n}();\nvar StickyWall = /*#__PURE__*/_createClass(function StickyWall(title, desc) {\n  _classCallCheck(this, StickyWall);\n  this.title = title;\n  this.desc = desc;\n});\nvar taskManager = new TaskManager();\nvar taskDomManager = new TaskDomManager(taskManager, document.getElementById('task'));\nfunction addNewTask(description) {\n  taskManager.addNewTask(description);\n  taskDomManager.refreshTaskList();\n}\nfunction deleteTaskFromDOM(taskId) {\n  taskManager.deleteTask(taskId);\n  taskDomManager.removeTaskFromDOM(taskId);\n}\nfunction toggleTaskStatus(taskId) {\n  taskManager.toggleTaskStatus(taskId);\n  taskDomManager.refreshTaskList();\n}\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;