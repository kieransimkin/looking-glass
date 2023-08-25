"use strict";
(() => {
var exports = {};
exports.id = 148;
exports.ids = [148];
exports.modules = {

/***/ 3128:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
const _interopRequireWildcard = (__webpack_require__(1598)/* ["default"] */ .Z);
(()=>{
    var exports1 = {};
    exports1.id = 2148;
    exports1.ids = [
        2148
    ];
    exports1.modules = {
        /***/ 3128: /***/ (module1, __webpack_exports__, __nested_webpack_require_356__)=>{
            "use strict";
            __nested_webpack_require_356__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    __nested_webpack_require_356__.r(__webpack_exports__);
                    /* harmony export */ __nested_webpack_require_356__.d(__webpack_exports__, {
                        /* harmony export */ "default": ()=>/* binding */ CIP54Playground
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_356__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_356__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_356__(6689);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_356__.n(react__WEBPACK_IMPORTED_MODULE_1__);
                    /* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_356__(1853);
                    /* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_356__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
                    /* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_356__(5152);
                    /* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_356__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_3__);
                    /* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_356__(1017);
                    /* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_356__.n(path__WEBPACK_IMPORTED_MODULE_4__);
                    /* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_356__(7147);
                    /* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_356__.n(fs__WEBPACK_IMPORTED_MODULE_5__);
                    /* harmony import */ var _components_Playground__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_356__(1344);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _components_Playground__WEBPACK_IMPORTED_MODULE_6__
                    ]);
                    _components_Playground__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
                    function CIP54Playground(params) {
                        const { 0: uses , 1: setUses  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
                        const { 0: metadata , 1: setMetadata  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
                        const { 0: programCode , 1: setProgramCode  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
                        const router = (0, next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
                        let { filename  } = router.query;
                        if (!filename) filename = [
                            ""
                        ];
                        (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
                            if (filename.includes("..")) return;
                            if (filename.join("/").length > 0) {
                                __nested_webpack_require_356__(4902)("./" + filename.join("/") + "/metadata.json").then((m)=>{
                                    setMetadata(m.default);
                                }).catch((e)=>{
                                    console.log(e);
                                });
                                __nested_webpack_require_356__(7293)("./" + filename.join("/") + "/uses.json").then((m)=>{
                                    setUses(m.default);
                                }).catch((e)=>{
                                    console.log(e);
                                });
                                fetch("../../demos/" + filename.join("/") + "/programCode.html").then((m)=>{
                                    if (!m.ok) {
                                        console.log("Not found");
                                    } else {
                                        m.blob().then((b)=>{
                                            b.arrayBuffer().then((ab)=>{
                                                var ia = new Uint8Array(ab);
                                                var tresult = new TextDecoder().decode(ia);
                                                setProgramCode(tresult);
                                            });
                                        });
                                    }
                                }).catch((e)=>{
                                    console.log(e);
                                });
                            }
                        });
                        if (filename.includes("..")) return "Why have you done this?"; // some basic sanitizing to avoid people being sneaky with ".."
                        /*
    
    */ return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Playground__WEBPACK_IMPORTED_MODULE_6__ /* ["default"] */ .Z, {
                            programCode: programCode,
                            uses: uses,
                            metadata: metadata
                        });
                    }
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 4902: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_6268__)=>{
            var map = {
                "./basic/conditional/metadata.json": [
                    9864,
                    9864
                ],
                "./basic/metadata/metadata.json": [
                    972,
                    972
                ],
                "./basic/show-api/metadata.json": [
                    1241,
                    1241
                ],
                "./basic/token-list/metadata.json": [
                    6594,
                    6594
                ],
                "./easeljs/smart-avatars/metadata.json": [
                    7887,
                    7887
                ],
                "./easeljs/zombie-alien/metadata.json": [
                    6450,
                    6450
                ],
                "./launchpad/adaquote/metadata.json": [
                    4120,
                    4120
                ],
                "./three.js/cube/metadata.json": [
                    157,
                    157
                ],
                "./three.js/smart-life-ft/metadata.json": [
                    3236,
                    3236
                ],
                "./three.js/smart-life/metadata.json": [
                    2042,
                    2042
                ],
                "./three.js/token-cubes/metadata.json": [
                    4749,
                    4749
                ]
            };
            function webpackAsyncContext(req) {
                if (!__nested_webpack_require_6268__.o(map, req)) {
                    return Promise.resolve().then(()=>{
                        var e = new Error("Cannot find module '" + req + "'");
                        e.code = "MODULE_NOT_FOUND";
                        throw e;
                    });
                }
                var ids = map[req], id = ids[0];
                return __nested_webpack_require_6268__.e(ids[1]).then(()=>{
                    return __nested_webpack_require_6268__.t(id, 3 | 16);
                });
            }
            webpackAsyncContext.keys = ()=>Object.keys(map);
            webpackAsyncContext.id = 4902;
            module1.exports = webpackAsyncContext;
        /***/ },
        /***/ 7293: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_8518__)=>{
            var map = {
                "./basic/conditional/uses.json": [
                    5461,
                    5461
                ],
                "./basic/metadata/uses.json": [
                    9007,
                    9007
                ],
                "./basic/show-api/uses.json": [
                    7243,
                    7243
                ],
                "./basic/token-list/uses.json": [
                    6852,
                    6852
                ],
                "./easeljs/smart-avatars/uses.json": [
                    1949,
                    1949
                ],
                "./easeljs/zombie-alien/uses.json": [
                    3042,
                    3042
                ],
                "./launchpad/adaquote/uses.json": [
                    248,
                    248
                ],
                "./three.js/cube/uses.json": [
                    4845,
                    4845
                ],
                "./three.js/smart-life-ft/uses.json": [
                    3507,
                    3507
                ],
                "./three.js/smart-life/uses.json": [
                    9190,
                    9190
                ],
                "./three.js/token-cubes/uses.json": [
                    8556,
                    8556
                ]
            };
            function webpackAsyncContext(req) {
                if (!__nested_webpack_require_8518__.o(map, req)) {
                    return Promise.resolve().then(()=>{
                        var e = new Error("Cannot find module '" + req + "'");
                        e.code = "MODULE_NOT_FOUND";
                        throw e;
                    });
                }
                var ids = map[req], id = ids[0];
                return __nested_webpack_require_8518__.e(ids[1]).then(()=>{
                    return __nested_webpack_require_8518__.t(id, 3 | 16);
                });
            }
            webpackAsyncContext.keys = ()=>Object.keys(map);
            webpackAsyncContext.id = 7293;
            module1.exports = webpackAsyncContext;
        /***/ },
        /***/ 8130: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(8130);
        /***/ },
        /***/ 7786: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(7786);
        /***/ },
        /***/ 929: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(929);
        /***/ },
        /***/ 6856: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(6856);
        /***/ },
        /***/ 2400: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(2400);
        /***/ },
        /***/ 5442: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(5442);
        /***/ },
        /***/ 8146: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(8146);
        /***/ },
        /***/ 8308: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(8308);
        /***/ },
        /***/ 4628: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(4628);
        /***/ },
        /***/ 2105: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(2105);
        /***/ },
        /***/ 5871: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(5871);
        /***/ },
        /***/ 7501: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(7501);
        /***/ },
        /***/ 4116: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(4116);
        /***/ },
        /***/ 8129: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(8129);
        /***/ },
        /***/ 3349: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(3349);
        /***/ },
        /***/ 9179: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(9179);
        /***/ },
        /***/ 5585: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(5585);
        /***/ },
        /***/ 3600: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(3600);
        /***/ },
        /***/ 8795: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(8795);
        /***/ },
        /***/ 6369: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(6369);
        /***/ },
        /***/ 1117: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(1117);
        /***/ },
        /***/ 3524: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(3524);
        /***/ },
        /***/ 7285: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(7285);
        /***/ },
        /***/ 6770: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(6770);
        /***/ },
        /***/ 9344: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(9344);
        /***/ },
        /***/ 1157: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(1157);
        /***/ },
        /***/ 8534: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(8534);
        /***/ },
        /***/ 8109: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(8109);
        /***/ },
        /***/ 9227: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(9227);
        /***/ },
        /***/ 4957: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(4957);
        /***/ },
        /***/ 744: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(744);
        /***/ },
        /***/ 5843: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(5843);
        /***/ },
        /***/ 5832: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(5832);
        /***/ },
        /***/ 8854: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(8854);
        /***/ },
        /***/ 3297: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(3297);
        /***/ },
        /***/ 9232: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(9232);
        /***/ },
        /***/ 968: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(968);
        /***/ },
        /***/ 1853: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(1853);
        /***/ },
        /***/ 580: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(580);
        /***/ },
        /***/ 5903: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(5903);
        /***/ },
        /***/ 6689: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(6689);
        /***/ },
        /***/ 3702: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(3702);
        /***/ },
        /***/ 997: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(997);
        /***/ },
        /***/ 4213: /***/ (module1)=>{
            "use strict";
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(204)));
            ;
        /***/ },
        /***/ 9851: /***/ (module1)=>{
            "use strict";
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(6914)));
            ;
        /***/ },
        /***/ 1923: /***/ (module1)=>{
            "use strict";
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(8560)));
            ;
        /***/ },
        /***/ 4598: /***/ (module1)=>{
            "use strict";
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(8874)));
            ;
        /***/ },
        /***/ 9648: /***/ (module1)=>{
            "use strict";
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(2167)));
            ;
        /***/ },
        /***/ 1582: /***/ (module1)=>{
            "use strict";
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(5178)));
            ;
        /***/ },
        /***/ 7147: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(7147);
        /***/ },
        /***/ 1017: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(1017);
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_18837__ = __webpack_require__(7976);
    __nested_webpack_require_18837__.C(exports1);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_18837__(__nested_webpack_require_18837__.s = moduleId);
    var __webpack_exports__ = __nested_webpack_require_18837__.X(0, [
        5675,
        7019,
        5152,
        7921,
        1612,
        1344
    ], ()=>__webpack_exec__(3128));
    module.exports = __webpack_exports__;
})();


