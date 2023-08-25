"use strict";
(() => {
var exports = {};
exports.id = 660;
exports.ids = [660];
exports.modules = {

/***/ 4065:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


(()=>{
    var exports = {};
    exports.id = 660;
    exports.ids = [
        660
    ];
    exports.modules = {
        /***/ 4065: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_201__)=>{
            __nested_webpack_require_201__.r(__webpack_exports__);
            /* harmony export */ __nested_webpack_require_201__.d(__webpack_exports__, {
                /* harmony export */ "default": ()=>/* binding */ MyDocument
            });
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_201__(997);
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_201__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_201__(6689);
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_201__.n(react__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_201__(6859);
            /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_201__(8308);
            /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_201__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
            class MyDocument extends next_document__WEBPACK_IMPORTED_MODULE_2__["default"] {
                render() {
                    return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_2__.Html, {
                        lang: "en",
                        children: [
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_2__.Head, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                                        charset: "utf-8"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                                        href: "https://fonts.googleapis.com/css2?family=MuseoModerno&family=Baloo+Thambi+2&display=swap",
                                        rel: "stylesheet"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                                        rel: "apple-touch-icon",
                                        sizes: "180x180",
                                        href: "/apple-touch-icon.png"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                                        rel: "icon",
                                        type: "image/png",
                                        sizes: "32x32",
                                        href: "/favicon-32x32.png"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                                        rel: "icon",
                                        type: "image/png",
                                        sizes: "16x16",
                                        href: "/favicon-16x16.png"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("script", {
                                        src: "https://code.createjs.com/1.0.0/createjs.min.js"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("script", {
                                        src: "https://code.createjs.com/1.0.0/preloadjs.min.js"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                                        rel: "manifest",
                                        href: "/site.webmanifest"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                                        rel: "mask-icon",
                                        href: "/safari-pinned-tab.svg",
                                        color: "#5bbad5"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("body", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_2__.Main, {}),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript, {})
                                ]
                            })
                        ]
                    });
                }
            }
            // `getInitialProps` belongs to `_document` (instead of `_app`),
            // it's compatible with server-side generation (SSG).
            MyDocument.getInitialProps = async (ctx)=>{
                // Resolution order
                //
                // On the server:
                // 1. app.getInitialProps
                // 2. page.getInitialProps
                // 3. document.getInitialProps
                // 4. app.render
                // 5. page.render
                // 6. document.render
                //
                // On the server with error:
                // 1. document.getInitialProps
                // 2. app.render
                // 3. page.render
                // 4. document.render
                //
                // On the client
                // 1. app.getInitialProps
                // 2. page.getInitialProps
                // 3. app.render
                // 4. page.render
                // Render app and page and get the context of the page with collected side effects.
                const sheets = new _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__.ServerStyleSheets();
                const originalRenderPage = ctx.renderPage;
                ctx.renderPage = ()=>originalRenderPage({
                        enhanceApp: (App)=>(props)=>sheets.collect(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(App, {
                                    ...props
                                }))
                    });
                const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_2__["default"].getInitialProps(ctx);
                return {
                    ...initialProps,
                    // Styles fragment is rendered after the app and page rendering finish.
                    styles: [
                        ...react__WEBPACK_IMPORTED_MODULE_1___default().Children.toArray(initialProps.styles),
                        sheets.getStyleElement()
                    ]
                };
            };
        /***/ },
        /***/ 8308: /***/ (module1)=>{
            module1.exports = __webpack_require__(8308);
        /***/ },
        /***/ 4140: /***/ (module1)=>{
            module1.exports = __webpack_require__(5778);
        /***/ },
        /***/ 9716: /***/ (module1)=>{
            module1.exports = __webpack_require__(9630);
        /***/ },
        /***/ 6368: /***/ (module1)=>{
            module1.exports = __webpack_require__(733);
        /***/ },
        /***/ 6724: /***/ (module1)=>{
            module1.exports = __webpack_require__(6724);
        /***/ },
        /***/ 8743: /***/ (module1)=>{
            module1.exports = __webpack_require__(8743);
        /***/ },
        /***/ 8524: /***/ (module1)=>{
            module1.exports = __webpack_require__(8524);
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
    var __nested_webpack_require_8641__ = __webpack_require__(7976);
    __nested_webpack_require_8641__.C(exports);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_8641__(__nested_webpack_require_8641__.s = moduleId);
    var __webpack_exports__ = __nested_webpack_require_8641__.X(0, [
        676,
        6859
    ], ()=>__webpack_exec__(4065));
    module.exports = __webpack_exports__;
})();


/***/ }),

/***/ 8308:
/***/ ((module) => {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ 6724:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 8743:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 7742:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/normalize-page-path.js");

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
var __webpack_exports__ = __webpack_require__.X(0, [285,501,976], () => (__webpack_exec__(4065)));
module.exports = __webpack_exports__;

})();