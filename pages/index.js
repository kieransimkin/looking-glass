"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 3678:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


(()=>{
    var exports = {};
    exports.id = 5405;
    exports.ids = [
        5405
    ];
    exports.modules = {
        /***/ 2018: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_203__)=>{
            // ESM COMPAT FLAG
            __nested_webpack_require_203__.r(__webpack_exports__);
            // EXPORTS
            __nested_webpack_require_203__.d(__webpack_exports__, {
                "default": ()=>/* binding */ Home
            });
            // EXTERNAL MODULE: external "react/jsx-runtime"
            var jsx_runtime_ = __nested_webpack_require_203__(997);
            // EXTERNAL MODULE: external "next/head"
            var head_ = __nested_webpack_require_203__(968);
            var head_default = /*#__PURE__*/ __nested_webpack_require_203__.n(head_);
            // EXTERNAL MODULE: ./components/WalletContext.js
            var WalletContext = __nested_webpack_require_203__(9930);
            // EXTERNAL MODULE: external "@material-ui/core"
            var core_ = __nested_webpack_require_203__(8130);
            // EXTERNAL MODULE: external "@material-ui/core/styles"
            var styles_ = __nested_webpack_require_203__(8308);
            // EXTERNAL MODULE: external "@material-ui/core/styles/colorManipulator"
            var colorManipulator_ = __nested_webpack_require_203__(4628);
            ; // CONCATENATED MODULE: external "@material-ui/icons/Pause"
            const Pause_namespaceObject = __webpack_require__(8791);
            var Pause_default = /*#__PURE__*/ __nested_webpack_require_203__.n(Pause_namespaceObject);
            // EXTERNAL MODULE: ./node_modules/next/image.js
            var next_image = __nested_webpack_require_203__(5675);
            // EXTERNAL MODULE: ./components/VideoCard.js
            var VideoCard = __nested_webpack_require_203__(2665);
            ; // CONCATENATED MODULE: external "react-responsive-carousel"
            const external_react_responsive_carousel_namespaceObject = __webpack_require__(4508);
            // EXTERNAL MODULE: external "react"
            var external_react_ = __nested_webpack_require_203__(6689);
            // EXTERNAL MODULE: ./components/PictureCard.js
            var PictureCard = __nested_webpack_require_203__(7565);
            // EXTERNAL MODULE: external "@material-ui/core/Card"
            var Card_ = __nested_webpack_require_203__(7943);
            var Card_default = /*#__PURE__*/ __nested_webpack_require_203__.n(Card_);
            // EXTERNAL MODULE: external "prop-types"
            var external_prop_types_ = __nested_webpack_require_203__(580);
            // EXTERNAL MODULE: ./node_modules/next/link.js
            var next_link = __nested_webpack_require_203__(1664);
            var link_default = /*#__PURE__*/ __nested_webpack_require_203__.n(next_link);
            // EXTERNAL MODULE: external "@material-ui/icons"
            var icons_ = __nested_webpack_require_203__(2105);
            ; // CONCATENATED MODULE: external "@material-ui/icons/Accessibility"
            const Accessibility_namespaceObject = __webpack_require__(4793);
            var Accessibility_default = /*#__PURE__*/ __nested_webpack_require_203__.n(Accessibility_namespaceObject);
            ; // CONCATENATED MODULE: external "@material-ui/icons/AccessibilityNew"
            const AccessibilityNew_namespaceObject = __webpack_require__(7955);
            var AccessibilityNew_default = /*#__PURE__*/ __nested_webpack_require_203__.n(AccessibilityNew_namespaceObject);
            ; // CONCATENATED MODULE: ./components/ExamplesButton.js
            const useStyles = (0, styles_.makeStyles)((theme)=>{
                const first = (0, colorManipulator_.alpha)(theme.palette.primary.main, 1);
                const second = (0, colorManipulator_.alpha)(theme.palette.secondary.main, 1);
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
            const ExamplesButton = (props)=>{
                const theme = (0, core_.useTheme)();
                const classes = useStyles(props);
                return /*#__PURE__*/ jsx_runtime_.jsx(link_default(), {
                    href: "/examples",
                    children: /*#__PURE__*/ (0, jsx_runtime_.jsxs)(core_.Button, {
                        variant: "contained",
                        className: classes.root,
                        size: "large",
                        color: "secondary",
                        "aria-controls": "simple-menu",
                        "aria-haspopup": "true",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                style: {
                                    marginRight: "0.3em"
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx("big", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(icons_.CastForEducation, {})
                                })
                            }),
                            " Examples"
                        ]
                    })
                });
            };
            ExamplesButton.propTypes = {};
            /* harmony default export */ const components_ExamplesButton = ExamplesButton;
            ; // CONCATENATED MODULE: ./components/PlaygroundButton.js
            const PlaygroundButton_useStyles = (0, styles_.makeStyles)((theme)=>{
                const first = (0, colorManipulator_.alpha)(theme.palette.primary.main, 1);
                const second = (0, colorManipulator_.alpha)(theme.palette.secondary.main, 1);
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
            const PlaygroundButton = (props)=>{
                const { 0: icon , 1: setIcon  } = (0, external_react_.useState)(/*#__PURE__*/ jsx_runtime_.jsx(Accessibility_default(), {}));
                const { 0: on , 1: setOn  } = (0, external_react_.useState)(false);
                (0, external_react_.useEffect)(()=>{
                    const interval = setInterval(()=>{
                        if (on) {
                            setIcon(/*#__PURE__*/ jsx_runtime_.jsx("big", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(AccessibilityNew_default(), {})
                            }));
                            setOn(false);
                        } else {
                            setIcon(/*#__PURE__*/ jsx_runtime_.jsx("big", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(Accessibility_default(), {})
                            }));
                            setOn(true);
                        }
                    }, 500);
                    return ()=>clearInterval(interval);
                }, [
                    on
                ]);
                const theme = (0, core_.useTheme)();
                const classes = PlaygroundButton_useStyles(props);
                return /*#__PURE__*/ jsx_runtime_.jsx(link_default(), {
                    href: "/play",
                    children: /*#__PURE__*/ (0, jsx_runtime_.jsxs)(core_.Button, {
                        variant: "contained",
                        className: classes.root,
                        size: "large",
                        color: "secondary",
                        "aria-controls": "simple-menu",
                        "aria-haspopup": "true",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                style: {
                                    marginRight: "0.3em"
                                },
                                children: icon
                            }),
                            " Playground"
                        ]
                    })
                });
            };
            PlaygroundButton.propTypes = {};
            /* harmony default export */ const components_PlaygroundButton = /* unused pure expression or super */ null && 0;
            // EXTERNAL MODULE: external "@material-ui/icons/ShoppingCart"
            var ShoppingCart_ = __nested_webpack_require_203__(9637);
            var ShoppingCart_default = /*#__PURE__*/ __nested_webpack_require_203__.n(ShoppingCart_);
            ; // CONCATENATED MODULE: ./components/BigBuyButton.js
            const BigBuyButton_useStyles = (0, styles_.makeStyles)((theme)=>{
                const first = (0, colorManipulator_.alpha)(theme.palette.primary.main, 1);
                const second = (0, colorManipulator_.alpha)(theme.palette.secondary.main, 1);
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
            const BigBuyButton_PlaygroundButton = (props)=>{
                const { 0: icon , 1: setIcon  } = (0, external_react_.useState)(/*#__PURE__*/ jsx_runtime_.jsx(ShoppingCart_default(), {}));
                const { 0: on , 1: setOn  } = (0, external_react_.useState)(false);
                const theme = (0, core_.useTheme)();
                const classes = BigBuyButton_useStyles(props);
                return /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    href: "https://www.plutus.art/collection/smartlife",
                    target: "_blank",
                    rel: "noreferrer",
                    children: /*#__PURE__*/ (0, jsx_runtime_.jsxs)(core_.Button, {
                        variant: "contained",
                        className: classes.root,
                        size: "large",
                        color: "secondary",
                        "aria-controls": "simple-menu",
                        "aria-haspopup": "true",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                style: {
                                    marginRight: "0.3em"
                                },
                                children: icon
                            }),
                            " Buy One"
                        ]
                    })
                });
            };
            BigBuyButton_PlaygroundButton.propTypes = {};
            /* harmony default export */ const BigBuyButton = BigBuyButton_PlaygroundButton;
            ; // CONCATENATED MODULE: ./components/AvatarExampleButton.js
            const AvatarExampleButton_useStyles = (0, styles_.makeStyles)((theme)=>{
                const first = (0, colorManipulator_.alpha)(theme.palette.primary.main, 1);
                const second = (0, colorManipulator_.alpha)(theme.palette.secondary.main, 1);
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
            const AvatarExampleButton = (props)=>{
                const theme = (0, core_.useTheme)();
                const classes = AvatarExampleButton_useStyles(props);
                return /*#__PURE__*/ jsx_runtime_.jsx(link_default(), {
                    href: "/play/easeljs/smart-avatars",
                    children: /*#__PURE__*/ (0, jsx_runtime_.jsxs)(core_.Button, {
                        variant: "contained",
                        className: classes.root,
                        size: "large",
                        color: "secondary",
                        "aria-controls": "simple-menu",
                        "aria-haspopup": "true",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                style: {
                                    marginRight: "0.3em"
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx("big", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(icons_.CastForEducation, {})
                                })
                            }),
                            " In Action"
                        ]
                    })
                });
            };
            AvatarExampleButton.propTypes = {};
            /* harmony default export */ const components_AvatarExampleButton = AvatarExampleButton;
            ; // CONCATENATED MODULE: ./pages/index.js
            const pages_useStyles = (0, styles_.makeStyles)((theme)=>{
                const first = (0, colorManipulator_.alpha)(theme.palette.primary.main, 0.8);
                const second = (0, colorManipulator_.alpha)(theme.palette.secondary.main, 0.4);
                const darkfirst = (0, colorManipulator_.alpha)(theme.palette.primary.main, 0.2);
                const darksecond = (0, colorManipulator_.alpha)(theme.palette.secondary.main, 0.2);
                let bg = `linear-gradient(125deg, ${first} 0%, ${second} 100%),linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.9) 100%),url('/flowers.jpg') !important`;
                if (theme.palette.type == "dark") {
                    bg = `linear-gradient(120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%), url('/flowers.jpg') !important`;
                }
                let bg2 = `linear-gradient(-95deg, ${first} 0%, ${second} 100%),linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.85) 100%),url('/circuit2.png') !important`;
                if (theme.palette.type == "dark") {
                    bg2 = `linear-gradient(-120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), url('/circuit2.png') !important`;
                }
                return {
                    bigHead: {
                        textShadow: `
                    1px 1px 15px rgba(0,0,0,1), 
                    1px 1px 25px rgba(0,0,0,1),
                    0px 0px 3px rgba(0,0,0,1), 
                    1px 1px 3px rgba(0,0,0,1),
                    -1px -1px 3px rgba(0,0,0,1),
                    0px -1px 3px rgba(0,0,0,1),
                    0px 1px 3px rgba(0,0,0,1),
                    1px 0px 3px rgba(0,0,0,1),
                    -1px 0px 3px rgba(0,0,0,1)
                    `,
                        letterSpacing: "0.05em",
                        fontSize: "150px",
                        fontWeight: "900 !important"
                    },
                    subtleBigHead: {
                        wordBreak: "break-word",
                        textShadow: `
                    1px 1px 15px rgba(0,0,0,1), 
                    0px 0px 3px rgba(0,0,0,1), 
                    1px 1px 3px rgba(0,0,0,1),
                    -1px -1px 3px rgba(0,0,0,1),
                    0px -1px 3px rgba(0,0,0,1),
                    0px 1px 3px rgba(0,0,0,1),
                    1px 0px 3px rgba(0,0,0,1),
                    -1px 0px 3px rgba(0,0,0,1)
                    `,
                        letterSpacing: "0.05em",
                        fontSize: "110px",
                        fontWeight: "900 !important"
                    },
                    littleHead: {
                        textShadow: `
        1px 1px 15px rgba(0,0,0,1), 
        1px 1px 10px rgba(0,0,0,1), 
        0px 0px 3px rgba(0,0,0,1), 
        1px 1px 3px rgba(0,0,0,1),
        -1px -1px 3px rgba(0,0,0,1),
        0px -1px 3px rgba(0,0,0,1),
        0px 1px 3px rgba(0,0,0,1),
        1px 0px 3px rgba(0,0,0,1),
        -1px 0px 3px rgba(0,0,0,1)
        `,
                        letterSpacing: "0.05em",
                        fontWeight: "600 !important",
                        "& em": {
                            color: "white !important"
                        }
                    },
                    subtleLittleHead: {
                        wordBreak: "break-word",
                        textShadow: `
                    1px 1px 15px rgba(0,0,0,1), 
                    0px 0px 3px rgba(0,0,0,1), 
                    1px 1px 3px rgba(0,0,0,1),
                    -1px -1px 3px rgba(0,0,0,1),
                    0px -1px 3px rgba(0,0,0,1),
                    0px 1px 3px rgba(0,0,0,1),
                    1px 0px 3px rgba(0,0,0,1),
                    -1px 0px 3px rgba(0,0,0,1)
                    `,
                        letterSpacing: "0.05em",
                        fontWeight: "600 !important",
                        "& em": {
                            color: "white !important"
                        }
                    },
                    bg: {
                        minHeight: "100vh",
                        backgroundImage: bg,
                        backgroundSize: `cover, cover, 990px`,
                        backgroundRepeat: `no-repeat, no-repeat, repeat`,
                        top: 0,
                        left: 0,
                        right: 0,
                        minWidth: "100vw"
                    },
                    bg2: {
                        minHeight: "100vh",
                        backgroundImage: bg2,
                        backgroundSize: `cover, cover, 950px`,
                        backgroundRepeat: `no-repeat, no-repeat, repeat`,
                        top: 0,
                        left: 0,
                        right: 0,
                        minWidth: "100vw"
                    },
                    bgImageCont: {
                        width: "100vw",
                        height: "100vh",
                        top: "0px",
                        left: "0px",
                        position: "",
                        "& div": {
                            position: "unset !important"
                        }
                    },
                    bgImage: {
                        objectFit: "cover",
                        width: "100vw",
                        height: "100vh"
                    },
                    content: {
                        position: "absolute",
                        width: "100vw",
                        top: "50%",
                        textAlign: "left",
                        paddingLeft: "5em",
                        paddingRight: "5em",
                        transform: `translateY(-50%)`
                    },
                    wideContent: {
                        position: "absolute",
                        width: "100vw",
                        top: "50%",
                        textAlign: "left",
                        paddingLeft: "2em",
                        paddingRight: "2em",
                        transform: `translateY(-50%)`
                    },
                    root: {}
                };
            });
            function Home() {
                const classes = pages_useStyles();
                const { 0: autoPlay , 1: setAutoplay  } = (0, external_react_.useState)(false);
                const { 0: loadingContent , 1: setLoadingContent  } = (0, external_react_.useState)(/*#__PURE__*/ (0, jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(core_.CircularProgress, {
                            size: "1em",
                            style: {
                                position: "relative",
                                top: "0.15em",
                                marginRight: "0.3em",
                                marginLeft: "0.2em"
                            }
                        }),
                        " Loading slideshow…"
                    ]
                }));
                const { 0: currentSlide , 1: setCurrentSlide  } = (0, external_react_.useState)(0);
                const onLoad = (e)=>{
                    setAutoplay(true);
                    setLoadingContent(/*#__PURE__*/ (0, jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Pause_default(), {}),
                            " Paused…"
                        ]
                    }));
                };
                const toggleOnOff = ()=>{
                    if (!autoPlay) {
                        setCurrentSlide(currentSlide + 1);
                    }
                    setAutoplay(!autoPlay);
                };
                const updateCurrentSlide = (index)=>{
                    if (currentSlide !== index) {
                        setCurrentSlide(index);
                    }
                };
                return /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ (0, jsx_runtime_.jsxs)(head_default(), {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("title", {
                                    children: "Cardano Smart NFT Playground"
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
                        /*#__PURE__*/ (0, jsx_runtime_.jsxs)("main", {
                            className: "fullscreen",
                            children: [
                                " ",
                                /*#__PURE__*/ (0, jsx_runtime_.jsxs)(external_react_responsive_carousel_namespaceObject.Carousel, {
                                    selectedItem: currentSlide,
                                    onChange: updateCurrentSlide,
                                    autoFocus: true,
                                    showThumbs: false,
                                    showStatus: false,
                                    useKeyboardArrows: true,
                                    autoPlay: autoPlay,
                                    stopOnHover: false,
                                    infiniteLoop: true,
                                    interval: 7000,
                                    className: "presentation-mode",
                                    children: [
                                        /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                            className: "my-slide content",
                                            onClick: toggleOnOff,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: classes.bg
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: classes.wideContent + " slide-content",
                                                    children: /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                        className: "row",
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "4em",
                                                            justifyContent: "space-around"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                className: "column",
                                                                style: {
                                                                    marginLeft: "2em"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                                                        variant: "h1",
                                                                        classes: {
                                                                            root: classes.subtleBigHead
                                                                        },
                                                                        children: "Smart NFTs"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                                    /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                        className: "hiding-space",
                                                                        children: [
                                                                            "\xa0",
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {})
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                                                        variant: "h3",
                                                                        classes: {
                                                                            root: classes.subtleLittleHead
                                                                        },
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("em", {
                                                                            children: "CIP54 - a flexible framework for Javascript NFTs on Cardano"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                                    /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                        className: "hiding-space",
                                                                        children: [
                                                                            "\xa0",
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {})
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "column",
                                                                style: {
                                                                    minWidth: "40%",
                                                                    flexGrow: 1,
                                                                    marginRight: "2em"
                                                                },
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(VideoCard /* default */ .Z, {
                                                                    src: "/cubes.mp4",
                                                                    onLoad: onLoad
                                                                })
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        }, "content-1"),
                                        /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                            className: "my-slide content",
                                            onClick: toggleOnOff,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: classes.bg2
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: classes.wideContent + " slide-content",
                                                    children: /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                        className: "row",
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "4em",
                                                            justifyContent: "space-around"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "column",
                                                                style: {
                                                                    minWidth: "40%",
                                                                    maxWidth: "50%",
                                                                    marginLeft: "2em"
                                                                },
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(PictureCard /* default */ .Z, {
                                                                    src: "/examples/smart-life-thumb.png",
                                                                    alt: "Smart Life",
                                                                    width: 952,
                                                                    height: 865
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                className: "column",
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                                                        variant: "h1",
                                                                        classes: {
                                                                            root: classes.subtleBigHead
                                                                        },
                                                                        children: "Smart Life"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                                    /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                        className: "hiding-space",
                                                                        children: [
                                                                            "\xa0",
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {})
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                                                        variant: "h2",
                                                                        classes: {
                                                                            root: classes.subtleLittleHead
                                                                        },
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("em", {
                                                                            children: "The first CIP54 collection, minting now"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                                    /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                        className: "hiding-space",
                                                                        children: [
                                                                            "\xa0",
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {})
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx(BigBuyButton, {})
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        }, "content-2"),
                                        /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                            className: "my-slide content",
                                            onClick: toggleOnOff,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: classes.bg
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: classes.wideContent + " slide-content",
                                                    children: /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                        style: {
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            gap: "4em",
                                                            justifyContent: "space-around"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "column",
                                                                style: {
                                                                    minWidth: "60%",
                                                                    maxWidth: "60%",
                                                                    marginLeft: "2em"
                                                                },
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(VideoCard /* default */ .Z, {
                                                                    src: "/smart-avatar.mp4",
                                                                    onLoad: onLoad
                                                                })
                                                            }),
                                                            /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                className: "column",
                                                                style: {
                                                                    display: "flex",
                                                                    alignItems: "flex-start"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                                                                variant: "h1",
                                                                                classes: {
                                                                                    root: classes.subtleBigHead
                                                                                },
                                                                                children: "Smart Avatars"
                                                                            }),
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                                            /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                                className: "hiding-space",
                                                                                children: [
                                                                                    "\xa0",
                                                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {})
                                                                                ]
                                                                            }),
                                                                            /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                                                                variant: "h4",
                                                                                classes: {
                                                                                    root: classes.subtleLittleHead
                                                                                },
                                                                                children: /*#__PURE__*/ jsx_runtime_.jsx("em", {
                                                                                    children: "Coming soon, a demonstration of the power of CIP54"
                                                                                })
                                                                            }),
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                                            /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                                className: "hiding-space",
                                                                                children: [
                                                                                    "\xa0",
                                                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {})
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx(components_AvatarExampleButton, {})
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        }, "content-3"),
                                        /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                            className: "my-slide content",
                                            onClick: toggleOnOff,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: classes.bg2
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: classes.wideContent + " slide-content",
                                                    children: /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                        className: "row",
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "2em",
                                                            justifyContent: "space-around"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                className: "column",
                                                                style: {
                                                                    flexGrow: ""
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                                                        variant: "h1",
                                                                        classes: {
                                                                            root: classes.subtleBigHead
                                                                        },
                                                                        children: "Get Started"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                                    /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                        className: "hiding-space",
                                                                        children: [
                                                                            "\xa0",
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {})
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                                                        variant: "h2",
                                                                        classes: {
                                                                            root: classes.subtleLittleHead
                                                                        },
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("em", {
                                                                            children: "Press a button"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                                    /*#__PURE__*/ (0, jsx_runtime_.jsxs)("div", {
                                                                        className: "hiding-space",
                                                                        children: [
                                                                            "\xa0",
                                                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {})
                                                                        ]
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx(components_ExamplesButton, {})
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "column",
                                                                style: {
                                                                    minWidth: "40%",
                                                                    maxWidth: "50%"
                                                                },
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(PictureCard /* default */ .Z, {
                                                                    src: "/token-cubes-screenshot.png",
                                                                    alt: "Token cubes screenshot",
                                                                    width: 2111,
                                                                    height: 1907
                                                                })
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        }, "content-4")
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "bottom-button",
                                    style: {
                                        position: "fixed",
                                        bottom: "3em",
                                        width: "100%",
                                        textAlign: "center",
                                        transition: `opacity 0.8s ease`,
                                        opacity: autoPlay ? 0 : 1
                                    },
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(Card_default(), {
                                        style: {
                                            cursor: "pointer",
                                            width: "fit-content",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            padding: "1em",
                                            boxShadow: "2px 2px 15px 5px rgba(0,0,0,0.5)",
                                            border: "1px solid black"
                                        },
                                        onClick: toggleOnOff,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(core_.Typography, {
                                            variant: "h4",
                                            children: loadingContent
                                        })
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
        /***/ 9637: /***/ (module1)=>{
            module1.exports = __webpack_require__(9637);
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
        /***/ 9294: /***/ (module1)=>{
            module1.exports = __webpack_require__(9294);
        /***/ },
        /***/ 997: /***/ (module1)=>{
            module1.exports = __webpack_require__(997);
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_59116__ = __webpack_require__(7976);
    __nested_webpack_require_59116__.C(exports);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_59116__(__nested_webpack_require_59116__.s = moduleId);
    var __webpack_exports__ = __nested_webpack_require_59116__.X(0, [
        5675,
        676,
        1664,
        9930,
        7565,
        2665
    ], ()=>__webpack_exec__(2018));
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

/***/ 4793:
/***/ ((module) => {

module.exports = require("@material-ui/icons/Accessibility");

/***/ }),

/***/ 7955:
/***/ ((module) => {

module.exports = require("@material-ui/icons/AccessibilityNew");

/***/ }),

/***/ 4380:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowDropDown");

/***/ }),

/***/ 2089:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ArrowDropUp");

/***/ }),

/***/ 8791:
/***/ ((module) => {

module.exports = require("@material-ui/icons/Pause");

/***/ }),

/***/ 9637:
/***/ ((module) => {

module.exports = require("@material-ui/icons/ShoppingCart");

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

/***/ 4508:
/***/ ((module) => {

module.exports = require("react-responsive-carousel");

/***/ }),

/***/ 9294:
/***/ ((module) => {

module.exports = require("react-youtube");

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
var __webpack_exports__ = __webpack_require__.X(0, [501,976], () => (__webpack_exec__(3678)));
module.exports = __webpack_exports__;

})();