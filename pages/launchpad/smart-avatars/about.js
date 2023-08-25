"use strict";
(() => {
var exports = {};
exports.id = 9;
exports.ids = [9];
exports.modules = {

/***/ 5739:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
const _interopRequireWildcard = (__webpack_require__(1598)/* ["default"] */ .Z);
(()=>{
    var exports1 = {};
    exports1.id = 7009;
    exports1.ids = [
        7009
    ];
    exports1.modules = {
        /***/ 1305: /***/ (module1, __webpack_exports__, __nested_webpack_require_356__)=>{
            __nested_webpack_require_356__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    /* harmony export */ __nested_webpack_require_356__.d(__webpack_exports__, {
                        /* harmony export */ "Z": ()=>__WEBPACK_DEFAULT_EXPORT__
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_356__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_356__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_356__(6689);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_356__.n(react__WEBPACK_IMPORTED_MODULE_1__);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_356__(580);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_356__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_356__(8130);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_356__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
                    /* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_356__(1664);
                    /* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_356__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_356__(8308);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_356__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__);
                    /* harmony import */ var _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_356__(4628);
                    /* harmony import */ var _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_356__.n(_material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_6__);
                    /* harmony import */ var _material_ui_icons_ShoppingCart__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_356__(9637);
                    /* harmony import */ var _material_ui_icons_ShoppingCart__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __nested_webpack_require_356__.n(_material_ui_icons_ShoppingCart__WEBPACK_IMPORTED_MODULE_7__);
                    /* harmony import */ var _dialogs_MintSmartAvatarDialog__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_356__(3776);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _dialogs_MintSmartAvatarDialog__WEBPACK_IMPORTED_MODULE_8__
                    ]);
                    _dialogs_MintSmartAvatarDialog__WEBPACK_IMPORTED_MODULE_8__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
                    const useStyles = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__.makeStyles)((theme)=>{
                        const first = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_6__.alpha)(theme.palette.primary.main, 1);
                        const second = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_6__.alpha)(theme.palette.secondary.main, 1);
                        return {
                            root: {
                                fontFamily: "'Baloo Thambi 2', cursive",
                                fontWeight: 600,
                                fontSize: "40px",
                                letterSpacing: "0.02em",
                                borderRadius: "1.5em",
                                paddingLeft: "1em",
                                paddingRight: "1em",
                                paddingTop: "0.2em",
                                paddingBottom: "0.2em",
                                background: `radial-gradient(circle at top left, ${second} 0%, ${first} 90%)`,
                                boxShadow: "2px 2px 10px 5px rgba(0,0,0,0.5)",
                                border: "1px solid black"
                            }
                        };
                    });
                    const BigMintButton = (props)=>{
                        const { 0: icon , 1: setIcon  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons_ShoppingCart__WEBPACK_IMPORTED_MODULE_7___default(), {}));
                        const { 0: on , 1: setOn  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
                        const { 0: mintDialogOpen , 1: setMintDialogOpen  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
                        const mintDialogClose = ()=>{
                            setMintDialogOpen(false);
                        };
                        const onClick = ()=>{
                            setMintDialogOpen(true);
                        };
                        const theme = (0, _material_ui_core__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
                        const classes = useStyles(props);
                        return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_dialogs_MintSmartAvatarDialog__WEBPACK_IMPORTED_MODULE_8__ /* ["default"] */ .Z, {
                                    open: mintDialogOpen,
                                    onClose: mintDialogClose
                                }),
                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                    onClick: onClick,
                                    variant: "contained",
                                    className: classes.root,
                                    size: "large",
                                    color: "secondary",
                                    "aria-controls": "simple-menu",
                                    "aria-haspopup": "true",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            style: {
                                                marginRight: "0.3em"
                                            },
                                            children: icon
                                        }),
                                        " Mint One"
                                    ]
                                })
                            ]
                        });
                    };
                    BigMintButton.propTypes = {};
                    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = BigMintButton;
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 5739: /***/ (module1, __webpack_exports__, __nested_webpack_require_8188__)=>{
            __nested_webpack_require_8188__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    __nested_webpack_require_8188__.r(__webpack_exports__);
                    /* harmony export */ __nested_webpack_require_8188__.d(__webpack_exports__, {
                        /* harmony export */ "default": ()=>/* binding */ Launchpad
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_8188__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_8188__(968);
                    /* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_8188__(8130);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_8188__(8308);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
                    /* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_8188__(5031);
                    /* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__);
                    /* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_8188__(6256);
                    /* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__);
                    /* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_8188__(5168);
                    /* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_6__);
                    /* harmony import */ var _material_ui_core_ListItemAvatar__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_8188__(774);
                    /* harmony import */ var _material_ui_core_ListItemAvatar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_core_ListItemAvatar__WEBPACK_IMPORTED_MODULE_7__);
                    /* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_8188__(2098);
                    /* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_8__);
                    /* harmony import */ var _material_ui_icons_Build__WEBPACK_IMPORTED_MODULE_9__ = __nested_webpack_require_8188__(504);
                    /* harmony import */ var _material_ui_icons_Build__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_icons_Build__WEBPACK_IMPORTED_MODULE_9__);
                    /* harmony import */ var _material_ui_icons_Public__WEBPACK_IMPORTED_MODULE_10__ = __nested_webpack_require_8188__(4369);
                    /* harmony import */ var _material_ui_icons_Public__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_icons_Public__WEBPACK_IMPORTED_MODULE_10__);
                    /* harmony import */ var _material_ui_icons_SettingsRemote__WEBPACK_IMPORTED_MODULE_11__ = __nested_webpack_require_8188__(7712);
                    /* harmony import */ var _material_ui_icons_SettingsRemote__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_icons_SettingsRemote__WEBPACK_IMPORTED_MODULE_11__);
                    /* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_12__ = __nested_webpack_require_8188__(2217);
                    /* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_12__);
                    /* harmony import */ var _components_PictureCard__WEBPACK_IMPORTED_MODULE_13__ = __nested_webpack_require_8188__(7565);
                    /* harmony import */ var _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_14__ = __nested_webpack_require_8188__(4628);
                    /* harmony import */ var _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/ __nested_webpack_require_8188__.n(_material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_14__);
                    /* harmony import */ var _components_ContentCard__WEBPACK_IMPORTED_MODULE_15__ = __nested_webpack_require_8188__(7003);
                    /* harmony import */ var _components_BuyButton__WEBPACK_IMPORTED_MODULE_16__ = __nested_webpack_require_8188__(7939);
                    /* harmony import */ var _components_BigMintButton__WEBPACK_IMPORTED_MODULE_17__ = __nested_webpack_require_8188__(1305);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _components_BigMintButton__WEBPACK_IMPORTED_MODULE_17__
                    ]);
                    _components_BigMintButton__WEBPACK_IMPORTED_MODULE_17__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
                    const useStyles = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__.makeStyles)((theme)=>{
                        const first = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_14__.alpha)(theme.palette.primary.main, 0.8);
                        const second = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_14__.alpha)(theme.palette.secondary.main, 0.4);
                        const darkfirst = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_14__.alpha)(theme.palette.primary.main, 0.2);
                        const darksecond = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_14__.alpha)(theme.palette.secondary.main, 0.2);
                        let bg = `linear-gradient(125deg, ${first} 0%, ${second} 100%),linear-gradient(0deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.65) 100%),url('/fractal-necklace-background-repeating.jpg') !important`;
                        if (theme.palette.type == "dark") {
                            bg = `linear-gradient(120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%), url('/fractal-necklace-background-repeating.jpg') !important`;
                        }
                        return {
                            root: {
                                display: "flex",
                                width: "100%"
                            },
                            row: {
                                display: "flex",
                                width: "100%",
                                alignItems: "flex-start",
                                gap: "3em"
                            },
                            smallCol: {
                                flexBasis: "35%"
                            },
                            bigCol: {
                                flexBasis: "65%"
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
                        const classes = useStyles();
                        return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_head__WEBPACK_IMPORTED_MODULE_1___default(), {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                                            children: "About Smart Avatars"
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
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.Typography, {
                                    color: "textPrimary",
                                    variant: "h1",
                                    align: "center",
                                    className: classes.heading,
                                    children: "Smart Avatars"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
                                    className: classes.main,
                                    children: [
                                        "\xa0",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                        "\xa0",
                                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.Container, {
                                            maxWidth: "xl",
                                            className: classes.container,
                                            children: [
                                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: classes.row + " row",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: classes.smallCol + " column",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_PictureCard__WEBPACK_IMPORTED_MODULE_13__ /* ["default"] */ .Z, {
                                                                height: 920,
                                                                width: 1307,
                                                                alt: "Zombie Alien",
                                                                src: "/launchpad/zombie-alien.png"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: classes.bigCol + " column",
                                                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ContentCard__WEBPACK_IMPORTED_MODULE_15__ /* ["default"] */ .Z, {
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.Typography, {
                                                                        variant: "h2",
                                                                        color: "textSecondary",
                                                                        children: "What is a Smart NFT?"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__.Typography, {
                                                                        variant: "body1",
                                                                        children: [
                                                                            "The CIP54 standard allows a HTML+Javascript NFT to receive information about the current state of the blockchain, as well as import files and libraries from the blockchain.",
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                            "\xa0",
                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                            "This enables NFTs to respond to their environment in new and interesting ways, including reacting to oracle data, or being triggered by certain events. The standard also greatly increases the amount of data that can be made available to NFTs - image libraries, sounds, videos - an NFT can read files or metadata from any other token - this opens up the blockchain and will allow more expressiveness, art, and utility for many projects."
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_BigMintButton__WEBPACK_IMPORTED_MODULE_17__ /* ["default"] */ .Z, {})
                                                                ]
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                "\xa0",
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {})
                                            ]
                                        })
                                    ]
                                })
                            ]
                        });
                    }
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 8130: /***/ (module1)=>{
            module1.exports = __webpack_require__(8130);
        /***/ },
        /***/ 2098: /***/ (module1)=>{
            module1.exports = __webpack_require__(2098);
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
        /***/ 929: /***/ (module1)=>{
            module1.exports = __webpack_require__(929);
        /***/ },
        /***/ 6856: /***/ (module1)=>{
            module1.exports = __webpack_require__(6856);
        /***/ },
        /***/ 2400: /***/ (module1)=>{
            module1.exports = __webpack_require__(2400);
        /***/ },
        /***/ 2217: /***/ (module1)=>{
            module1.exports = __webpack_require__(2217);
        /***/ },
        /***/ 5031: /***/ (module1)=>{
            module1.exports = __webpack_require__(5031);
        /***/ },
        /***/ 6256: /***/ (module1)=>{
            module1.exports = __webpack_require__(6256);
        /***/ },
        /***/ 774: /***/ (module1)=>{
            module1.exports = __webpack_require__(774);
        /***/ },
        /***/ 5168: /***/ (module1)=>{
            module1.exports = __webpack_require__(5168);
        /***/ },
        /***/ 5442: /***/ (module1)=>{
            module1.exports = __webpack_require__(5442);
        /***/ },
        /***/ 8146: /***/ (module1)=>{
            module1.exports = __webpack_require__(8146);
        /***/ },
        /***/ 8308: /***/ (module1)=>{
            module1.exports = __webpack_require__(8308);
        /***/ },
        /***/ 4628: /***/ (module1)=>{
            module1.exports = __webpack_require__(4628);
        /***/ },
        /***/ 9032: /***/ (module1)=>{
            module1.exports = __webpack_require__(9032);
        /***/ },
        /***/ 5600: /***/ (module1)=>{
            module1.exports = __webpack_require__(5600);
        /***/ },
        /***/ 4380: /***/ (module1)=>{
            module1.exports = __webpack_require__(4380);
        /***/ },
        /***/ 2089: /***/ (module1)=>{
            module1.exports = __webpack_require__(2089);
        /***/ },
        /***/ 5871: /***/ (module1)=>{
            module1.exports = __webpack_require__(5871);
        /***/ },
        /***/ 2879: /***/ (module1)=>{
            module1.exports = __webpack_require__(2879);
        /***/ },
        /***/ 504: /***/ (module1)=>{
            module1.exports = __webpack_require__(504);
        /***/ },
        /***/ 7501: /***/ (module1)=>{
            module1.exports = __webpack_require__(7501);
        /***/ },
        /***/ 4369: /***/ (module1)=>{
            module1.exports = __webpack_require__(4369);
        /***/ },
        /***/ 7712: /***/ (module1)=>{
            module1.exports = __webpack_require__(7712);
        /***/ },
        /***/ 9637: /***/ (module1)=>{
            module1.exports = __webpack_require__(9637);
        /***/ },
        /***/ 8129: /***/ (module1)=>{
            module1.exports = __webpack_require__(8129);
        /***/ },
        /***/ 3349: /***/ (module1)=>{
            module1.exports = __webpack_require__(3349);
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
        /***/ 1711: /***/ (module1)=>{
            module1.exports = __webpack_require__(1711);
        /***/ },
        /***/ 3702: /***/ (module1)=>{
            module1.exports = __webpack_require__(3702);
        /***/ },
        /***/ 3662: /***/ (module1)=>{
            module1.exports = __webpack_require__(3662);
        /***/ },
        /***/ 997: /***/ (module1)=>{
            module1.exports = __webpack_require__(997);
        /***/ },
        /***/ 9648: /***/ (module1)=>{
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(2167)));
            ;
        /***/ },
        /***/ 3135: /***/ (module1)=>{
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'react-markdown'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))));
            ;
        /***/ },
        /***/ 6809: /***/ (module1)=>{
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'remark-gfm'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))));
            ;
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_35793__ = __webpack_require__(7976);
    __nested_webpack_require_35793__.C(exports1);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_35793__(__nested_webpack_require_35793__.s = moduleId);
    var __webpack_exports__ = __nested_webpack_require_35793__.X(0, [
        5675,
        676,
        1664,
        7019,
        9930,
        7921,
        7565,
        6024,
        7594,
        3776
    ], ()=>__webpack_exec__(5739));
    module.exports = __webpack_exports__;
})();