/***/ }),

/***/ 204:
/***/ ((module) => {

module.exports = require("@codemirror/lang-css");

/***/ }),

/***/ 6914:
/***/ ((module) => {

module.exports = require("@codemirror/lang-html");

/***/ }),

/***/ 8560:
/***/ ((module) => {

module.exports = require("@codemirror/lang-javascript");

/***/ }),

/***/ 8874:
/***/ ((module) => {

module.exports = require("@codemirror/view");

/***/ }),

/***/ 8130:
/***/ ((module) => {

module.exports = require("@material-ui/core");

/***/ }),

/***/ 7786:
/***/ ((module) => {

module.exports = require("@material-ui/core/CircularProgress/CircularProgress");

/***/ }),

/***/ 929:
/***/ ((module) => {

module.exports = require("@material-ui/core/DialogActions");

/***/ }),

/***/ 6856:
/***/ ((module) => {

module.exports = require("@material-ui/core/DialogContent");

/***/ }),

/***/ 2400:
/***/ ((module) => {

module.exports = require("@material-ui/core/DialogTitle");

/***/ }),

/***/ 5442:
/***/ ((module) => {

module.exports = require("@material-ui/core/Radio");

/***/ }),

/***/ 8146:
/***/ ((module) => {

module.exports = require("@material-ui/core/RadioGroup");

/***/ }),

