(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("simple-dux", [], factory);
	else if(typeof exports === 'object')
		exports["simple-dux"] = factory();
	else
		root["simple-dux"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Dispatcher = (function () {
    function Dispatcher() {
        this.callbacks = {};
        this.namespace_callbacks = {};
    }
    Dispatcher.prototype.addCallback = function (event_type, callback) {
        if (!this.callbacks[event_type]) {
            this.callbacks[event_type] = new Array();
        }
        this.callbacks[event_type].push(callback);
    };
    Dispatcher.prototype.addNamespaceCallback = function (namespace, callback) {
        if (!this.namespace_callbacks[namespace]) {
            this.namespace_callbacks[namespace] = new Array();
        }
        this.namespace_callbacks[namespace].push(callback);
    };
    Dispatcher.prototype.injectEvent = function (payload, namespace) {
        if (namespace) {
            var ns_callbacks_for_event = this.namespace_callbacks[namespace];
            if (ns_callbacks_for_event) {
                ns_callbacks_for_event.forEach(function (c) { return c(payload); });
            }
        }
        var callbacks_for_event = this.callbacks[payload.event_type];
        if (callbacks_for_event) {
            callbacks_for_event.forEach(function (c) { return c(payload); });
        }
    };
    Dispatcher.prototype.removeNamespaceCallback = function (namespace) {
        delete this.namespace_callbacks[namespace];
    };
    Dispatcher.prototype.removeCallback = function (event_type) {
        delete this.callbacks[event_type];
    };
    return Dispatcher;
}());
exports.default = Dispatcher;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SimpleStore = (function () {
    function SimpleStore() {
        this._persist_storage = {};
        this._scoped_storage = {};
    }
    SimpleStore.prototype.RegisterPersistentStore = function (store, name) {
        this._persist_storage[name] = store;
    };
    SimpleStore.prototype.GetPersistentStore = function (name) {
        return this._persist_storage[name];
    };
    SimpleStore.prototype.DeregisterPersistentStore = function (name) {
        delete this._persist_storage[name];
    };
    SimpleStore.prototype.RegisterScopedStore = function (factory_method, name) {
        this._scoped_storage[name] = factory_method;
    };
    SimpleStore.prototype.GetScopedStore = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var factory_method = this._scoped_storage[name];
        if (!factory_method) {
            throw "factory method called " + name + " is not defined";
        }
        return factory_method.apply(void 0, args);
    };
    SimpleStore.prototype.DeregisterScopedStore = function (name) {
        delete this._scoped_storage[name];
    };
    return SimpleStore;
}());
exports.default = SimpleStore;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dispatcher_1 = __webpack_require__(0);
var store_1 = __webpack_require__(1);
var SimpleDux = (function () {
    function SimpleDux() {
        this.Dispatcher = new dispatcher_1.default();
        this.Store = new store_1.default();
    }
    return SimpleDux;
}());
exports.default = SimpleDux;


/***/ })
/******/ ]);
});
//# sourceMappingURL=simple-dux.js.map