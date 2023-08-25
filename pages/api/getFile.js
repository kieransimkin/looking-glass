"use strict";
(() => {
var exports = {};
exports.id = 923;
exports.ids = [923];
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

/***/ 4221:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
const _interopRequireWildcard = (__webpack_require__(164)/* ["default"] */ .Z);
(()=>{
    var exports1 = {};
    exports1.id = 9923;
    exports1.ids = [
        9923
    ];
    exports1.modules = {
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
        /***/ 9648: /***/ (module1)=>{
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(2167)));
            ;
        /***/ },
        /***/ 4221: /***/ (module1, __webpack_exports__, __nested_webpack_require_990__)=>{
            __nested_webpack_require_990__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    __nested_webpack_require_990__.r(__webpack_exports__);
                    /* harmony export */ __nested_webpack_require_990__.d(__webpack_exports__, {
                        /* harmony export */ "default": ()=>/* binding */ Browse
                    });
                    /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_990__(9648);
                    /* harmony import */ var libcip54__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_990__(951);
                    /* harmony import */ var libcip54__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_990__.n(libcip54__WEBPACK_IMPORTED_MODULE_1__);
                    /* harmony import */ var _utils_dbsync__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_990__(34);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        axios__WEBPACK_IMPORTED_MODULE_0__
                    ]);
                    axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
                    async function Browse(req, res) {
                        libcip54__WEBPACK_IMPORTED_MODULE_1__.init(process.env.NETWORK?.toLowerCase(), _utils_dbsync__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */ .Z);
                        let { metadata , unit , id  } = req.body;
                        const result = await libcip54__WEBPACK_IMPORTED_MODULE_1__.getFile(unit, id, metadata);
                        res.setHeader("Content-type", result.mediaType);
                        res.status(200);
                        res.send(Buffer.from(result.buffer));
                    }
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_3085__ = __webpack_require__(2525);
    __nested_webpack_require_3085__.C(exports1);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_3085__(__nested_webpack_require_3085__.s = moduleId);
    var __webpack_exports__ = __nested_webpack_require_3085__.X(0, [
        3779
    ], ()=>__webpack_exec__(4221));
    module.exports = __webpack_exports__;
})();


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [164,501,525], () => (__webpack_exec__(4221)));
module.exports = __webpack_exports__;

})();