/***/ 8308:
/***/ ((module) => {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ 4628:
/***/ ((module) => {

module.exports = require("@material-ui/core/styles/colorManipulator");

/***/ }),

/***/ 2105:
/***/ ((module) => {

module.exports = require("@material-ui/icons");

/***/ }),

/***/ 5871:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowForward");

/***/ }),

/***/ 7501:
/***/ ((module) => {

module.exports = require("@material-ui/icons/Close");

/***/ }),

/***/ 4116:
/***/ ((module) => {

module.exports = require("@material-ui/lab");

/***/ }),

/***/ 8129:
/***/ ((module) => {

module.exports = require("@material-ui/lab/Autocomplete");

/***/ }),

/***/ 3349:
/***/ ((module) => {

module.exports = require("@material-ui/styles");

/***/ }),

/***/ 9179:
/***/ ((module) => {

module.exports = require("@uiw/react-codemirror");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 5585:
/***/ ((module) => {

module.exports = require("buffer/");

/***/ }),

/***/ 3600:
/***/ ((module) => {

module.exports = require("core-js/modules/es.array.includes.js");

/***/ }),

/***/ 8795:
/***/ ((module) => {

module.exports = require("core-js/modules/es.json.stringify.js");

/***/ }),

/***/ 6369:
/***/ ((module) => {

module.exports = require("core-js/modules/es.object.assign.js");

/***/ }),

/***/ 1117:
/***/ ((module) => {

module.exports = require("core-js/modules/es.promise.js");

/***/ }),

/***/ 3524:
/***/ ((module) => {

module.exports = require("core-js/modules/es.regexp.exec.js");

/***/ }),

/***/ 7285:
/***/ ((module) => {

module.exports = require("core-js/modules/es.regexp.to-string.js");

/***/ }),

/***/ 6770:
/***/ ((module) => {

module.exports = require("core-js/modules/es.string.includes.js");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("core-js/modules/es.string.replace.js");

/***/ }),

/***/ 1157:
/***/ ((module) => {

module.exports = require("core-js/modules/es.weak-map.js");

/***/ }),

/***/ 8534:
/***/ ((module) => {

module.exports = require("core-js/modules/web.dom-collections.iterator.js");

/***/ }),

/***/ 8109:
/***/ ((module) => {

module.exports = require("file-saver");

/***/ }),

/***/ 5178:
/***/ ((module) => {

module.exports = require("html-minifier-terser");

/***/ }),

/***/ 9227:
/***/ ((module) => {

module.exports = require("jszip");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 580:
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ 5903:
/***/ ((module) => {

module.exports = require("rc-dock");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 3702:
/***/ ((module) => {

module.exports = require("react-step-wizard");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [598,501,976], () => (__webpack_exec__(3128)));
module.exports = __webpack_exports__;

})();