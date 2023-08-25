"use strict";
(() => {
var exports = {};
exports.id = 116;
exports.ids = [116];
exports.modules = {

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 9675:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


(()=>{
    var exports = {};
    exports.id = 116;
    exports.ids = [
        116
    ];
    exports.modules = {
        /***/ 7147: /***/ (module1)=>{
            module1.exports = __webpack_require__(7147);
        /***/ },
        /***/ 1017: /***/ (module1)=>{
            module1.exports = __webpack_require__(1017);
        /***/ },
        /***/ 9675: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_405__)=>{
            __nested_webpack_require_405__.r(__webpack_exports__);
            /* harmony export */ __nested_webpack_require_405__.d(__webpack_exports__, {
                /* harmony export */ "default": ()=>/* binding */ Browse
            });
            /* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_405__(1017);
            /* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_405__.n(path__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_405__(7147);
            /* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_405__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
            async function Browse(req, res) {
                const filePath = path__WEBPACK_IMPORTED_MODULE_0___default().join(process.cwd(), "submodules/SimpleCip54Viewer/template/index.html");
                //Read the json data file data.json
                const fileContents = await fs__WEBPACK_IMPORTED_MODULE_1__.promises.readFile(filePath, "utf8");
                res.status(200).json({
                    file: fileContents
                });
            }
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_1681__ = __webpack_require__(2525);
    __nested_webpack_require_1681__.C(exports);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_1681__(__nested_webpack_require_1681__.s = moduleId);
    var __webpack_exports__ = __webpack_exec__(9675);
    module.exports = __webpack_exports__;
})();


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [501,525], () => (__webpack_exec__(9675)));
module.exports = __webpack_exports__;

})();