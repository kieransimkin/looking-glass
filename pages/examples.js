"use strict";
(() => {
var exports = {};
exports.id = 560;
exports.ids = [560];
exports.modules = {

/***/ 8627:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


(()=>{
    var exports = {};
    exports.id = 7560;
    exports.ids = [
        7560
    ];
    exports.modules = {
        /***/ 8627: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_203__)=>{
            __nested_webpack_require_203__.r(__webpack_exports__);
            /* harmony export */ __nested_webpack_require_203__.d(__webpack_exports__, {
                /* harmony export */ "default": ()=>/* binding */ Examples
            });
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_203__(997);
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_203__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_203__(968);
            /* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_203__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */ var _components_WalletContext__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_203__(9930);
            /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_203__(8308);
            /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_203__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
            /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_203__(8130);
            /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_203__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__);
            /* harmony import */ var _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_203__(4628);
            /* harmony import */ var _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_203__.n(_material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5__);
            /* harmony import */ var _data_exampleList_json__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_203__(7969);
            /* harmony import */ var _components_ExampleCard__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_203__(9920);
            const useStyles = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__.makeStyles)((theme)=>{
                const first = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5__.alpha)(theme.palette.primary.main, 0.8);
                const second = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5__.alpha)(theme.palette.secondary.main, 0.4);
                const darkfirst = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5__.alpha)(theme.palette.primary.main, 0.2);
                const darksecond = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5__.alpha)(theme.palette.secondary.main, 0.2);
                let bg = `linear-gradient(125deg, ${first} 0%, ${second} 100%),linear-gradient(0deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.8) 100%),url('/fibres-texture3.jpg') !important`;
                if (theme.palette.type == "dark") {
                    bg = `linear-gradient(120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%), url('/fibres-texture3.jpg') !important`;
                }
                return {
                    root: {
                        display: "flex",
                        width: "100%",
                        gap: "2em",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        alignItems: "stretch"
                    },
                    row: {
                        display: "flex",
                        width: "100%",
                        alignItems: "flex-start",
                        gap: "3em"
                    },
                    smallCol: {
                        flexBasis: "25%"
                    },
                    bigCol: {
                        flexBasis: "75%"
                    },
                    fullWidth: {
                        flexBasis: "100%"
                    },
                    bg: {
                        minHeight: "100vh",
                        background: bg,
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        overflowY: "auto",
                        "&:after": {
                            content: "''",
                            position: "fixed",
                            height: "25em",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 1,
                            backdropFilter: "blur(30px)",
                            mask: "linear-gradient(transparent 0%, black 100%)",
                            "-webkitMask": "-webkit-linear-gradient(transparent 0%, black 100%)"
                        }
                    },
                    container: {
                        paddingBottom: "10em"
                    },
                    heading: {
                        position: "absolute",
                        top: "0.5em",
                        right: 0,
                        left: 0,
                        marginLeft: "auto",
                        marginRight: "auto"
                    },
                    main: {
                        marginLeft: "2em",
                        marginRight: "2em",
                        marginTop: "8.5em"
                    }
                };
            });
            function Examples() {
                const classes = useStyles();
                const examples = [];
                for (const category of _data_exampleList_json__WEBPACK_IMPORTED_MODULE_6__){
                    for (const example of category.examples){
                        examples.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ExampleCard__WEBPACK_IMPORTED_MODULE_7__ /* ["default"] */ .Z, {
                            categorySlug: category.slug,
                            example: example
                        }));
                    }
                }
                return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_head__WEBPACK_IMPORTED_MODULE_1___default(), {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                                    children: "Smart NFT Examples"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                                    name: "description",
                                    content: ""
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                                    rel: "icon",
                                    href: "/favicon.ico"
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: classes.bg
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__.Typography, {
                            color: "textPrimary",
                            variant: "h1",
                            align: "center",
                            className: classes.heading,
                            children: "Examples"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
                            className: classes.main,
                            children: [
                                "\xa0",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                "\xa0",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__.Container, {
                                    maxWidth: "xl",
                                    className: classes.container,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: classes.root,
                                        children: examples
                                    })
                                })
                            ]
                        })
                    ]
                });
            }
        /***/ },
        /***/ 8130: /***/ (module1)=>{
            module1.exports = __webpack_require__(8130);
        /***/ },
        /***/ 7943: /***/ (module1)=>{
            module1.exports = __webpack_require__(7943);
        /***/ },
        /***/ 6711: /***/ (module1)=>{
            module1.exports = __webpack_require__(6711);
        /***/ },
        /***/ 6329: /***/ (module1)=>{
            module1.exports = __webpack_require__(6329);
        /***/ },
        /***/ 898: /***/ (module1)=>{
            module1.exports = __webpack_require__(898);
        /***/ },
        /***/ 6833: /***/ (module1)=>{
            module1.exports = __webpack_require__(6833);
        /***/ },
        /***/ 8308: /***/ (module1)=>{
            module1.exports = __webpack_require__(8308);
        /***/ },
        /***/ 4628: /***/ (module1)=>{
            module1.exports = __webpack_require__(4628);
        /***/ },
        /***/ 2105: /***/ (module1)=>{
            module1.exports = __webpack_require__(2105);
        /***/ },
        /***/ 4380: /***/ (module1)=>{
            module1.exports = __webpack_require__(4380);
        /***/ },
        /***/ 2089: /***/ (module1)=>{
            module1.exports = __webpack_require__(2089);
        /***/ },
        /***/ 3280: /***/ (module1)=>{
            module1.exports = __webpack_require__(3280);
        /***/ },
        /***/ 2796: /***/ (module1)=>{
            module1.exports = __webpack_require__(2796);
        /***/ },
        /***/ 4957: /***/ (module1)=>{
            module1.exports = __webpack_require__(4957);
        /***/ },
        /***/ 4014: /***/ (module1)=>{
            module1.exports = __webpack_require__(4014);
        /***/ },
        /***/ 744: /***/ (module1)=>{
            module1.exports = __webpack_require__(744);
        /***/ },
        /***/ 5843: /***/ (module1)=>{
            module1.exports = __webpack_require__(5843);
        /***/ },
        /***/ 8524: /***/ (module1)=>{
            module1.exports = __webpack_require__(8524);
        /***/ },
        /***/ 8020: /***/ (module1)=>{
            module1.exports = __webpack_require__(8020);
        /***/ },
        /***/ 4406: /***/ (module1)=>{
            module1.exports = __webpack_require__(4406);
        /***/ },
        /***/ 4964: /***/ (module1)=>{
            module1.exports = __webpack_require__(4964);
        /***/ },
        /***/ 1751: /***/ (module1)=>{
            module1.exports = __webpack_require__(1751);
        /***/ },
        /***/ 6220: /***/ (module1)=>{
            module1.exports = __webpack_require__(6220);
        /***/ },
        /***/ 299: /***/ (module1)=>{
            module1.exports = __webpack_require__(299);
        /***/ },
        /***/ 3938: /***/ (module1)=>{
            module1.exports = __webpack_require__(3938);
        /***/ },
        /***/ 9565: /***/ (module1)=>{
            module1.exports = __webpack_require__(9565);
        /***/ },
        /***/ 9646: /***/ (module1)=>{
            module1.exports = __webpack_require__(5789);
        /***/ },
        /***/ 1897: /***/ (module1)=>{
            module1.exports = __webpack_require__(1897);
        /***/ },
        /***/ 1428: /***/ (module1)=>{
            module1.exports = __webpack_require__(1428);
        /***/ },
        /***/ 8854: /***/ (module1)=>{
            module1.exports = __webpack_require__(8854);
        /***/ },
        /***/ 1292: /***/ (module1)=>{
            module1.exports = __webpack_require__(1292);
        /***/ },
        /***/ 4567: /***/ (module1)=>{
            module1.exports = __webpack_require__(4567);
        /***/ },
        /***/ 979: /***/ (module1)=>{
            module1.exports = __webpack_require__(979);
        /***/ },
        /***/ 3297: /***/ (module1)=>{
            module1.exports = __webpack_require__(3297);
        /***/ },
        /***/ 6052: /***/ (module1)=>{
            module1.exports = __webpack_require__(6052);
        /***/ },
        /***/ 4226: /***/ (module1)=>{
            module1.exports = __webpack_require__(4226);
        /***/ },
        /***/ 5052: /***/ (module1)=>{
            module1.exports = __webpack_require__(5052);
        /***/ },
        /***/ 9232: /***/ (module1)=>{
            module1.exports = __webpack_require__(9232);
        /***/ },
        /***/ 968: /***/ (module1)=>{
            module1.exports = __webpack_require__(968);
        /***/ },
        /***/ 580: /***/ (module1)=>{
            module1.exports = __webpack_require__(580);
        /***/ },
        /***/ 6689: /***/ (module1)=>{
            module1.exports = __webpack_require__(6689);
        /***/ },
        /***/ 997: /***/ (module1)=>{
            module1.exports = __webpack_require__(997);
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_15175__ = __webpack_require__(7976);
    __nested_webpack_require_15175__.C(exports);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_15175__(__nested_webpack_require_15175__.s = moduleId);
    var __webpack_exports__ = __nested_webpack_require_15175__.X(0, [
        5675,
        676,
        1664,
        9930,
        9920,
        7969
    ], ()=>__webpack_exec__(8627));
    module.exports = __webpack_exports__;
})();


/***/ }),

/***/ 8130:
/***/ ((module) => {

module.exports = require("@material-ui/core");

/***/ }),

/***/ 7943:
/***/ ((module) => {

module.exports = require("@material-ui/core/Card");

/***/ }),

/***/ 6711:
/***/ ((module) => {

module.exports = require("@material-ui/core/CardActionArea");

/***/ }),

/***/ 6329:
/***/ ((module) => {

module.exports = require("@material-ui/core/CardActions");

/***/ }),

/***/ 898:
/***/ ((module) => {

module.exports = require("@material-ui/core/CardContent");

/***/ }),

/***/ 6833:
/***/ ((module) => {

module.exports = require("@material-ui/core/CardMedia");

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

/***/ 4380:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowDropDown");

/***/ }),

/***/ 2089:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowDropUp");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 580:
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [501,976], () => (__webpack_exec__(8627)));
module.exports = __webpack_exports__;

})();