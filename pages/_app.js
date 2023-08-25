"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 8510:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
const _interopRequireWildcard = (__webpack_require__(1598)/* ["default"] */ .Z);
(()=>{
    var exports1 = {};
    exports1.id = 2888;
    exports1.ids = [
        2888
    ];
    exports1.modules = {
        /***/ 9131: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_372__)=>{
            /* harmony export */ __nested_webpack_require_372__.d(__webpack_exports__, {
                /* harmony export */ "Z": ()=>__WEBPACK_DEFAULT_EXPORT__
            });
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_372__(997);
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_372__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_372__(8130);
            /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_372__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */ var _NestedMenuItem__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_372__(9350);
            /* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_372__(1664);
            /* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_372__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
            /* harmony import */ var _data_exampleList_json__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_372__(7969);
            const ExamplesMenuItems = (props)=>{
                const { parentMenuOpen  } = props;
                let items = [];
                for (const item of _data_exampleList_json__WEBPACK_IMPORTED_MODULE_4__){
                    let examples = [];
                    for (const example of item.examples){
                        examples.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: "/play/" + item.slug + "/" + example.slug,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
                                children: example.title
                            })
                        }, example.slug));
                    }
                    items.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_NestedMenuItem__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */ .Z, {
                        direction: "left",
                        label: item.title,
                        parentMenuOpen: parentMenuOpen,
                        children: examples
                    }, "l" + item.slug));
                }
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: items
                });
            };
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ExamplesMenuItems;
        /***/ },
        /***/ 7673: /***/ (module1, __webpack_exports__, __nested_webpack_require_3259__)=>{
            __nested_webpack_require_3259__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    /* harmony export */ __nested_webpack_require_3259__.d(__webpack_exports__, {
                        /* harmony export */ "Z": ()=>__WEBPACK_DEFAULT_EXPORT__
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_3259__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_3259__(8736);
                    /* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_1__);
                    /* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_3259__(5722);
                    /* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_2__);
                    /* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_3259__(3974);
                    /* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_3__);
                    /* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_3259__(1853);
                    /* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
                    /* harmony import */ var _material_ui_lab_ToggleButton__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_3259__(2648);
                    /* harmony import */ var _material_ui_lab_ToggleButton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_lab_ToggleButton__WEBPACK_IMPORTED_MODULE_5__);
                    /* harmony import */ var _material_ui_lab_ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_3259__(7166);
                    /* harmony import */ var _material_ui_lab_ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_lab_ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_6__);
                    /* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_3259__(4176);
                    /* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7__);
                    /* harmony import */ var _material_ui_icons_Power__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_3259__(3793);
                    /* harmony import */ var _material_ui_icons_Power__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_icons_Power__WEBPACK_IMPORTED_MODULE_8__);
                    /* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__ = __nested_webpack_require_3259__(124);
                    /* harmony import */ var _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__);
                    /* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __nested_webpack_require_3259__(4104);
                    /* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__);
                    /* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__ = __nested_webpack_require_3259__(2610);
                    /* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__);
                    /* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12__ = __nested_webpack_require_3259__(1664);
                    /* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(next_link__WEBPACK_IMPORTED_MODULE_12__);
                    /* harmony import */ var _WalletSelector__WEBPACK_IMPORTED_MODULE_13__ = __nested_webpack_require_3259__(7965);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14__ = __nested_webpack_require_3259__(6689);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(react__WEBPACK_IMPORTED_MODULE_14__);
                    /* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_15__ = __nested_webpack_require_3259__(5986);
                    /* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_15__);
                    /* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16__ = __nested_webpack_require_3259__(8250);
                    /* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16__);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_17__ = __nested_webpack_require_3259__(8308);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_17__);
                    /* harmony import */ var _material_ui_icons_Whatshot__WEBPACK_IMPORTED_MODULE_18__ = __nested_webpack_require_3259__(4465);
                    /* harmony import */ var _material_ui_icons_Whatshot__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_icons_Whatshot__WEBPACK_IMPORTED_MODULE_18__);
                    /* harmony import */ var _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_19__ = __nested_webpack_require_3259__(4628);
                    /* harmony import */ var _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_19__);
                    /* harmony import */ var _utils_Hooks__WEBPACK_IMPORTED_MODULE_20__ = __nested_webpack_require_3259__(7594);
                    /* harmony import */ var _material_ui_icons_CastForEducation__WEBPACK_IMPORTED_MODULE_21__ = __nested_webpack_require_3259__(2623);
                    /* harmony import */ var _material_ui_icons_CastForEducation__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_icons_CastForEducation__WEBPACK_IMPORTED_MODULE_21__);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_22__ = __nested_webpack_require_3259__(580);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(prop_types__WEBPACK_IMPORTED_MODULE_22__);
                    /* harmony import */ var _components_WalletContext__WEBPACK_IMPORTED_MODULE_23__ = __nested_webpack_require_3259__(9930);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_24__ = __nested_webpack_require_3259__(8130);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_24__);
                    /* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_25__ = __nested_webpack_require_3259__(2105);
                    /* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/ __nested_webpack_require_3259__.n(_material_ui_icons__WEBPACK_IMPORTED_MODULE_25__);
                    /* harmony import */ var _NestedMenuItem__WEBPACK_IMPORTED_MODULE_26__ = __nested_webpack_require_3259__(9350);
                    /* harmony import */ var _ExamplesMenuItems__WEBPACK_IMPORTED_MODULE_27__ = __nested_webpack_require_3259__(9131);
                    /* harmony import */ var _utils_EventBus__WEBPACK_IMPORTED_MODULE_28__ = __nested_webpack_require_3259__(318);
                    /* harmony import */ var _dialogs_ImportZipDialog__WEBPACK_IMPORTED_MODULE_29__ = __nested_webpack_require_3259__(5027);
                    /* harmony import */ var _dialogs_ImportBlockchainDialog__WEBPACK_IMPORTED_MODULE_30__ = __nested_webpack_require_3259__(4490);
                    /* harmony import */ var _dialogs_NewDialog__WEBPACK_IMPORTED_MODULE_31__ = __nested_webpack_require_3259__(7203);
                    /* harmony import */ var _dialogs_SaveAsDialog__WEBPACK_IMPORTED_MODULE_32__ = __nested_webpack_require_3259__(3872);
                    /* harmony import */ var _LaunchpadMenuItems__WEBPACK_IMPORTED_MODULE_33__ = __nested_webpack_require_3259__(7149);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _dialogs_ImportZipDialog__WEBPACK_IMPORTED_MODULE_29__,
                        _dialogs_ImportBlockchainDialog__WEBPACK_IMPORTED_MODULE_30__,
                        _dialogs_NewDialog__WEBPACK_IMPORTED_MODULE_31__,
                        _dialogs_SaveAsDialog__WEBPACK_IMPORTED_MODULE_32__,
                        _LaunchpadMenuItems__WEBPACK_IMPORTED_MODULE_33__
                    ]);
                    [_dialogs_ImportZipDialog__WEBPACK_IMPORTED_MODULE_29__, _dialogs_ImportBlockchainDialog__WEBPACK_IMPORTED_MODULE_30__, _dialogs_NewDialog__WEBPACK_IMPORTED_MODULE_31__, _dialogs_SaveAsDialog__WEBPACK_IMPORTED_MODULE_32__, _LaunchpadMenuItems__WEBPACK_IMPORTED_MODULE_33__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__;
                    const useStyles = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_17__.makeStyles)((theme)=>{
                        const first = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_19__.alpha)(theme.palette.background.default, 0.85);
                        const second = (0, _material_ui_core_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_19__.alpha)(theme.palette.background.paper, 0.85);
                        let bgi = "url(/paper-texture-light.jpg)";
                        if (theme.palette.type == "dark") {
                            bgi = "";
                        }
                        return {
                            root: {
                                display: "inline",
                                //backdropFilter: `blur(2px)`,
                                boxShadow: `2px 2px 20px 7px rgba(0,0,0,0.20)`,
                                //background:``,
                                background: `linear-gradient(120deg, ${first} 0%, ${second} 50%) `,
                                borderBottom: `2px solid rgba(0,0,0,0.4)`,
                                transition: "opacity 0.8s cubic-bezier(0.64, 0.63, 0.39, 1.19)"
                            },
                            menu: {
                                backgroundImage: bgi
                            },
                            title: {
                                fontSize: "1.5em",
                                fontWeight: 600,
                                fontFamily: "'MuseoModerno', cursive"
                            },
                            hidden: {
                                display: "inline",
                                //backdropFilter: `blur(2px)`,
                                boxShadow: `2px 2px 20px 7px rgba(0,0,0,0.20)`,
                                borderBottom: `2px solid rgba(0,0,0,0.4)`,
                                background: `linear-gradient(120deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 50%)`,
                                transition: "opacity 0.8s cubic-bezier(0.64, 0.63, 0.39, 1.19)"
                            },
                            tools: {
                                position: "relative",
                                top: "-0px"
                            },
                            nominbtn: {
                                minWidth: `10px !important`
                            },
                            drawerPaper: {
                                height: "auto",
                                borderBottomLeftRadius: "1em",
                                boxShadow: "2px 2px 25px 1px rgba(0,0,0,0.5)"
                            },
                            drawerPaperOpen: {
                                height: "auto",
                                borderBottomRightRadius: "1em",
                                borderTopRightRadius: "1em",
                                borderTopLeftRadius: "1em",
                                boxShadow: "2px 2px 25px 1px rgba(0,0,0,0.5)"
                            },
                            menuPaper: {
                                translate: "-2.0em",
                                borderTopRightRadius: "0px !important"
                            }
                        };
                    });
                    let timer = null;
                    const Header = (props)=>{
                        // Props: 
                        const { onWalletChange , onThemeChange  } = props;
                        // State: 
                        const [walletOpen, setWalletOpen] = react__WEBPACK_IMPORTED_MODULE_14___default().useState(false);
                        const [saveAsOpen, setSaveAsOpen] = react__WEBPACK_IMPORTED_MODULE_14___default().useState(false);
                        const [newOpen, setNewOpen] = react__WEBPACK_IMPORTED_MODULE_14___default().useState(false);
                        const [importBlockchainOpen, setImportBlockchainOpen] = react__WEBPACK_IMPORTED_MODULE_14___default().useState(false);
                        const [importZipOpen, setImportZipOpen] = react__WEBPACK_IMPORTED_MODULE_14___default().useState(false);
                        const [wallet, setWallet] = react__WEBPACK_IMPORTED_MODULE_14___default().useState(null);
                        const [darkMode, setDarkMode] = react__WEBPACK_IMPORTED_MODULE_14___default().useState("light");
                        const [walletApi, setWalletAPI] = react__WEBPACK_IMPORTED_MODULE_14___default().useState(null);
                        const [anchorEl, setAnchorEl] = react__WEBPACK_IMPORTED_MODULE_14___default().useState(null);
                        const [callbackFn, setCallbackFn] = react__WEBPACK_IMPORTED_MODULE_14___default().useState({
                            "fn": ()=>{
                                return;
                            },
                            "fail": ()=>{
                                return;
                            }
                        });
                        const { 0: hide , 1: setHide  } = (0, react__WEBPACK_IMPORTED_MODULE_14__.useState)(false);
                        const { 0: hover , 1: setHover  } = (0, react__WEBPACK_IMPORTED_MODULE_14__.useState)(false);
                        // Context: 
                        const classes = useStyles(props);
                        const router = (0, next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
                        const walletCtx = (0, react__WEBPACK_IMPORTED_MODULE_14__.useContext)(_components_WalletContext__WEBPACK_IMPORTED_MODULE_23__ /* ["default"] */ .Z);
                        let connectContent = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons_Power__WEBPACK_IMPORTED_MODULE_8___default(), {
                            fontSize: "small",
                            sx: {
                                padding: 0,
                                margin: 0
                            }
                        });
                        const buttonsize = "medium";
                        const buttonclass = "nomwbtn";
                        const doOnWalletChange = (props)=>{
                            localStorage.setItem("cip54-wallet", JSON.stringify(props));
                            return onWalletChange(props);
                        };
                        const connectWallet = (0, react__WEBPACK_IMPORTED_MODULE_14__.useCallback)((callback, failCallback)=>{
                            if (!walletCtx || !walletCtx.api) {
                                setCallbackFn({
                                    fn: callback,
                                    fail: failCallback
                                });
                                setWalletOpen(true);
                            } else {
                                callback(walletCtx);
                            }
                        });
                        (0, react__WEBPACK_IMPORTED_MODULE_14__.useEffect)(()=>{
                            if (!walletCtx) {
                                let wallet = null;
                                try {
                                    wallet = JSON.parse(localStorage.getItem("cip54-wallet"));
                                } catch (e) {}
                                if (wallet && wallet?.wallet) {
                                    try {
                                        window.cardano[wallet.wallet].isEnabled().then((enabled)=>{
                                            if (enabled) {
                                                window.cardano[wallet.wallet].enable().catch((error)=>{
                                                    alert("Wallet connect error: " + error);
                                                    return false;
                                                }).then((api)=>{
                                                    doOnWalletChange({
                                                        api: api,
                                                        wallet: wallet.wallet,
                                                        stakeAddrRaw: wallet.stakeAddrRaw,
                                                        returnAddrRaw: wallet.returnAddrRaw,
                                                        connectContent: connectWallet
                                                    });
                                                    setWalletAPI(api);
                                                    setWallet(wallet.wallet);
                                                });
                                            } else {
                                                doOnWalletChange({
                                                    "api": null,
                                                    "wallet": null,
                                                    "stakeAddrRaw": null,
                                                    "returnAddrRaw": null,
                                                    "connectWallet": connectWallet
                                                });
                                            }
                                        });
                                    } catch (e1) {
                                        console.log(e1);
                                    }
                                }
                            }
                            let dark = localStorage.getItem("cip54-darkmode");
                            if (dark && dark == "light" || dark == "dark") {
                                setDarkMode(dark);
                                onThemeChange(dark);
                            }
                        }, []);
                        const className = hide ? classes.hidden : classes.root;
                        const toggleVisibility = (0, react__WEBPACK_IMPORTED_MODULE_14__.useCallback)((hide, cursor)=>{
                            setHide(hide);
                        }, []);
                        const onMouseMove = (0, react__WEBPACK_IMPORTED_MODULE_14__.useCallback)(()=>{
                            clearTimeout(timer);
                            if (hide) {
                                toggleVisibility(!hide, "default");
                            }
                            timer = setTimeout(()=>{
                                if (!hover) {
                                    toggleVisibility(true, "none");
                                    setAnchorEl(null);
                                }
                            }, 5000);
                        }, [
                            hide,
                            hover,
                            setHide
                        ]);
                        // Events:
                        (0, react__WEBPACK_IMPORTED_MODULE_14__.useEffect)(()=>{
                            window.addEventListener("mousemove", onMouseMove);
                            window.addEventListener("click", onMouseMove);
                            window.addEventListener("touchstart", onMouseMove);
                            window.addEventListener("touchmove", onMouseMove);
                            //window.addEventListener('keyup', onMouseMove);
                            window.addEventListener("scroll", onMouseMove);
                            return ()=>{
                                window.removeEventListener("mousemove", onMouseMove);
                                window.removeEventListener("click", onMouseMove);
                                window.removeEventListener("touchstart", onMouseMove);
                                window.removeEventListener("touchmove", onMouseMove);
                                //window.removeEventListener('keyup', onMouseMove);
                                window.removeEventListener("scroll", onMouseMove);
                            };
                        }, [
                            onMouseMove
                        ]);
                        const handleWalletClickOpen = ()=>{
                            setCallbackFn({
                                fn: ()=>{
                                    return;
                                },
                                fail: ()=>{
                                    return;
                                }
                            });
                            setWalletOpen(true);
                        };
                        const handleNewClick = ()=>{
                            setNewOpen(true);
                        };
                        const handleSaveAsClick = ()=>{
                            setSaveAsOpen(true);
                        };
                        const handleImportBlockchainClick = ()=>{
                            setImportBlockchainOpen(true);
                        };
                        const handleImportZipClick = ()=>{
                            setImportZipOpen(true);
                        };
                        const handleNewClose = (value)=>{
                            setNewOpen(false);
                        };
                        const handleSaveAsClose = (value)=>{
                            setSaveAsOpen(false);
                        };
                        const handleImportBlockchainClose = (value)=>{
                            setImportBlockchainOpen(false);
                        };
                        const handleImportZipClose = (value)=>{
                            setImportZipOpen(false);
                        };
                        const handleWalletClose = (value)=>{
                            setWalletOpen(false);
                            callbackFn.fn(value);
                            let walletIsEnabled = false;
                            if (typeof value == "undefined" || !value) {
                                callbackFn.fail();
                                return;
                            }
                            ;
                            try {
                                window.cardano[value].isEnabled().then((enabled)=>{
                                    window.cardano[value].enable().catch((error)=>{
                                        alert("Wallet connect error: " + error);
                                        callbackFn.fail();
                                        return false;
                                    }).then((api)=>{
                                        if (!api) return;
                                        api.getRewardAddresses().then((addresses)=>{
                                            api.getChangeAddress().then((change)=>{
                                                doOnWalletChange({
                                                    "api": api,
                                                    "wallet": value,
                                                    "stakeAddrRaw": addresses[0],
                                                    "returnAddrRaw": change,
                                                    "stakeKey": change.slice(58, 114),
                                                    "connectWallet": connectWallet
                                                });
                                            });
                                        });
                                        setWalletAPI(api);
                                    });
                                    setWallet(value);
                                });
                            } catch (err) {
                                callbackFn.fail();
                                console.log(err);
                            }
                        };
                        const handleClose = (value)=>{
                            setAnchorEl(null);
                        };
                        const handleClick = (value)=>{
                            setAnchorEl(value.currentTarget);
                        };
                        const toggleDarkMode = (e)=>{
                            const newMode = darkMode === "light" ? "dark" : "light";
                            localStorage.setItem("cip54-darkmode", newMode);
                            setDarkMode(newMode);
                            onThemeChange(newMode);
                        };
                        const handleLogout = ()=>{
                            doOnWalletChange(null);
                            setWalletAPI(null);
                            setWallet(null);
                            setAnchorEl(null);
                        };
                        const openNewDialog = ()=>{};
                        const exportZip = ()=>{
                            _utils_EventBus__WEBPACK_IMPORTED_MODULE_28__ /* ["default"].dispatch */ .Z.dispatch("saveZip", {
                                message: "saving zip"
                            });
                        };
                        const exportHtml = ()=>{
                            _utils_EventBus__WEBPACK_IMPORTED_MODULE_28__ /* ["default"].dispatch */ .Z.dispatch("saveHtml", {
                                message: "saving html"
                            });
                        };
                        return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_24__.Drawer, {
                            id: "drawer",
                            classes: {
                                paper: anchorEl ? classes.drawerPaperOpen : classes.drawerPaper
                            },
                            variant: "persistent",
                            anchor: "right",
                            open: !hide,
                            className: className,
                            children: [
                                !walletApi && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default(), {
                                        title: "Connect Wallet",
                                        size: buttonsize,
                                        className: buttonclass,
                                        sx: {
                                            margin: 0,
                                            padding: 0
                                        },
                                        variant: "outlined",
                                        color: "secondary",
                                        onClick: handleWalletClickOpen,
                                        children: connectContent
                                    })
                                }),
                                walletApi && /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    style: {
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_3___default(), {
                                            className: buttonclass,
                                            size: buttonsize,
                                            "aria-controls": "simple-menu",
                                            "aria-haspopup": "true",
                                            onClick: handleClick,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7___default(), {
                                                fontSize: buttonsize,
                                                color: "secondary"
                                            })
                                        }),
                                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_15___default(), {
                                            id: "simple-menu",
                                            classes: {
                                                paper: classes.menuPaper
                                            },
                                            anchorEl: anchorEl,
                                            keepMounted: true,
                                            open: Boolean(anchorEl),
                                            getContentAnchorEl: null,
                                            onClose: handleClose,
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "right"
                                            },
                                            transformOrigin: {
                                                vertical: "top",
                                                horizontal: "left"
                                            },
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default(), {
                                                    href: "/",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                        onClick: handleClose,
                                                        children: "Home"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_NestedMenuItem__WEBPACK_IMPORTED_MODULE_26__ /* ["default"] */ .Z, {
                                                    direction: "left",
                                                    label: "File...",
                                                    parentMenuOpen: Boolean(anchorEl),
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                            onClick: handleNewClick,
                                                            children: "New..."
                                                        }),
                                                        router.route.substring(0, 5) == "/play" && /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                                    onClick: openNewDialog,
                                                                    children: "Save"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                                    onClick: handleSaveAsClick,
                                                                    children: "Save As..."
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_NestedMenuItem__WEBPACK_IMPORTED_MODULE_26__ /* ["default"] */ .Z, {
                                                            direction: "left",
                                                            label: "Import...",
                                                            parentMenuOpen: Boolean(anchorEl),
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                                    onClick: handleImportBlockchainClick,
                                                                    children: "From blockchain..."
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                                    onClick: handleImportZipClick,
                                                                    children: "From ZIP..."
                                                                })
                                                            ]
                                                        }),
                                                        router.route.substring(0, 5) == "/play" && /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_NestedMenuItem__WEBPACK_IMPORTED_MODULE_26__ /* ["default"] */ .Z, {
                                                            direction: "left",
                                                            label: "Export...",
                                                            parentMenuOpen: Boolean(anchorEl),
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                                    onClick: exportZip,
                                                                    children: "To ZIP..."
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                                    onClick: exportHtml,
                                                                    children: "To HTML..."
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default(), {
                                                    href: "/play",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                        children: "Play"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default(), {
                                                    href: "/examples",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_NestedMenuItem__WEBPACK_IMPORTED_MODULE_26__ /* ["default"] */ .Z, {
                                                        onClick: ()=>router.push("/examples"),
                                                        direction: "left",
                                                        label: "Examples...",
                                                        parentMenuOpen: Boolean(anchorEl),
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ExamplesMenuItems__WEBPACK_IMPORTED_MODULE_27__ /* ["default"] */ .Z, {
                                                            parentMenuOpen: Boolean(anchorEl)
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default(), {
                                                    href: "/launchpad",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_NestedMenuItem__WEBPACK_IMPORTED_MODULE_26__ /* ["default"] */ .Z, {
                                                        onClick: ()=>router.push("/launchpad"),
                                                        direction: "left",
                                                        label: "Launchpad...",
                                                        parentMenuOpen: Boolean(anchorEl),
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_LaunchpadMenuItems__WEBPACK_IMPORTED_MODULE_33__ /* ["default"] */ .Z, {
                                                            parentMenuOpen: Boolean(anchorEl)
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                    onClick: toggleDarkMode,
                                                    children: [
                                                        darkMode === "dark" ? "Dark Mode" : "Light Mode",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            style: {
                                                                position: "relative",
                                                                top: "0px",
                                                                width: "75px"
                                                            },
                                                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_lab_ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_6___default(), {
                                                                value: "light",
                                                                size: "small",
                                                                exclusive: true,
                                                                onChange: toggleDarkMode,
                                                                "aria-label": "text alignment",
                                                                style: {
                                                                    paddingLeft: "10px",
                                                                    position: "absolute",
                                                                    top: "-1.1em"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_lab_ToggleButton__WEBPACK_IMPORTED_MODULE_5___default(), {
                                                                        value: "dark",
                                                                        "aria-label": "left aligned",
                                                                        children: "\uD83C\uDF1E"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_lab_ToggleButton__WEBPACK_IMPORTED_MODULE_5___default(), {
                                                                        value: "light",
                                                                        "aria-label": "centered",
                                                                        children: "\uD83C\uDF19"
                                                                    })
                                                                ]
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default(), {
                                                    href: "/help",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                        children: "Help"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default(), {
                                                    onClick: handleLogout,
                                                    children: "Logout"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                !walletApi && /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default(), {
                                            href: "/",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default(), {
                                                size: "large",
                                                startIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_25__.Home, {}),
                                                color: router.route == "/" ? "primary" : "secondary",
                                                style: {
                                                    marginLeft: "0.3em"
                                                },
                                                children: "Home"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default(), {
                                            href: "/play",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default(), {
                                                size: "large",
                                                startIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_25__.SportsKabaddi, {}),
                                                color: router.route.substring(0, 5) == "/play" ? "primary" : "secondary",
                                                style: {
                                                    marginLeft: "0.3em"
                                                },
                                                children: "Play"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default(), {
                                            href: "/examples",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default(), {
                                                size: "large",
                                                startIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons_CastForEducation__WEBPACK_IMPORTED_MODULE_21___default(), {}),
                                                color: router.route == "/examples" ? "primary" : "secondary",
                                                style: {
                                                    marginLeft: "0.3em"
                                                },
                                                children: "Examples"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default(), {
                                            href: "/launchpad",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default(), {
                                                size: "large",
                                                startIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons_Whatshot__WEBPACK_IMPORTED_MODULE_18___default(), {}),
                                                color: router.route.substring(0, 10) == "/launchpad" ? "primary" : "secondary",
                                                style: {
                                                    marginLeft: "0.3em"
                                                },
                                                children: "Launchpad"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_12___default(), {
                                            href: "/help",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default(), {
                                                size: "large",
                                                startIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_25__.HelpOutline, {}),
                                                color: router.route == "/help" ? "primary" : "secondary",
                                                style: {
                                                    marginLeft: "0.3em"
                                                },
                                                children: "Help"
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_WalletSelector__WEBPACK_IMPORTED_MODULE_13__ /* ["default"] */ .Z, {
                                    selectedValue: wallet,
                                    open: walletOpen,
                                    onClose: handleWalletClose
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_dialogs_ImportZipDialog__WEBPACK_IMPORTED_MODULE_29__ /* ["default"] */ .Z, {
                                    open: importZipOpen,
                                    onClose: handleImportZipClose
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_dialogs_ImportBlockchainDialog__WEBPACK_IMPORTED_MODULE_30__ /* ["default"] */ .Z, {
                                    open: importBlockchainOpen,
                                    onClose: handleImportBlockchainClose
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_dialogs_NewDialog__WEBPACK_IMPORTED_MODULE_31__ /* ["default"] */ .Z, {
                                    open: newOpen,
                                    onClose: handleNewClose
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_dialogs_SaveAsDialog__WEBPACK_IMPORTED_MODULE_32__ /* ["default"] */ .Z, {
                                    open: saveAsOpen,
                                    onClose: handleSaveAsClose
                                })
                            ]
                        });
                    };
                    Header.propTypes = {
                        onWalletChange: prop_types__WEBPACK_IMPORTED_MODULE_22___default().func.isRequired,
                        onThemeChange: prop_types__WEBPACK_IMPORTED_MODULE_22___default().func.isRequired
                    };
                    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Header;
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 7149: /***/ (module1, __webpack_exports__, __nested_webpack_require_57390__)=>{
            __nested_webpack_require_57390__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    /* harmony export */ __nested_webpack_require_57390__.d(__webpack_exports__, {
                        /* harmony export */ "Z": ()=>__WEBPACK_DEFAULT_EXPORT__
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_57390__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_57390__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_57390__(8130);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_57390__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);
                    /* harmony import */ var _NestedMenuItem__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_57390__(9350);
                    /* harmony import */ var _data_launchpadList_json__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_57390__(1175);
                    /* harmony import */ var _dialogs_MintSmartAvatarDialog__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_57390__(3776);
                    /* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_57390__(1664);
                    /* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_57390__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_57390__(6689);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_57390__.n(react__WEBPACK_IMPORTED_MODULE_6__);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _dialogs_MintSmartAvatarDialog__WEBPACK_IMPORTED_MODULE_4__
                    ]);
                    _dialogs_MintSmartAvatarDialog__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
                    const LaunchpadMenuItems = (props)=>{
                        const { parentMenuOpen  } = props;
                        const { 0: mintOpen , 1: setMintOpen  } = (0, react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
                        const mintClose = ()=>{
                            setMintOpen(false);
                        };
                        const openMintDialog = (e)=>{
                            setMintOpen(true);
                            e.preventDefault();
                        };
                        let items = [];
                        for (const item of _data_launchpadList_json__WEBPACK_IMPORTED_MODULE_3__){
                            let pages = [];
                            for (const page of item.pages){
                                if (page.slug == "mint") {
                                    pages.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "#",
                                        onClick: openMintDialog,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
                                            children: page.title
                                        })
                                    }));
                                } else {
                                    pages.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "/launchpad/" + item.slug + "/" + page.slug,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
                                            children: page.title
                                        })
                                    }, page.slug));
                                }
                            }
                            items.push(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5___default(), {
                                href: "/launchpad/" + item.slug + "/about",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_NestedMenuItem__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */ .Z, {
                                    direction: "left",
                                    label: item.title,
                                    parentMenuOpen: parentMenuOpen,
                                    children: pages
                                }, "l" + item.slug)
                            }));
                        }
                        return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_dialogs_MintSmartAvatarDialog__WEBPACK_IMPORTED_MODULE_4__ /* ["default"] */ .Z, {
                                    onClose: mintClose,
                                    open: mintOpen
                                }),
                                items
                            ]
                        });
                    };
                    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = LaunchpadMenuItems;
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 5789: /***/ (module1, __webpack_exports__, __nested_webpack_require_63482__)=>{
            __nested_webpack_require_63482__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    /* harmony export */ __nested_webpack_require_63482__.d(__webpack_exports__, {
                        /* harmony export */ "Z": ()=>__WEBPACK_DEFAULT_EXPORT__
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_63482__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_63482__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_63482__(7673);
                    /* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_63482__(8442);
                    /* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_63482__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_63482__(6689);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_63482__.n(react__WEBPACK_IMPORTED_MODULE_3__);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_63482__(8308);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_63482__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
                    /* harmony import */ var _WalletContext__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_63482__(9930);
                    /* harmony import */ var _utils_Api__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_63482__(3861);
                    /* harmony import */ var _utils_Api__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_63482__.n(_utils_Api__WEBPACK_IMPORTED_MODULE_6__);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _Header__WEBPACK_IMPORTED_MODULE_1__
                    ]);
                    _Header__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
                    const drawerWidth = 240;
                    const Main = (0, _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)("div", {
                        shouldForwardProp: (prop)=>prop !== "open"
                    })(({ theme , open  })=>({
                            flexGrow: 1,
                            // marginRight:'100px',
                            //padding: theme.spacing(3),
                            transition: theme.transitions.create("margin", {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.leavingScreen
                            }),
                            marginLeft: `-${drawerWidth}px`,
                            ...open && {
                                transition: theme.transitions.create("margin", {
                                    easing: theme.transitions.easing.easeOut,
                                    duration: theme.transitions.duration.enteringScreen
                                }),
                                marginLeft: 0
                            }
                        }));
                    const Layout = ({ children  })=>{
                        const { 0: walletState , 1: setWalletState  } = (0, react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
                        const { 0: themeState , 1: setThemeState  } = (0, react__WEBPACK_IMPORTED_MODULE_3__.useState)("light");
                        const { 0: open , 1: setOpen  } = (0, react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
                        // TODO XXX This is where you define the theme
                        const lightTheme = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__.createTheme)({
                            typography: {
                                "fontFamily": "'Baloo Thambi 2', cursive",
                                "fontSize": 16,
                                "letterSpacing": "0.3em",
                                "button": {
                                    "fontSize": 18,
                                    "textTransform": "none"
                                }
                            },
                            palette: {}
                        });
                        const darkTheme = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__.createTheme)({
                            typography: {
                                "fontFamily": "'Baloo Thambi 2', cursive",
                                "fontSize": 16,
                                "button": {
                                    "fontSize": 18,
                                    "textTransform": "none"
                                }
                            },
                            palette: {
                                type: "dark",
                                primary: {
                                    main: "#ffaadd"
                                },
                                secondary: {
                                    main: "#ddccff"
                                }
                            }
                        });
                        const onWalletChange = (state)=>{
                            if (!state) {
                                return setWalletState(null);
                            }
                            state.assets = {
                                tokens: {},
                                lovelace: 0
                            };
                            setWalletState(state);
                            if (!state.api) {
                                return;
                            }
                            state.api.getUtxos().then((us)=>{
                                (0, _utils_Api__WEBPACK_IMPORTED_MODULE_6__.postData)("/loadAssets", {
                                    utxos: us
                                }).then((res)=>{
                                    if (res.status == 200) {
                                        res.json().then((body)=>{
                                            var newState = Object.assign({}, state);
                                            newState.assets = body;
                                            newState.touch = true;
                                            setWalletState(newState);
                                        });
                                    } else {
                                        state.assets = {
                                            tokens: {},
                                            lovelace: 0
                                        };
                                        setWalletState(state);
                                        console.error("Bad request");
                                    }
                                });
                            });
                        };
                        const onThemeChange = (state)=>{
                            setThemeState(state);
                        };
                        let thisTheme = themeState === "light" ? lightTheme : darkTheme;
                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                height: "100vh",
                                fontFamily: "'MuseoModerno', cursive",
                                backgroundColor: thisTheme.palette.background.default,
                                color: thisTheme.palette.text.primary
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__.ThemeProvider, {
                                theme: thisTheme,
                                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WalletContext__WEBPACK_IMPORTED_MODULE_5__ /* ["default"].Provider */ .Z.Provider, {
                                    value: walletState,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Header__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */ .Z, {
                                            onThemeChange: onThemeChange,
                                            onWalletChange: onWalletChange
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Main, {
                                            open: true,
                                            children: children
                                        })
                                    ]
                                })
                            })
                        });
                    };
                    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Layout;
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 9350: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_73231__)=>{
            // EXPORTS
            __nested_webpack_require_73231__.d(__webpack_exports__, {
                "Z": ()=>/* binding */ components_NestedMenuItem
            });
            // EXTERNAL MODULE: external "react/jsx-runtime"
            var jsx_runtime_ = __nested_webpack_require_73231__(997);
            // EXTERNAL MODULE: external "react"
            var external_react_ = __nested_webpack_require_73231__(6689);
            var external_react_default = /*#__PURE__*/ __nested_webpack_require_73231__.n(external_react_);
            // EXTERNAL MODULE: external "@material-ui/core/styles"
            var styles_ = __nested_webpack_require_73231__(8308);
            // EXTERNAL MODULE: external "@material-ui/core/Menu"
            var Menu_ = __nested_webpack_require_73231__(5986);
            var Menu_default = /*#__PURE__*/ __nested_webpack_require_73231__.n(Menu_);
            // EXTERNAL MODULE: external "@material-ui/core/MenuItem"
            var MenuItem_ = __nested_webpack_require_73231__(8250);
            var MenuItem_default = /*#__PURE__*/ __nested_webpack_require_73231__.n(MenuItem_);
            ; // CONCATENATED MODULE: external "@material-ui/icons/ArrowRight"
            const ArrowRight_namespaceObject = __webpack_require__(3757);
            var ArrowRight_default = /*#__PURE__*/ __nested_webpack_require_73231__.n(ArrowRight_namespaceObject);
            ; // CONCATENATED MODULE: external "@material-ui/icons/ArrowLeft"
            const ArrowLeft_namespaceObject = __webpack_require__(1043);
            var ArrowLeft_default = /*#__PURE__*/ __nested_webpack_require_73231__.n(ArrowLeft_namespaceObject);
            ; // CONCATENATED MODULE: external "clsx"
            const external_clsx_namespaceObject = __webpack_require__(8103);
            var external_clsx_default = /*#__PURE__*/ __nested_webpack_require_73231__.n(external_clsx_namespaceObject);
            ; // CONCATENATED MODULE: ./components/NestedMenuItem.js
            // This is copied from https://github.com/azmenak/material-ui-nested-menu-item
            // I added directionality, so that menus can open left as well as right. 
            // I've submitted a pull request to the original author:
            // https://github.com/azmenak/material-ui-nested-menu-item/pull/49
            const TRANSPARENT = "rgba(0,0,0,0)";
            const useMenuItemStyles = (0, styles_.makeStyles)((theme)=>({
                    root: (props)=>({
                            backgroundColor: props.open ? theme.palette.action.hover : TRANSPARENT
                        })
                }));
            /**
 * Use as a drop-in replacement for `<MenuItem>` when you need to add cascading
 * menu elements as children to this component.
 */ const NestedMenuItem = /*#__PURE__*/ external_react_default().forwardRef(function NestedMenuItem(props, ref) {
                const { parentMenuOpen , component ="div" , label , direction ="right" , rightIcon =/*#__PURE__*/ jsx_runtime_.jsx(ArrowRight_default(), {}) , leftIcon =/*#__PURE__*/ jsx_runtime_.jsx(ArrowLeft_default(), {}) , children , onClick , className , tabIndex: tabIndexProp , MenuProps ={} , ContainerProps: ContainerPropsProp = {} , ...MenuItemProps } = props;
                const { ref: containerRefProp , ...ContainerProps } = ContainerPropsProp;
                const menuItemRef = (0, external_react_.useRef)();
                (0, external_react_.useImperativeHandle)(ref, ()=>menuItemRef.current);
                const containerRef = (0, external_react_.useRef)();
                (0, external_react_.useImperativeHandle)(containerRefProp, ()=>containerRef.current);
                const menuContainerRef = (0, external_react_.useRef)();
                const { 0: isSubMenuOpen , 1: setIsSubMenuOpen  } = (0, external_react_.useState)(false);
                const handleMouseEnter = (event)=>{
                    setIsSubMenuOpen(true);
                    if (ContainerProps?.onMouseEnter) {
                        ContainerProps.onMouseEnter(event);
                    }
                };
                const handleMouseLeave = (event)=>{
                    setIsSubMenuOpen(false);
                    if (ContainerProps?.onMouseLeave) {
                        ContainerProps.onMouseLeave(event);
                    }
                };
                // Check if any immediate children are active
                const isSubmenuFocused = ()=>{
                    const active = containerRef.current?.ownerDocument?.activeElement;
                    for (const child of menuContainerRef.current?.children ?? []){
                        if (child === active) {
                            return true;
                        }
                    }
                    return false;
                };
                const handleFocus = (event)=>{
                    if (event.target === containerRef.current) {
                        setIsSubMenuOpen(true);
                    }
                    if (ContainerProps?.onFocus) {
                        ContainerProps.onFocus(event);
                    }
                };
                const handleKeyDown = (event)=>{
                    if (event.key === "Escape") {
                        return;
                    }
                    if (isSubmenuFocused()) {
                        event.stopPropagation();
                    }
                    const active = containerRef.current?.ownerDocument?.activeElement;
                    if (event.key === "ArrowLeft" && isSubmenuFocused()) {
                        containerRef.current?.focus();
                    }
                    if (event.key === "ArrowRight" && event.target === containerRef.current && event.target === active) {
                        const firstChild = menuContainerRef.current?.children[0];
                        firstChild?.focus();
                    }
                };
                const open = isSubMenuOpen && parentMenuOpen;
                const menuItemClasses = useMenuItemStyles({
                    open
                });
                // Root element must have a `tabIndex` attribute for keyboard navigation
                let tabIndex;
                if (!props.disabled) {
                    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
                }
                let iconStyle = {};
                const icon = rightIcon;
                if (direction == "left") {
                    iconStyle = {
                        position: "absolute",
                        left: "0px",
                        top: "10px"
                    };
                    icon = leftIcon;
                }
                return /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                    ...ContainerProps,
                    ref: containerRef,
                    onFocus: handleFocus,
                    tabIndex: tabIndex,
                    onMouseEnter: handleMouseEnter,
                    onMouseLeave: handleMouseLeave,
                    onKeyDown: handleKeyDown,
                    children: [
                        /*#__PURE__*/ (0, jsx_runtime_.jsxs)(MenuItem_default(), {
                            ...MenuItemProps,
                            className: external_clsx_default()(menuItemClasses.root, className),
                            onClick: onClick,
                            ref: menuItemRef,
                            children: [
                                label,
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    style: iconStyle,
                                    children: icon
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(Menu_default(), {
                            // Set pointer events to 'none' to prevent the invisible Popover div
                            // from capturing events for clicks and hovers
                            style: {
                                pointerEvents: "none"
                            },
                            anchorEl: menuItemRef?.current,
                            anchorOrigin: {
                                vertical: "top",
                                horizontal: direction == "right" ? "right" : "left"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: direction == "right" ? "left" : "right"
                            },
                            open: open,
                            autoFocus: false,
                            disableAutoFocus: true,
                            disableEnforceFocus: true,
                            onClose: ()=>{
                                setIsSubMenuOpen(false);
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                ref: menuContainerRef,
                                style: {
                                    pointerEvents: "auto"
                                },
                                children: children
                            })
                        })
                    ]
                });
            });
            /* harmony default export */ const components_NestedMenuItem = NestedMenuItem;
        /***/ },
        /***/ 7965: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_82691__)=>{
            /* harmony export */ __nested_webpack_require_82691__.d(__webpack_exports__, {
                /* harmony export */ "Z": ()=>__WEBPACK_DEFAULT_EXPORT__
            });
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_82691__(997);
            /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_82691__(6689);
            /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(react__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_82691__(580);
            /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
            /* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_82691__(2098);
            /* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_3__);
            /* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_82691__(5031);
            /* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__);
            /* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_82691__(6256);
            /* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5__);
            /* harmony import */ var _material_ui_core_ListItemAvatar__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_82691__(774);
            /* harmony import */ var _material_ui_core_ListItemAvatar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(_material_ui_core_ListItemAvatar__WEBPACK_IMPORTED_MODULE_6__);
            /* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_82691__(5168);
            /* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_7__);
            /* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_82691__(2400);
            /* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8__);
            /* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_9__ = __nested_webpack_require_82691__(5675);
            /* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(next_image__WEBPACK_IMPORTED_MODULE_9__);
            /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__ = __nested_webpack_require_82691__(8308);
            /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/ __nested_webpack_require_82691__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__);
            /* harmony import */ var _CustomDialog__WEBPACK_IMPORTED_MODULE_11__ = __nested_webpack_require_82691__(2710);
            const useStyles = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_10__.makeStyles)((theme)=>{
                return {
                    link: {
                        color: `${theme.palette.text.primary} !important`,
                        textDecoration: "none"
                    }
                };
            });
            // This mini-component just conditionally wraps each list item in a link if they don't have any wallets installed
            const WithLink = ({ link , children  })=>{
                const classes = useStyles();
                if (link) {
                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        className: classes.link,
                        target: "_blank",
                        href: link,
                        rel: "noopener noreferrer",
                        children: children
                    });
                } else {
                    return children;
                }
            };
            const WalletSelector = (props)=>{
                // Props
                const { onClose , selectedValue , open  } = props;
                // State
                const { 0: wallets , 1: setWallets  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)({
                    wallets: [],
                    whichWalletSelected: null
                });
                // Events
                const handleClose = ()=>{
                    onClose(selectedValue);
                };
                const handleListItemClick = (value)=>{
                    onClose(value);
                };
                const pollWallets = (count = 0)=>{
                    const wallets = [];
                    for(const key in window.cardano){
                        if (key == "ccvault") continue;
                        if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
                            wallets.push(key);
                        }
                    }
                    if (wallets.length === 0 && count < 3) {
                        setTimeout(()=>{
                            pollWallets(count + 1);
                        }, 1000);
                        return;
                    }
                    setWallets({
                        wallets,
                        whichWalletSelected: wallets[0]
                    });
                };
                // Init
                (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(pollWallets, []);
                let walletList = wallets.wallets;
                let link = false;
                if (walletList.length < 1) {
                    walletList = [
                        "flint",
                        "eternl",
                        "begin",
                        "nami",
                        "gero",
                        "typhon"
                    ];
                    link = true;
                }
                return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CustomDialog__WEBPACK_IMPORTED_MODULE_11__ /* ["default"] */ .Z, {
                    onClose: handleClose,
                    "aria-labelledby": "simple-dialog-title",
                    open: open,
                    style: {
                        borderRadius: "15px"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_8___default(), {
                            id: "simple-dialog-title",
                            children: "Choose Wallet"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_4___default(), {
                            children: walletList.map((wallet)=>{
                                let logo = null;
                                let url = null;
                                switch(wallet){
                                    case "nami":
                                        logo = "/nami.png";
                                        url = "https://namiwallet.io/";
                                        break;
                                    case "eternl":
                                        logo = "/eternl.png";
                                        url = "https://ccvault.io/";
                                        break;
                                    case "flint":
                                        logo = "/flint.jpg";
                                        url = "https://flint-wallet.com/";
                                        break;
                                    case "begin":
                                        logo = "/begin.png";
                                        url = "https://begin.is/";
                                        break;
                                    case "gero":
                                    case "gerowallet":
                                        wallet = "Gero";
                                        url = "https://gerowallet.io/";
                                        logo = "/gero.png";
                                        break;
                                    case "typhon":
                                        url = "https://typhonwallet.io/";
                                        logo = "/typhon.svg";
                                        break;
                                    case "lace":
                                        url = "https://www.lace.io/";
                                        logo = "/lace.svg";
                                        break;
                                }
                                if (!link) {
                                    url = null;
                                }
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(WithLink, {
                                    link: url,
                                    children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_5___default(), {
                                        button: true,
                                        onClick: ()=>{
                                            if (!url) handleListItemClick(wallet);
                                        },
                                        style: {
                                            paddingLeft: "3em",
                                            paddingRight: "3em"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_ListItemAvatar__WEBPACK_IMPORTED_MODULE_6___default(), {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_3___default(), {
                                                    style: {
                                                        backgroundColor: "white"
                                                    },
                                                    children: logo && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_9___default(), {
                                                        src: logo,
                                                        width: "40",
                                                        height: "40",
                                                        alt: wallet
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_7___default(), {
                                                style: {
                                                    textTransform: "capitalize"
                                                },
                                                primary: wallet
                                            })
                                        ]
                                    })
                                }, wallet);
                            })
                        })
                    ]
                });
            };
            WalletSelector.propTypes = {
                onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default().func.isRequired,
                open: prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool.isRequired,
                selectedValue: prop_types__WEBPACK_IMPORTED_MODULE_2___default().string
            };
            /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = WalletSelector;
        /***/ },
        /***/ 4490: /***/ (module1, __webpack_exports__, __nested_webpack_require_95533__)=>{
            __nested_webpack_require_95533__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    /* harmony export */ __nested_webpack_require_95533__.d(__webpack_exports__, {
                        /* harmony export */ "Z": ()=>__WEBPACK_DEFAULT_EXPORT__
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_95533__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_95533__(6689);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(react__WEBPACK_IMPORTED_MODULE_1__);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_95533__(580);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_95533__(8130);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
                    /* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_95533__(929);
                    /* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4__);
                    /* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_95533__(2400);
                    /* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__);
                    /* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_95533__(6856);
                    /* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__);
                    /* harmony import */ var react_step_wizard__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_95533__(3702);
                    /* harmony import */ var react_step_wizard__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(react_step_wizard__WEBPACK_IMPORTED_MODULE_7__);
                    /* harmony import */ var _WalletContext__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_95533__(9930);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __nested_webpack_require_95533__(8308);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__);
                    /* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__ = __nested_webpack_require_95533__(5442);
                    /* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__);
                    /* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__ = __nested_webpack_require_95533__(8146);
                    /* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__);
                    /* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12__ = __nested_webpack_require_95533__(7501);
                    /* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12__);
                    /* harmony import */ var _material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13__ = __nested_webpack_require_95533__(5871);
                    /* harmony import */ var _material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(_material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13__);
                    /* harmony import */ var _CustomDialog__WEBPACK_IMPORTED_MODULE_14__ = __nested_webpack_require_95533__(2710);
                    /* harmony import */ var _uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15__ = __nested_webpack_require_95533__(9179);
                    /* harmony import */ var _uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/ __nested_webpack_require_95533__.n(_uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15__);
                    /* harmony import */ var _codemirror_view__WEBPACK_IMPORTED_MODULE_16__ = __nested_webpack_require_95533__(4598);
                    /* harmony import */ var _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__ = __nested_webpack_require_95533__(1923);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _codemirror_view__WEBPACK_IMPORTED_MODULE_16__,
                        _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__
                    ]);
                    [_codemirror_view__WEBPACK_IMPORTED_MODULE_16__, _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__;
                    const useStyles = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__.makeStyles)((theme)=>{
                        let bgImg = "";
                        if (theme.palette.type == "dark") {
                            bgImg = `linear-gradient(rgba(15, 14, 13, 0.972),rgba(15, 14, 13, 0.972)) , url('/texture.png')`;
                        }
                        return {
                            root: {
                                paddingTop: 0,
                                paddingLeft: 0,
                                paddingRight: "0em"
                            },
                            row: {
                                display: "flex",
                                alignItems: "center"
                            },
                            closeButton: {
                                position: "relative",
                                right: "-0.4em",
                                top: "0em",
                                color: theme.palette.grey[500]
                            },
                            dialog: {
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                width: "calc(100% - 3em)",
                                maxWidth: "none !important",
                                minWidth: "600px"
                            },
                            button: {
                                fontFamily: "'Baloo Thambi 2', cursive",
                                fontWeight: 600,
                                letterSpacing: "0.02em",
                                borderRadius: "1.5em"
                            },
                            input: {
                                backgroundImage: bgImg,
                                backgroundRepeat: "repeat",
                                backgroundSize: "auto",
                                borderRadius: "15px",
                                boxShadow: theme.palette.type == "dark" ? `1px 1px 10px 5px inset rgba(0,0,0,0.4), 0px 0px 10px 1px rgba(0,0,0,0.5)` : ""
                            },
                            paper: {
                                borderRadius: "5px !important",
                                outline: "1px solid black",
                                boxShadow: "2px 2px 15px 3px rgba(0,0,0,0.4)"
                            }
                        };
                    });
                    const Step1 = ({ nextStep , onSelectTypeChange , goToStep , currentStep , handleClose  })=>{
                        const wallet = (0, react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_WalletContext__WEBPACK_IMPORTED_MODULE_8__ /* ["default"] */ .Z);
                        const { 0: selectType , 1: setSelectType  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
                        const { 0: enableNext , 1: setEnableNext  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
                        const handleChange = (e, name)=>{
                            setEnableNext(false);
                            setSelectType(name);
                            onSelectTypeChange(e, name);
                            setEnableNext(true);
                        };
                        const classes = useStyles();
                        const policies = Object.keys(wallet.assets.tokens);
                        const theme = (0, _material_ui_core__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
                        return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6___default(), {
                                    className: classes.dialog,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DialogTitle, {
                                            currentStep: currentStep,
                                            id: "customized-dialog-title",
                                            onClose: handleClose,
                                            goToStep: goToStep,
                                            children: "Select where from"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                            variant: "body1",
                                            children: "Would you like to import a token from your wallet, or any other token?"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                        "\xa0",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11___default(), {
                                            "aria-label": "type",
                                            name: "type",
                                            onChange: handleChange,
                                            children: [
                                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: classes.row,
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10___default(), {
                                                            value: "wallet",
                                                            checked: selectType == "wallet",
                                                            onChange: handleChange,
                                                            name: "type-radio"
                                                        }),
                                                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            style: {
                                                                cursor: "pointer"
                                                            },
                                                            onClick: ()=>handleChange(null, "wallet"),
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                                                    children: "My Wallet"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                                                    variant: "caption",
                                                                    children: "Import from my wallet"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: classes.row,
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10___default(), {
                                                            value: "other",
                                                            checked: selectType == "other",
                                                            onChange: handleChange,
                                                            name: "type-radio"
                                                        }),
                                                        /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            style: {
                                                                cursor: "pointer"
                                                            },
                                                            onClick: ()=>handleChange(null, "other"),
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                                                    children: "Any other token"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                                                    variant: "caption",
                                                                    children: "Specify the token by policy ID and token name"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {})
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DialogButtons, {
                                    previousStep: null,
                                    nextStep: nextStep,
                                    enableNext: enableNext
                                })
                            ]
                        });
                    };
                    const Step2 = ({ selectType , previousStep , goToStep , nextStep , currentStep , handleClose , onImportChange  })=>{
                        if (selectType == "wallet") {
                            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Step2Wallet, {
                                selectType: selectType,
                                previousStep: previousStep,
                                goToStep: goToStep,
                                nextStep: nextStep,
                                currentStep: currentStep,
                                handleClose: handleClose,
                                onImportChange: onImportChange
                            });
                        } else if (selectType == "other") {
                            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Step2Other, {
                                selectType: selectType,
                                previousStep: previousStep,
                                goToStep: goToStep,
                                nextStep: nextStep,
                                currentStep: currentStep,
                                handleClose: handleClose,
                                onImportChange: onImportChange
                            });
                        }
                    };
                    const Step2Wallet = ({ previousStep , goToStep , nextStep , currentStep , handleClose , onImportChange  })=>{
                        const theme = (0, _material_ui_core__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
                        const { 0: enableNext , 1: setEnableNext  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
                        const { 0: string , 1: setString  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
                        const { 0: fieldName , 1: setFieldName  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
                        const wallet = (0, react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_WalletContext__WEBPACK_IMPORTED_MODULE_8__ /* ["default"] */ .Z);
                        const classes = useStyles();
                        const handleStringChange = (e)=>{
                            setString(e.target.value);
                            if (e.target.value.length > 0 && fieldName?.length > 0) {
                                setEnableNext(true);
                            } else {
                                setEnableNext(false);
                            }
                        };
                        const handleFieldNameChange = (e)=>{
                            setFieldName(e.target.value);
                            if (e.target.value.length > 0 && string?.length > 0) {
                                setEnableNext(true);
                            } else {
                                setEnableNext(false);
                            }
                        };
                        const complete = ()=>{
                            onImportChange({
                                fieldName,
                                string
                            });
                            handleClose();
                        };
                        return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6___default(), {
                                    className: classes.dialog,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DialogTitle, {
                                            currentStep: currentStep,
                                            id: "customized-dialog-title",
                                            goToStep: goToStep,
                                            onClose: handleClose,
                                            children: "Enter string field"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                            variant: "body1",
                                            children: "Enter field name and a value for this field"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.TextField, {
                                            value: fieldName,
                                            style: {
                                                width: "300px"
                                            },
                                            autoFocus: true,
                                            onChange: handleFieldNameChange,
                                            label: "Field Name",
                                            variant: "outlined"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.TextField, {
                                            value: string,
                                            style: {
                                                width: "300px"
                                            },
                                            autoFocus: true,
                                            onChange: handleStringChange,
                                            label: "Value",
                                            variant: "outlined"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {})
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DialogButtons, {
                                    previousStep: previousStep,
                                    nextStep: complete,
                                    nextStepLabel: "Add",
                                    enableNext: enableNext
                                })
                            ]
                        });
                    };
                    const Step2Other = ({ previousStep , goToStep , nextStep , currentStep , handleClose , onImportChange  })=>{
                        const theme = (0, _material_ui_core__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
                        const { 0: enableNext , 1: setEnableNext  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
                        const { 0: json , 1: setJSON  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)("{\n\n}");
                        const { 0: fieldName , 1: setFieldName  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
                        const wallet = (0, react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_WalletContext__WEBPACK_IMPORTED_MODULE_8__ /* ["default"] */ .Z);
                        const classes = useStyles();
                        const handleJSONChange = (e)=>{
                            setJSON(e);
                            let parsed = true;
                            try {
                                JSON.parse(e);
                            } catch (ex) {
                                parsed = false;
                            }
                            if (e.length > 0 && fieldName?.length > 0 && parsed) {
                                setEnableNext(true);
                            } else {
                                setEnableNext(false);
                            }
                        };
                        const handleFieldNameChange = (e)=>{
                            setFieldName(e.target.value);
                            if (e.target.value.length > 0 && json?.length > 0) {
                                setEnableNext(true);
                            } else {
                                setEnableNext(false);
                            }
                        };
                        const complete = ()=>{
                            onImportChange({
                                fieldName,
                                json
                            });
                            handleClose();
                        };
                        return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6___default(), {
                                    className: classes.dialog,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DialogTitle, {
                                            currentStep: currentStep,
                                            id: "customized-dialog-title",
                                            goToStep: goToStep,
                                            onClose: handleClose,
                                            children: "Enter JSON field"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                            variant: "body1",
                                            children: "Enter field name and a value for this field"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                        "\xa0",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.TextField, {
                                            value: fieldName,
                                            style: {
                                                width: "500px"
                                            },
                                            autoFocus: true,
                                            onChange: handleFieldNameChange,
                                            label: "Field Name",
                                            variant: "outlined"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                        "\xa0",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15___default(), {
                                            editable: true,
                                            value: json,
                                            style: {
                                                outline: "1px solid rgba(0,0,0,0.3)"
                                            },
                                            height: "inherit",
                                            theme: theme.palette.type,
                                            extensions: [
                                                _codemirror_view__WEBPACK_IMPORTED_MODULE_16__.EditorView.lineWrapping,
                                                (0, _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__.javascript)({
                                                    json: true
                                                })
                                            ],
                                            onChange: handleJSONChange
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {})
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(DialogButtons, {
                                    previousStep: previousStep,
                                    nextStep: complete,
                                    nextStepLabel: "Add",
                                    enableNext: enableNext
                                })
                            ]
                        });
                    };
                    const DialogButtons = ({ previousStep , nextStep , enableNext , nextStepLabel  })=>{
                        const theme = (0, _material_ui_core__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
                        const classes = useStyles();
                        return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4___default(), {
                            sx: {
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary
                            },
                            children: [
                                previousStep && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                    size: "large",
                                    className: classes.button,
                                    onClick: previousStep,
                                    children: "Previous"
                                }),
                                nextStep && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                    size: "large",
                                    endIcon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13___default(), {}),
                                    disabled: !enableNext,
                                    className: classes.button,
                                    variant: "contained",
                                    onClick: nextStep,
                                    autoFocus: true,
                                    color: "secondary",
                                    children: nextStepLabel ? nextStepLabel : "Next"
                                })
                            ]
                        });
                    };
                    const DialogTitle = (props)=>{
                        const classes = useStyles();
                        const { children , currentStep , goToStep , onClose , ...other } = props;
                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default(), {
                            disableTypography: true,
                            ...other,
                            className: classes.root,
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                style: {
                                    display: "flex",
                                    paddingRight: "-4em",
                                    justifyContent: "space-between"
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            flexGrow: 1
                                        },
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                            variant: "h6",
                                            children: children
                                        })
                                    }),
                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        style: {
                                            position: "relative",
                                            top: "-0.4em"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10___default(), {
                                                onChange: (e)=>{
                                                    if (e.target.checked) {
                                                        goToStep(1);
                                                    }
                                                },
                                                checked: currentStep == 1,
                                                disabled: !(currentStep >= 1)
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10___default(), {
                                                onChange: (e)=>{
                                                    if (e.target.checked) {
                                                        goToStep(2);
                                                    }
                                                },
                                                checked: currentStep == 2,
                                                disabled: !(currentStep >= 2)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        style: {
                                            position: "relative",
                                            "top": "-0.5em",
                                            "right": "-0.5em"
                                        },
                                        children: onClose ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
                                            "aria-label": "close",
                                            onClick: onClose,
                                            className: classes.closeButton,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12___default(), {})
                                        }) : null
                                    })
                                ]
                            })
                        });
                    };
                    const ImportBlockchainDialog = (props)=>{
                        const { onClose , open , onImportChange  } = props;
                        const { 0: selectType , 1: setSelectType  } = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
                        const theme = (0, _material_ui_core__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
                        const classes = useStyles();
                        const handleClose = (_, reason)=>{
                            onClose(null);
                            if (reason !== "backdropClick") {}
                        };
                        const onSelectTypeChange = (e, val)=>{
                            setSelectType(val);
                        };
                        const importChange = (change)=>{
                            onImportChange(change);
                        };
                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_CustomDialog__WEBPACK_IMPORTED_MODULE_14__ /* ["default"] */ .Z, {
                                onClose: handleClose,
                                "aria-labelledby": "simple-dialog-title",
                                open: open,
                                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_step_wizard__WEBPACK_IMPORTED_MODULE_7___default(), {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Step1, {
                                            onSelectTypeChange: onSelectTypeChange,
                                            handleClose: handleClose
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Step2, {
                                            selectType: selectType,
                                            onImportChange: importChange,
                                            handleClose: handleClose
                                        })
                                    ]
                                })
                            })
                        });
                    };
                    ImportBlockchainDialog.propTypes = {
                        open: prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool.isRequired,
                        onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default().func.isRequired,
                        onImportChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default().func.isRequired
                    };
                    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ImportBlockchainDialog;
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 5027: /***/ (module1, __webpack_exports__, __nested_webpack_require_135926__)=>{
            __nested_webpack_require_135926__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    /* harmony export */ __nested_webpack_require_135926__.d(__webpack_exports__, {
                        /* harmony export */ "Z": ()=>__WEBPACK_DEFAULT_EXPORT__
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_135926__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_135926__(6689);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(react__WEBPACK_IMPORTED_MODULE_1__);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_135926__(580);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_135926__(8130);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
                    /* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_135926__(929);
                    /* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4__);
                    /* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_135926__(2400);
                    /* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__);
                    /* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_135926__(6856);
                    /* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__);
                    /* harmony import */ var react_step_wizard__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_135926__(3702);
                    /* harmony import */ var react_step_wizard__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(react_step_wizard__WEBPACK_IMPORTED_MODULE_7__);
                    /* harmony import */ var _WalletContext__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_135926__(9930);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __nested_webpack_require_135926__(8308);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__);
                    /* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__ = __nested_webpack_require_135926__(5442);
                    /* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__);
                    /* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__ = __nested_webpack_require_135926__(8146);
                    /* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__);
                    /* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12__ = __nested_webpack_require_135926__(7501);
                    /* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12__);
                    /* harmony import */ var _material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13__ = __nested_webpack_require_135926__(5871);
                    /* harmony import */ var _material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(_material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13__);
                    /* harmony import */ var _CustomDialog__WEBPACK_IMPORTED_MODULE_14__ = __nested_webpack_require_135926__(2710);
                    /* harmony import */ var _uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15__ = __nested_webpack_require_135926__(9179);
                    /* harmony import */ var _uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/ __nested_webpack_require_135926__.n(_uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15__);
                    /* harmony import */ var _codemirror_view__WEBPACK_IMPORTED_MODULE_16__ = __nested_webpack_require_135926__(4598);
                    /* harmony import */ var _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__ = __nested_webpack_require_135926__(1923);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _codemirror_view__WEBPACK_IMPORTED_MODULE_16__,
                        _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__
                    ]);
                    [_codemirror_view__WEBPACK_IMPORTED_MODULE_16__, _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__;
                    const useStyles = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__.makeStyles)((theme)=>{
                        let bgImg = "";
                        if (theme.palette.type == "dark") {
                            bgImg = `linear-gradient(rgba(15, 14, 13, 0.972),rgba(15, 14, 13, 0.972)) , url('/texture.png')`;
                        }
                        return {
                            root: {
                                paddingTop: 0,
                                paddingLeft: 0,
                                paddingRight: "0em"
                            },
                            row: {
                                display: "flex",
                                alignItems: "center"
                            },
                            closeButton: {
                                position: "relative",
                                right: "-0.4em",
                                top: "0em",
                                color: theme.palette.grey[500]
                            },
                            dialog: {
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                width: "calc(100% - 3em)",
                                maxWidth: "none !important",
                                minWidth: "600px"
                            },
                            button: {
                                fontFamily: "'Baloo Thambi 2', cursive",
                                fontWeight: 600,
                                letterSpacing: "0.02em",
                                borderRadius: "1.5em"
                            },
                            input: {
                                backgroundImage: bgImg,
                                backgroundRepeat: "repeat",
                                backgroundSize: "auto",
                                borderRadius: "15px",
                                boxShadow: theme.palette.type == "dark" ? `1px 1px 10px 5px inset rgba(0,0,0,0.4), 0px 0px 10px 1px rgba(0,0,0,0.5)` : ""
                            },
                            paper: {
                                borderRadius: "5px !important",
                                outline: "1px solid black",
                                boxShadow: "2px 2px 15px 3px rgba(0,0,0,0.4)"
                            }
                        };
                    });
                    const ImportZipDialog = (props)=>{
                        const { onClose , open  } = props;
                        const theme = (0, _material_ui_core__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
                        const classes = useStyles();
                        const handleClose = (_, reason)=>{
                            onClose(null);
                            if (reason !== "backdropClick") {}
                        };
                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CustomDialog__WEBPACK_IMPORTED_MODULE_14__ /* ["default"] */ .Z, {
                                onClose: handleClose,
                                "aria-labelledby": "simple-dialog-title",
                                open: open,
                                children: [
                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6___default(), {
                                        sx: {
                                            backgroundColor: theme.palette.background.paper,
                                            color: theme.palette.text.primary
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default(), {
                                                disableTypography: true,
                                                className: classes.root,
                                                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    style: {
                                                        display: "flex",
                                                        paddingRight: "-4em",
                                                        justifyContent: "space-between"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            style: {
                                                                flexGrow: 1
                                                            },
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                                                variant: "h6",
                                                                children: "Import Zip"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            style: {
                                                                position: "relative",
                                                                "top": "-0.5em",
                                                                "right": "-0.5em"
                                                            },
                                                            children: onClose ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
                                                                "aria-label": "close",
                                                                onClick: onClose,
                                                                className: classes.closeButton,
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12___default(), {})
                                                            }) : null
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                                variant: "h1",
                                                children: "Drop file here"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {})
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4___default(), {
                                        sx: {
                                            backgroundColor: theme.palette.background.paper,
                                            color: theme.palette.text.primary
                                        },
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                            onClick: handleClose,
                                            children: "Close"
                                        })
                                    })
                                ]
                            })
                        });
                    };
                    ImportZipDialog.propTypes = {
                        open: prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool.isRequired,
                        onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default().func.isRequired
                    };
                    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ImportZipDialog;
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 7203: /***/ (module1, __webpack_exports__, __nested_webpack_require_151076__)=>{
            __nested_webpack_require_151076__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    /* harmony export */ __nested_webpack_require_151076__.d(__webpack_exports__, {
                        /* harmony export */ "Z": ()=>__WEBPACK_DEFAULT_EXPORT__
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_151076__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_151076__(6689);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(react__WEBPACK_IMPORTED_MODULE_1__);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_151076__(580);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_151076__(8130);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
                    /* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_151076__(929);
                    /* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4__);
                    /* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_151076__(2400);
                    /* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__);
                    /* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_151076__(6856);
                    /* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__);
                    /* harmony import */ var react_step_wizard__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_151076__(3702);
                    /* harmony import */ var react_step_wizard__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(react_step_wizard__WEBPACK_IMPORTED_MODULE_7__);
                    /* harmony import */ var _WalletContext__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_151076__(9930);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __nested_webpack_require_151076__(8308);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__);
                    /* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__ = __nested_webpack_require_151076__(5442);
                    /* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__);
                    /* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__ = __nested_webpack_require_151076__(8146);
                    /* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__);
                    /* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12__ = __nested_webpack_require_151076__(7501);
                    /* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12__);
                    /* harmony import */ var _material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13__ = __nested_webpack_require_151076__(5871);
                    /* harmony import */ var _material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(_material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13__);
                    /* harmony import */ var _CustomDialog__WEBPACK_IMPORTED_MODULE_14__ = __nested_webpack_require_151076__(2710);
                    /* harmony import */ var _uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15__ = __nested_webpack_require_151076__(9179);
                    /* harmony import */ var _uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/ __nested_webpack_require_151076__.n(_uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15__);
                    /* harmony import */ var _codemirror_view__WEBPACK_IMPORTED_MODULE_16__ = __nested_webpack_require_151076__(4598);
                    /* harmony import */ var _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__ = __nested_webpack_require_151076__(1923);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _codemirror_view__WEBPACK_IMPORTED_MODULE_16__,
                        _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__
                    ]);
                    [_codemirror_view__WEBPACK_IMPORTED_MODULE_16__, _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__;
                    const useStyles = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__.makeStyles)((theme)=>{
                        let bgImg = "";
                        if (theme.palette.type == "dark") {
                            bgImg = `linear-gradient(rgba(15, 14, 13, 0.972),rgba(15, 14, 13, 0.972)) , url('/texture.png')`;
                        }
                        return {
                            root: {
                                paddingTop: 0,
                                paddingLeft: 0,
                                paddingRight: "0em"
                            },
                            row: {
                                display: "flex",
                                alignItems: "center"
                            },
                            closeButton: {
                                position: "relative",
                                right: "-0.4em",
                                top: "0em",
                                color: theme.palette.grey[500]
                            },
                            dialog: {
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                width: "calc(100% - 3em)",
                                maxWidth: "none !important",
                                minWidth: "600px"
                            },
                            button: {
                                fontFamily: "'Baloo Thambi 2', cursive",
                                fontWeight: 600,
                                letterSpacing: "0.02em",
                                borderRadius: "1.5em"
                            },
                            input: {
                                backgroundImage: bgImg,
                                backgroundRepeat: "repeat",
                                backgroundSize: "auto",
                                borderRadius: "15px",
                                boxShadow: theme.palette.type == "dark" ? `1px 1px 10px 5px inset rgba(0,0,0,0.4), 0px 0px 10px 1px rgba(0,0,0,0.5)` : ""
                            },
                            paper: {
                                borderRadius: "5px !important",
                                outline: "1px solid black",
                                boxShadow: "2px 2px 15px 3px rgba(0,0,0,0.4)"
                            }
                        };
                    });
                    const NewDialog = (props)=>{
                        const { onClose , open  } = props;
                        const theme = (0, _material_ui_core__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
                        const classes = useStyles();
                        const handleClose = (_, reason)=>{
                            onClose(null);
                            if (reason !== "backdropClick") {}
                        };
                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CustomDialog__WEBPACK_IMPORTED_MODULE_14__ /* ["default"] */ .Z, {
                                onClose: handleClose,
                                "aria-labelledby": "simple-dialog-title",
                                open: open,
                                children: [
                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6___default(), {
                                        sx: {
                                            backgroundColor: theme.palette.background.paper,
                                            color: theme.palette.text.primary
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default(), {
                                                disableTypography: true,
                                                className: classes.root,
                                                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    style: {
                                                        display: "flex",
                                                        paddingRight: "-4em",
                                                        justifyContent: "space-between"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            style: {
                                                                flexGrow: 1
                                                            },
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                                                variant: "h6",
                                                                children: "New Project"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            style: {
                                                                position: "relative",
                                                                "top": "-0.5em",
                                                                "right": "-0.5em"
                                                            },
                                                            children: onClose ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
                                                                "aria-label": "close",
                                                                onClick: onClose,
                                                                className: classes.closeButton,
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12___default(), {})
                                                            }) : null
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                                variant: "h6",
                                                children: "Enter project name"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {})
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4___default(), {
                                        sx: {
                                            backgroundColor: theme.palette.background.paper,
                                            color: theme.palette.text.primary
                                        },
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                            onClick: handleClose,
                                            children: "Close"
                                        })
                                    })
                                ]
                            })
                        });
                    };
                    NewDialog.propTypes = {
                        open: prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool.isRequired,
                        onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default().func.isRequired
                    };
                    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = NewDialog;
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 3872: /***/ (module1, __webpack_exports__, __nested_webpack_require_166213__)=>{
            __nested_webpack_require_166213__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    /* harmony export */ __nested_webpack_require_166213__.d(__webpack_exports__, {
                        /* harmony export */ "Z": ()=>__WEBPACK_DEFAULT_EXPORT__
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_166213__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_166213__(6689);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(react__WEBPACK_IMPORTED_MODULE_1__);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_166213__(580);
                    /* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_166213__(8130);
                    /* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
                    /* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_166213__(929);
                    /* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4__);
                    /* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_166213__(2400);
                    /* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5__);
                    /* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_166213__(6856);
                    /* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6__);
                    /* harmony import */ var react_step_wizard__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_166213__(3702);
                    /* harmony import */ var react_step_wizard__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(react_step_wizard__WEBPACK_IMPORTED_MODULE_7__);
                    /* harmony import */ var _WalletContext__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_166213__(9930);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __nested_webpack_require_166213__(8308);
                    /* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__);
                    /* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__ = __nested_webpack_require_166213__(5442);
                    /* harmony import */ var _material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(_material_ui_core_Radio__WEBPACK_IMPORTED_MODULE_10__);
                    /* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__ = __nested_webpack_require_166213__(8146);
                    /* harmony import */ var _material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(_material_ui_core_RadioGroup__WEBPACK_IMPORTED_MODULE_11__);
                    /* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12__ = __nested_webpack_require_166213__(7501);
                    /* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12__);
                    /* harmony import */ var _material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13__ = __nested_webpack_require_166213__(5871);
                    /* harmony import */ var _material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(_material_ui_icons_ArrowForward__WEBPACK_IMPORTED_MODULE_13__);
                    /* harmony import */ var _CustomDialog__WEBPACK_IMPORTED_MODULE_14__ = __nested_webpack_require_166213__(2710);
                    /* harmony import */ var _uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15__ = __nested_webpack_require_166213__(9179);
                    /* harmony import */ var _uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/ __nested_webpack_require_166213__.n(_uiw_react_codemirror__WEBPACK_IMPORTED_MODULE_15__);
                    /* harmony import */ var _codemirror_view__WEBPACK_IMPORTED_MODULE_16__ = __nested_webpack_require_166213__(4598);
                    /* harmony import */ var _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__ = __nested_webpack_require_166213__(1923);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _codemirror_view__WEBPACK_IMPORTED_MODULE_16__,
                        _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__
                    ]);
                    [_codemirror_view__WEBPACK_IMPORTED_MODULE_16__, _codemirror_lang_javascript__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__;
                    const useStyles = (0, _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__.makeStyles)((theme)=>{
                        let bgImg = "";
                        if (theme.palette.type == "dark") {
                            bgImg = `linear-gradient(rgba(15, 14, 13, 0.972),rgba(15, 14, 13, 0.972)) , url('/texture.png')`;
                        }
                        return {
                            root: {
                                paddingTop: 0,
                                paddingLeft: 0,
                                paddingRight: "0em"
                            },
                            row: {
                                display: "flex",
                                alignItems: "center"
                            },
                            closeButton: {
                                position: "relative",
                                right: "-0.4em",
                                top: "0em",
                                color: theme.palette.grey[500]
                            },
                            dialog: {
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                width: "calc(100% - 3em)",
                                maxWidth: "none !important",
                                minWidth: "600px"
                            },
                            button: {
                                fontFamily: "'Baloo Thambi 2', cursive",
                                fontWeight: 600,
                                letterSpacing: "0.02em",
                                borderRadius: "1.5em"
                            },
                            input: {
                                backgroundImage: bgImg,
                                backgroundRepeat: "repeat",
                                backgroundSize: "auto",
                                borderRadius: "15px",
                                boxShadow: theme.palette.type == "dark" ? `1px 1px 10px 5px inset rgba(0,0,0,0.4), 0px 0px 10px 1px rgba(0,0,0,0.5)` : ""
                            },
                            paper: {
                                borderRadius: "5px !important",
                                outline: "1px solid black",
                                boxShadow: "2px 2px 15px 3px rgba(0,0,0,0.4)"
                            }
                        };
                    });
                    const SaveAsDialog = (props)=>{
                        const { onClose , open  } = props;
                        const theme = (0, _material_ui_core__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
                        const classes = useStyles();
                        const handleClose = (_, reason)=>{
                            onClose(null);
                            if (reason !== "backdropClick") {}
                        };
                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_CustomDialog__WEBPACK_IMPORTED_MODULE_14__ /* ["default"] */ .Z, {
                                onClose: handleClose,
                                "aria-labelledby": "simple-dialog-title",
                                open: open,
                                children: [
                                    /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_6___default(), {
                                        sx: {
                                            backgroundColor: theme.palette.background.paper,
                                            color: theme.palette.text.primary
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_5___default(), {
                                                disableTypography: true,
                                                className: classes.root,
                                                children: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    style: {
                                                        display: "flex",
                                                        paddingRight: "-4em",
                                                        justifyContent: "space-between"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            style: {
                                                                flexGrow: 1
                                                            },
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                                                variant: "h6",
                                                                children: "Save as..."
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            style: {
                                                                position: "relative",
                                                                "top": "-0.5em",
                                                                "right": "-0.5em"
                                                            },
                                                            children: onClose ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
                                                                "aria-label": "close",
                                                                onClick: onClose,
                                                                className: classes.closeButton,
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_12___default(), {})
                                                            }) : null
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                                variant: "h6",
                                                children: "Enter project name"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {})
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_4___default(), {
                                        sx: {
                                            backgroundColor: theme.palette.background.paper,
                                            color: theme.palette.text.primary
                                        },
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                            onClick: handleClose,
                                            children: "Close"
                                        })
                                    })
                                ]
                            })
                        });
                    };
                    SaveAsDialog.propTypes = {
                        open: prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool.isRequired,
                        onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default().func.isRequired
                    };
                    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = SaveAsDialog;
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 8510: /***/ (module1, __webpack_exports__, __nested_webpack_require_181358__)=>{
            __nested_webpack_require_181358__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    __nested_webpack_require_181358__.r(__webpack_exports__);
                    /* harmony export */ __nested_webpack_require_181358__.d(__webpack_exports__, {
                        /* harmony export */ "default": ()=>__WEBPACK_DEFAULT_EXPORT__
                    });
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_181358__(997);
                    /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __nested_webpack_require_181358__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
                    /* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_181358__(5789);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_181358__(6689);
                    /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __nested_webpack_require_181358__.n(react__WEBPACK_IMPORTED_MODULE_2__);
                    /* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_181358__(7544);
                    /* harmony import */ var next_page_transitions__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_181358__(205);
                    /* harmony import */ var next_page_transitions__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __nested_webpack_require_181358__.n(next_page_transitions__WEBPACK_IMPORTED_MODULE_4__);
                    /* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_181358__(9069);
                    /* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __nested_webpack_require_181358__.n(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_5__);
                    /* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_181358__(1853);
                    /* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __nested_webpack_require_181358__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
                    /* harmony import */ var nextjs_google_analytics__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_181358__(989);
                    /* harmony import */ var nextjs_google_analytics__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __nested_webpack_require_181358__.n(nextjs_google_analytics__WEBPACK_IMPORTED_MODULE_7__);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        _components_Layout__WEBPACK_IMPORTED_MODULE_1__
                    ]);
                    _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
                    // requires a loader
                    class ErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_2___default().Component {
                        constructor(props){
                            super(props);
                            this.state = {
                                hasError: false
                            };
                        }
                        static getDerivedStateFromError(error) {
                            return {
                                hasError: true
                            };
                        }
                        componentDidCatch(error, info) {
                            console.error([
                                error,
                                info.componentStack
                            ]);
                        }
                        render() {
                            //if (this.state.hasError) {
                            // You can render any custom fallback UI
                            // return this.props.fallback;
                            // }
                            return this.props.children;
                        }
                    }
                    const TIMEOUT = 400;
                    function CIP54Playground({ Component , pageProps  }) {
                        const router = (0, next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
                        //console.log("%c Ignore cardano serialization lib errors, it likes to throw them. ","background: lightgreen; color: black;")
                        return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(nextjs_google_analytics__WEBPACK_IMPORTED_MODULE_7__.GoogleAnalytics, {
                                    trackPageViews: true
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ErrorBoundary, {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_1__ /* ["default"] */ .Z, {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_page_transitions__WEBPACK_IMPORTED_MODULE_4__.PageTransition, {
                                            timeout: TIMEOUT,
                                            classNames: "page-transition",
                                            loadingComponent: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_5___default(), {}),
                                            loadingDelay: 500,
                                            loadingTimeout: {
                                                enter: TIMEOUT,
                                                exit: 0
                                            },
                                            loadingClassNames: "loading-indicator",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                                                ...pageProps
                                            }, router.route)
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("style", {
                                    children: `
          .page-transition-enter {
            opacity: 0;
            
          }
          .page-transition-enter-active {
            opacity: 1;
            
            transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity ${TIMEOUT}ms;
          }
          .loading-indicator-appear,
          .loading-indicator-enter {
            opacity: 0;
          }
          .loading-indicator-appear-active,
          .loading-indicator-enter-active {
            opacity: 1;
            transition: opacity ${TIMEOUT}ms;
          }
        `
                                })
                            ]
                        });
                    }
                    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = CIP54Playground;
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 8130: /***/ (module1)=>{
            module1.exports = __webpack_require__(8130);
        /***/ },
        /***/ 8736: /***/ (module1)=>{
            module1.exports = __webpack_require__(8736);
        /***/ },
        /***/ 2098: /***/ (module1)=>{
            module1.exports = __webpack_require__(2098);
        /***/ },
        /***/ 124: /***/ (module1)=>{
            module1.exports = __webpack_require__(124);
        /***/ },
        /***/ 2610: /***/ (module1)=>{
            module1.exports = __webpack_require__(2610);
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
        /***/ 9069: /***/ (module1)=>{
            module1.exports = __webpack_require__(9069);
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
        /***/ 3974: /***/ (module1)=>{
            module1.exports = __webpack_require__(3974);
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
        /***/ 5986: /***/ (module1)=>{
            module1.exports = __webpack_require__(5986);
        /***/ },
        /***/ 8250: /***/ (module1)=>{
            module1.exports = __webpack_require__(8250);
        /***/ },
        /***/ 5442: /***/ (module1)=>{
            module1.exports = __webpack_require__(5442);
        /***/ },
        /***/ 8146: /***/ (module1)=>{
            module1.exports = __webpack_require__(8146);
        /***/ },
        /***/ 5722: /***/ (module1)=>{
            module1.exports = __webpack_require__(5722);
        /***/ },
        /***/ 4104: /***/ (module1)=>{
            module1.exports = __webpack_require__(4104);
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
        /***/ 2623: /***/ (module1)=>{
            module1.exports = __webpack_require__(2623);
        /***/ },
        /***/ 7501: /***/ (module1)=>{
            module1.exports = __webpack_require__(7501);
        /***/ },
        /***/ 4176: /***/ (module1)=>{
            module1.exports = __webpack_require__(4176);
        /***/ },
        /***/ 3793: /***/ (module1)=>{
            module1.exports = __webpack_require__(3793);
        /***/ },
        /***/ 4465: /***/ (module1)=>{
            module1.exports = __webpack_require__(4465);
        /***/ },
        /***/ 8129: /***/ (module1)=>{
            module1.exports = __webpack_require__(8129);
        /***/ },
        /***/ 2648: /***/ (module1)=>{
            module1.exports = __webpack_require__(2648);
        /***/ },
        /***/ 7166: /***/ (module1)=>{
            module1.exports = __webpack_require__(7166);
        /***/ },
        /***/ 3349: /***/ (module1)=>{
            module1.exports = __webpack_require__(3349);
        /***/ },
        /***/ 8442: /***/ (module1)=>{
            module1.exports = __webpack_require__(8442);
        /***/ },
        /***/ 9179: /***/ (module1)=>{
            module1.exports = __webpack_require__(9179);
        /***/ },
        /***/ 205: /***/ (module1)=>{
            module1.exports = __webpack_require__(205);
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
        /***/ 1853: /***/ (module1)=>{
            module1.exports = __webpack_require__(1853);
        /***/ },
        /***/ 989: /***/ (module1)=>{
            module1.exports = __webpack_require__(989);
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
        /***/ 1923: /***/ (module1)=>{
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(8560)));
            ;
        /***/ },
        /***/ 4598: /***/ (module1)=>{
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(8874)));
            ;
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
        /***/ },
        /***/ 1175: /***/ (module1)=>{
            module1.exports = JSON.parse('[{"title":"Smart Life","slug":"smart-life","pages":[{"title":"About Smart Life","slug":"about","description":"About the Smart Life project","thumbnail":"smart-life-alien.png"}]},{"title":"Smart Avatars","slug":"smart-avatars","pages":[{"title":"About Smart Avatars","slug":"about","description":"About the Smart Avatars project","thumbnail":"smart-avatars.png"},{"title":"Mint Now!","slug":"mint","notInContents":true,"description":"Work in progress","thumbnail":""}]}]');
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_201374__ = __webpack_require__(7976);
    __nested_webpack_require_201374__.C(exports1);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_201374__(__nested_webpack_require_201374__.s = moduleId);
    var __webpack_exports__ = __nested_webpack_require_201374__.X(0, [
        5675,
        676,
        1664,
        7019,
        7544,
        9930,
        7921,
        1612,
        7594,
        3776,
        7969
    ], ()=>__webpack_exec__(8510));
    module.exports = __webpack_exports__;
})();


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

/***/ 8736:
/***/ ((module) => {

module.exports = require("@material-ui/core/AppBar");

/***/ }),

/***/ 2098:
/***/ ((module) => {

module.exports = require("@material-ui/core/Avatar");

/***/ }),

/***/ 124:
/***/ ((module) => {

module.exports = require("@material-ui/core/Box");

/***/ }),

/***/ 2610:
/***/ ((module) => {

module.exports = require("@material-ui/core/Button");

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

/***/ 9069:
/***/ ((module) => {

module.exports = require("@material-ui/core/CircularProgress");

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

/***/ 3974:
/***/ ((module) => {

module.exports = require("@material-ui/core/IconButton");

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

/***/ 5986:
/***/ ((module) => {

module.exports = require("@material-ui/core/Menu");

/***/ }),

/***/ 8250:
/***/ ((module) => {

module.exports = require("@material-ui/core/MenuItem");

/***/ }),

/***/ 5442:
/***/ ((module) => {

module.exports = require("@material-ui/core/Radio");

/***/ }),

/***/ 8146:
/***/ ((module) => {

module.exports = require("@material-ui/core/RadioGroup");

/***/ }),

/***/ 5722:
/***/ ((module) => {

module.exports = require("@material-ui/core/Toolbar");

/***/ }),

/***/ 4104:
/***/ ((module) => {

module.exports = require("@material-ui/core/Typography");

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

/***/ 1043:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowLeft");

/***/ }),

/***/ 3757:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowRight");

/***/ }),

/***/ 2879:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowUpward");

/***/ }),

/***/ 2623:
/***/ ((module) => {

module.exports = require("@material-ui/icons/CastForEducation");

/***/ }),

/***/ 7501:
/***/ ((module) => {

module.exports = require("@material-ui/icons/Close");

/***/ }),

/***/ 4176:
/***/ ((module) => {

module.exports = require("@material-ui/icons/Menu");

/***/ }),

/***/ 3793:
/***/ ((module) => {

module.exports = require("@material-ui/icons/Power");

/***/ }),

/***/ 4465:
/***/ ((module) => {

module.exports = require("@material-ui/icons/Whatshot");

/***/ }),

/***/ 8129:
/***/ ((module) => {

module.exports = require("@material-ui/lab/Autocomplete");

/***/ }),

/***/ 2648:
/***/ ((module) => {

module.exports = require("@material-ui/lab/ToggleButton");

/***/ }),

/***/ 7166:
/***/ ((module) => {

module.exports = require("@material-ui/lab/ToggleButtonGroup");

/***/ }),

/***/ 3349:
/***/ ((module) => {

module.exports = require("@material-ui/styles");

/***/ }),

/***/ 8442:
/***/ ((module) => {

module.exports = require("@mui/material/styles");

/***/ }),

/***/ 9179:
/***/ ((module) => {

module.exports = require("@uiw/react-codemirror");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 8103:
/***/ ((module) => {

module.exports = require("clsx");

/***/ }),

/***/ 205:
/***/ ((module) => {

module.exports = require("next-page-transitions");

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

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 989:
/***/ ((module) => {

module.exports = require("nextjs-google-analytics");

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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [598,501,976], () => (__webpack_exec__(8510)));
module.exports = __webpack_exports__;

})();