/***/ }),

/***/ 8130:
/***/ ((module) => {

module.exports = require("@material-ui/core");

/***/ }),

/***/ 2098:
/***/ ((module) => {

module.exports = require("@material-ui/core/Avatar");

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

/***/ 2217:
/***/ ((module) => {

module.exports = require("@material-ui/core/Divider");

/***/ }),

/***/ 5031:
/***/ ((module) => {

module.exports = require("@material-ui/core/List");

/***/ }),

/***/ 6256:
/***/ ((module) => {

module.exports = require("@material-ui/core/ListItem");

/***/ }),

/***/ 774:
/***/ ((module) => {

module.exports = require("@material-ui/core/ListItemAvatar");

/***/ }),

/***/ 5168:
/***/ ((module) => {

module.exports = require("@material-ui/core/ListItemText");

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

/***/ 9032:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowBack");

/***/ }),

/***/ 5600:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowDownward");

/***/ }),

/***/ 4380:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowDropDown");

/***/ }),

/***/ 2089:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowDropUp");

/***/ }),

/***/ 5871:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowForward");

/***/ }),

/***/ 2879:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowUpward");

/***/ }),

/***/ 504:
/***/ ((module) => {

module.exports = require("@material-ui/icons/Build");

/***/ }),

/***/ 7501:
/***/ ((module) => {

module.exports = require("@material-ui/icons/Close");

/***/ }),

/***/ 4369:
/***/ ((module) => {

module.exports = require("@material-ui/icons/Public");

/***/ }),

/***/ 7712:
/***/ ((module) => {

module.exports = require("@material-ui/icons/SettingsRemote");

/***/ }),

/***/ 9637:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ShoppingCart");

/***/ }),

/***/ 8129:
/***/ ((module) => {

module.exports = require("@material-ui/lab/Autocomplete");

/***/ }),

/***/ 3349:
/***/ ((module) => {

module.exports = require("@material-ui/styles");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

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

/***/ 1711:
/***/ ((module) => {

module.exports = require("react-color");

/***/ }),

/***/ 3702:
/***/ ((module) => {

module.exports = require("react-step-wizard");

/***/ }),

/***/ 3662:
/***/ ((module) => {

module.exports = require("react-twitter-embed");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [598,501,976], () => (__webpack_exec__(5739)));
module.exports = __webpack_exports__;

})();