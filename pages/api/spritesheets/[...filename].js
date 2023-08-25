"use strict";
(() => {
var exports = {};
exports.id = 211;
exports.ids = [211];
exports.modules = {

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 8880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


(()=>{
    var exports = {};
    exports.id = 4211;
    exports.ids = [
        4211
    ];
    exports.modules = {
        /***/ 5832: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(5832);
        /***/ },
        /***/ 6689: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(6689);
        /***/ },
        /***/ 7147: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(7147);
        /***/ },
        /***/ 1017: /***/ (module1)=>{
            "use strict";
            module1.exports = __webpack_require__(1017);
        /***/ },
        /***/ 9823: /***/ (__unused_webpack_module, exports)=>{
            "use strict";
            var __webpack_unused_export__;
            __webpack_unused_export__ = {
                value: true
            };
            exports.Z = _extends;
            function _extends() {
                return extends_.apply(this, arguments);
            }
            function extends_() {
                extends_ = Object.assign || function(target) {
                    for(var i = 1; i < arguments.length; i++){
                        var source = arguments[i];
                        for(var key in source){
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };
                return extends_.apply(this, arguments);
            }
        /***/ },
        /***/ 6328: /***/ (__unused_webpack_module, exports)=>{
            "use strict";
            var __webpack_unused_export__;
            __webpack_unused_export__ = {
                value: true
            };
            exports.Z = _interopRequireDefault;
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
        /***/ },
        /***/ 8114: /***/ (module1, exports, __nested_webpack_require_2151__)=>{
            "use strict";
            "client";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports["default"] = dynamic;
            exports.noSSR = noSSR;
            var _extends = __nested_webpack_require_2151__(9823)/* ["default"] */ .Z;
            var _interop_require_default = __nested_webpack_require_2151__(6328)/* ["default"] */ .Z;
            var _react = _interop_require_default(__nested_webpack_require_2151__(6689));
            var _loadable = _interop_require_default(__nested_webpack_require_2151__(5832));
            function dynamic(dynamicOptions, options) {
                let loadableFn = _loadable.default;
                let loadableOptions = (options == null ? void 0 : options.suspense) ? {} : {
                    // A loading component is not required, so we default it
                    loading: ({ error , isLoading , pastDelay  })=>{
                        if (!pastDelay) return null;
                        if (false) {}
                        return null;
                    }
                };
                // Support for direct import(), eg: dynamic(import('../hello-world'))
                // Note that this is only kept for the edge case where someone is passing in a promise as first argument
                // The react-loadable babel plugin will turn dynamic(import('../hello-world')) into dynamic(() => import('../hello-world'))
                // To make sure we don't execute the import without rendering first
                if (dynamicOptions instanceof Promise) {
                    loadableOptions.loader = ()=>dynamicOptions;
                // Support for having import as a function, eg: dynamic(() => import('../hello-world'))
                } else if (typeof dynamicOptions === "function") {
                    loadableOptions.loader = dynamicOptions;
                // Support for having first argument being options, eg: dynamic({loader: import('../hello-world')})
                } else if (typeof dynamicOptions === "object") {
                    loadableOptions = _extends({}, loadableOptions, dynamicOptions);
                }
                // Support for passing options, eg: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})
                loadableOptions = _extends({}, loadableOptions, options);
                // Error if Fizz rendering is not enabled and `suspense` option is set to true
                if (false) {}
                if (loadableOptions.suspense) {
                    if (false) {}
                    delete loadableOptions.ssr;
                    delete loadableOptions.loading;
                }
                // coming from build/babel/plugins/react-loadable-plugin.js
                if (loadableOptions.loadableGenerated) {
                    loadableOptions = _extends({}, loadableOptions, loadableOptions.loadableGenerated);
                    delete loadableOptions.loadableGenerated;
                }
                // support for disabling server side rendering, eg: dynamic(import('../hello-world'), {ssr: false}).
                // skip `ssr` for suspense mode and opt-in React.lazy directly
                if (typeof loadableOptions.ssr === "boolean" && !loadableOptions.suspense) {
                    if (!loadableOptions.ssr) {
                        delete loadableOptions.ssr;
                        return noSSR(loadableFn, loadableOptions);
                    }
                    delete loadableOptions.ssr;
                }
                return loadableFn(loadableOptions);
            }
            "client";
            const isServerSide = "undefined" === "undefined";
            function noSSR(LoadableInitializer, loadableOptions) {
                // Removing webpack and modules means react-loadable won't try preloading
                delete loadableOptions.webpack;
                delete loadableOptions.modules;
                // This check is necessary to prevent react-loadable from initializing on the server
                if (!isServerSide) {
                    return LoadableInitializer(loadableOptions);
                }
                const Loading = loadableOptions.loading;
                // This will only be rendered on the server side
                return ()=>/*#__PURE__*/ _react.default.createElement(Loading, {
                        error: null,
                        isLoading: true,
                        pastDelay: false,
                        timedOut: false
                    });
            }
            if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
                Object.defineProperty(exports.default, "__esModule", {
                    value: true
                });
                Object.assign(exports.default, exports);
                module1.exports = exports.default;
            } //# sourceMappingURL=dynamic.js.map
        /***/ },
        /***/ 9743: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_7275__)=>{
            "use strict";
            // ESM COMPAT FLAG
            __nested_webpack_require_7275__.r(__webpack_exports__);
            // EXPORTS
            __nested_webpack_require_7275__.d(__webpack_exports__, {
                "default": ()=>/* binding */ Spritesheets
            });
            // EXTERNAL MODULE: external "react"
            var external_react_ = __nested_webpack_require_7275__(6689);
            ; // CONCATENATED MODULE: external "next/router"
            const router_namespaceObject = __webpack_require__(1853);
            // EXTERNAL MODULE: ./node_modules/next/dynamic.js
            var dynamic = __nested_webpack_require_7275__(3988);
            // EXTERNAL MODULE: external "path"
            var external_path_ = __nested_webpack_require_7275__(1017);
            var external_path_default = /*#__PURE__*/ __nested_webpack_require_7275__.n(external_path_);
            // EXTERNAL MODULE: external "fs"
            var external_fs_ = __nested_webpack_require_7275__(7147);
            var external_fs_default = /*#__PURE__*/ __nested_webpack_require_7275__.n(external_fs_);
            ; // CONCATENATED MODULE: ./pages/api/spritesheets/[...filename].js
            function Spritesheets(req, res) {
                const filename = req.url.substring(18);
                const filePath = external_path_default().join(process.cwd(), "submodules/LPC-spritesheet-collection/input/" + filename);
                var stat = external_fs_default().statSync(filePath);
                var contents = external_fs_default().createReadStream(filePath);
                res.writeHead(200, {
                    "Content-Type": "image/png",
                    "Content-Length": stat.size
                });
                contents.pipe(res);
            }
        /***/ },
        /***/ 3988: /***/ (module1, __unused_webpack_exports, __nested_webpack_require_9066__)=>{
            /* unused reexport */ __nested_webpack_require_9066__(8114);
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_9208__ = __webpack_require__(2525);
    __nested_webpack_require_9208__.C(exports);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_9208__(__nested_webpack_require_9208__.s = moduleId);
    var __webpack_exports__ = __webpack_exec__(9743);
    module.exports = __webpack_exports__;
})();


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [501,525], () => (__webpack_exec__(8880)));
module.exports = __webpack_exports__;

})();