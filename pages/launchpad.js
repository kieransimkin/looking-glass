"use strict";
(() => {
var exports = {};
exports.id = 18;
exports.ids = [18];
exports.modules = {

/***/ 9053:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


(()=>{
    var exports = {};
    exports.id = 1018;
    exports.ids = [
        1018
    ];
    exports.modules = {
        /***/ 9276: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_203__)=>{
            // ESM COMPAT FLAG
            __nested_webpack_require_203__.r(__webpack_exports__);
            // EXPORTS
            __nested_webpack_require_203__.d(__webpack_exports__, {
                "default": ()=>/* binding */ Launchpad
            });
            // EXTERNAL MODULE: external "react/jsx-runtime"
            var jsx_runtime_ = __nested_webpack_require_203__(997);
            // EXTERNAL MODULE: external "next/head"
            var head_ = __nested_webpack_require_203__(968);
            var head_default = /*#__PURE__*/ __nested_webpack_require_203__.n(head_);
            // EXTERNAL MODULE: ./components/WalletContext.js
            var WalletContext = __nested_webpack_require_203__(9930);
            // EXTERNAL MODULE: external "@material-ui/core/styles"
            var styles_ = __nested_webpack_require_203__(8308);
            // EXTERNAL MODULE: external "@material-ui/core"
            var core_ = __nested_webpack_require_203__(8130);
            // EXTERNAL MODULE: external "@material-ui/core/styles/colorManipulator"
            var colorManipulator_ = __nested_webpack_require_203__(4628);
            // EXTERNAL MODULE: ./data/launchpadList.json
            var launchpadList = __nested_webpack_require_203__(1175);
            // EXTERNAL MODULE: ./components/ExampleCard.js
            var ExampleCard = __nested_webpack_require_203__(9920);
            // EXTERNAL MODULE: external "react"
            var external_react_ = __nested_webpack_require_203__(6689);
            // EXTERNAL MODULE: external "prop-types"
            var external_prop_types_ = __nested_webpack_require_203__(580);
            var external_prop_types_default = /*#__PURE__*/ __nested_webpack_require_203__.n(external_prop_types_);
            // EXTERNAL MODULE: external "@material-ui/core/Card"
            var Card_ = __nested_webpack_require_203__(7943);
            var Card_default = /*#__PURE__*/ __nested_webpack_require_203__.n(Card_);
            // EXTERNAL MODULE: external "@material-ui/core/CardActionArea"
            var CardActionArea_ = __nested_webpack_require_203__(6711);
            var CardActionArea_default = /*#__PURE__*/ __nested_webpack_require_203__.n(CardActionArea_);
            // EXTERNAL MODULE: external "@material-ui/core/CardActions"
            var CardActions_ = __nested_webpack_require_203__(6329);
            // EXTERNAL MODULE: external "@material-ui/core/CardContent"
            var CardContent_ = __nested_webpack_require_203__(898);
            var CardContent_default = /*#__PURE__*/ __nested_webpack_require_203__.n(CardContent_);
            // EXTERNAL MODULE: external "@material-ui/core/CardMedia"
            var CardMedia_ = __nested_webpack_require_203__(6833);
            // EXTERNAL MODULE: external "@material-ui/icons/ArrowDropUp"
            var ArrowDropUp_ = __nested_webpack_require_203__(2089);
            // EXTERNAL MODULE: external "@material-ui/icons/ArrowDropDown"
            var ArrowDropDown_ = __nested_webpack_require_203__(4380);
            // EXTERNAL MODULE: ./node_modules/next/link.js
            var next_link = __nested_webpack_require_203__(1664);
            var link_default = /*#__PURE__*/ __nested_webpack_require_203__.n(next_link);
            // EXTERNAL MODULE: ./node_modules/next/image.js
            var next_image = __nested_webpack_require_203__(5675);
            var image_default = /*#__PURE__*/ __nested_webpack_require_203__.n(next_image);
            // EXTERNAL MODULE: external "@material-ui/icons"
            var icons_ = __nested_webpack_require_203__(2105);
            ; // CONCATENATED MODULE: ./components/LaunchpadCard.js
            const useStyles = (0, styles_.makeStyles)((theme)=>{
                const first = (0, colorManipulator_.alpha)(theme.palette.background.paper, 0.9);
                const second = (0, colorManipulator_.alpha)(theme.palette.background.default, 0.9);
                let bgi = "url(/paper-texture-light.jpg)";
                if (theme.palette.type == "dark") {
                    bgi = "";
                }
                return {
                    root: {
                        flexBasis: "50em",
                        borderRadius: "2em !important",
                        transition: "all 0.8s ease",
                        filter: "drop-shadow(9px 5px 8px rgba(0,0,0,0.25))",
                        backgroundColor: theme.palette.background.paper,
                        backgroundImage: bgi,
                        backgroundSize: "600px",
                        width: "100%",
                        //minHeight: '400px',
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "550px"
                    },
                    actionArea: {
                        height: "100%"
                    },
                    cardContent: {
                        "& a": {
                            "&:hover": {
                                color: theme.palette.secondary.main,
                                transition: `color 0s ease`
                            },
                            transition: `color 0.8s ease`,
                            textDecoration: "none",
                            color: theme.palette.primary.main
                        },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        marginTop: "auto",
                        marginBottom: "auto",
                        flexGrow: 1,
                        gap: "10px"
                    },
                    media: {
                        height: 490
                    }
                };
            });
            const LaunchpadCard = (props)=>{
                const { page , categorySlug , categoryTitle  } = props;
                const theme = (0, core_.useTheme)();
                const classes = useStyles(props);
                return /*#__PURE__*/ jsx_runtime_.jsx(Card_default(), {
                    className: classes.root,
                    raised: true,
                    variant: "elevation",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(link_default(), {
                        href: "/launchpad/" + categorySlug + "/" + page.slug,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(CardActionArea_default(), {
                            className: classes.actionArea,
                            children: /*#__PURE__*/ (0, jsx_runtime_.jsxs)(CardContent_default(), {
                                className: classes.cardContent,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        style: {
                                            position: "relative",
                                            width: "100%",
                                            height: "700px",
                                            border: "1px solid rgba(0,0,0,0.5)",
                                            borderRadius: "7px",
                                            boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.3)"
                                        },
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(image_default(), {
                                            className: classes.media,
                                            src: "/launchpad/" + page.thumbnail,
                                            layout: "fill",
                                            title: categoryTitle,
                                            objectFit: "cover",
                                            style: {
                                                borderRadius: "7px",
                                                border: "1px solid rgba(0,0,0,0.5)"
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                        variant: "h5",
                                        children: categoryTitle
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                        style: {
                                            flexGrow: 1
                                        },
                                        children: page.description
                                    })
                                ]
                            })
                        })
                    })
                });
            };
            LaunchpadCard.propTypes = {
                page: external_prop_types_default().object.isRequired,
                categorySlug: external_prop_types_default().string.isRequired,
                categoryTitle: external_prop_types_default().string.isRequired
            };
            /* harmony default export */ const components_LaunchpadCard = LaunchpadCard;
            ; // CONCATENATED MODULE: ./pages/launchpad.js
            const launchpad_useStyles = (0, styles_.makeStyles)((theme)=>{
                const first = (0, colorManipulator_.alpha)(theme.palette.primary.main, 0.8);
                const second = (0, colorManipulator_.alpha)(theme.palette.secondary.main, 0.4);
                const darkfirst = (0, colorManipulator_.alpha)(theme.palette.primary.main, 0.2);
                const darksecond = (0, colorManipulator_.alpha)(theme.palette.secondary.main, 0.2);
                let bg = `linear-gradient(125deg, ${first} 0%, ${second} 100%),linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 100%),url('/fractal-colorwaves-background.jpg') !important`;
                if (theme.palette.type == "dark") {
                    bg = `linear-gradient(120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%), url('/fractal-colorwaves-background.jpg') !important`;
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
            function Launchpad() {
                const classes = launchpad_useStyles();
                const pages = [];
                for (const category of launchpadList){
                    for (const page of category.pages){
                        if (page.notInContents) continue;
                        pages.push(/*#__PURE__*/ jsx_runtime_.jsx(components_LaunchpadCard, {
                            categoryTitle: category.title,
                            categorySlug: category.slug,
                            page: page
                        }));
                    }
                }
                return /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ (0, jsx_runtime_.jsxs)(head_default(), {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("title", {
                                    children: "Launchpad"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                                    name: "description",
                                    content: ""
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("link", {
                                    rel: "icon",
                                    href: "/favicon.ico"
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: classes.bg
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                            color: "textPrimary",
                            variant: "h1",
                            align: "center",
                            className: classes.heading,
                            children: "Launchpad"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                        /*#__PURE__*/ (0, jsx_runtime_.jsxs)("main", {
                            className: classes.main,
                            children: [
                                "\xa0",
                                /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                "\xa0",
                                /*#__PURE__*/ jsx_runtime_.jsx(core_.Container, {
                                    maxWidth: "xl",
                                    className: classes.container,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: classes.root,
                                        children: pages
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
        /***/ },
        /***/ 1175: /***/ (module1)=>{
            module1.exports = JSON.parse('[{"title":"Smart Life","slug":"smart-life","pages":[{"title":"About Smart Life","slug":"about","description":"About the Smart Life project","thumbnail":"smart-life-alien.png"}]},{"title":"Smart Avatars","slug":"smart-avatars","pages":[{"title":"About Smart Avatars","slug":"about","description":"About the Smart Avatars project","thumbnail":"smart-avatars.png"},{"title":"Mint Now!","slug":"mint","notInContents":true,"description":"Work in progress","thumbnail":""}]}]');
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_21851__ = __webpack_require__(7976);
    __nested_webpack_require_21851__.C(exports);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_21851__(__nested_webpack_require_21851__.s = moduleId);
    var __webpack_exports__ = __nested_webpack_require_21851__.X(0, [
        5675,
        676,
        1664,
        9930,
        9920
    ], ()=>__webpack_exec__(9276));
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
var __webpack_exports__ = __webpack_require__.X(0, [501,976], () => (__webpack_exec__(9053)));
module.exports = __webpack_exports__;

})();