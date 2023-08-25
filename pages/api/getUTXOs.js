"use strict";
(() => {
var exports = {};
exports.id = 692;
exports.ids = [692];
exports.modules = {

/***/ 9111:
/***/ ((module) => {

module.exports = require("@emurgo/cardano-serialization-lib-nodejs");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 5142:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 5900:
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ 8782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


(()=>{
    var exports = {};
    exports.id = 3692;
    exports.ids = [
        3692
    ];
    exports.modules = {
        /***/ 9111: /***/ (module1)=>{
            module1.exports = __webpack_require__(9111);
        /***/ },
        /***/ 2167: /***/ (module1)=>{
            module1.exports = __webpack_require__(2167);
        /***/ },
        /***/ 5142: /***/ (module1)=>{
            module1.exports = __webpack_require__(5142);
        /***/ },
        /***/ 5900: /***/ (module1)=>{
            module1.exports = __webpack_require__(5900);
        /***/ },
        /***/ 8782: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_652__)=>{
            __nested_webpack_require_652__.r(__webpack_exports__);
            /* harmony export */ __nested_webpack_require_652__.d(__webpack_exports__, {
                /* harmony export */ "default": ()=>/* binding */ Browse
            });
            /* harmony import */ var libcip54__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_652__(951);
            /* harmony import */ var libcip54__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_652__.n(libcip54__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */ var _utils_dbsync__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_652__(34);
            async function Browse(req, res) {
                (0, libcip54__WEBPACK_IMPORTED_MODULE_0__.init)(process.env.NETWORK?.toLowerCase(), _utils_dbsync__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */ .Z);
                let { which , page  } = req.body;
                let result = {};
                which = (0, libcip54__WEBPACK_IMPORTED_MODULE_0__.getStakeFromAny)(which);
                result.utxos = await (0, libcip54__WEBPACK_IMPORTED_MODULE_0__.getUTXOsFromStake)(which, page);
                result.fetchedAt = new Date();
                res.status(200).json(result);
            }
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_1932__ = __webpack_require__(2525);
    __nested_webpack_require_1932__.C(exports);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_1932__(__nested_webpack_require_1932__.s = moduleId);
    var __webpack_exports__ = __nested_webpack_require_1932__.X(0, [
        3779
    ], ()=>__webpack_exec__(8782));
    module.exports = __webpack_exports__;
})();


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [501,525], () => (__webpack_exec__(8782)));
module.exports = __webpack_exports__;

})();