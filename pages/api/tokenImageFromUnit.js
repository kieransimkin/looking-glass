"use strict";
(() => {
var exports = {};
exports.id = 568;
exports.ids = [568];
exports.modules = {

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 9848:
/***/ ((module) => {

module.exports = require("bech32");

/***/ }),

/***/ 803:
/***/ ((module) => {

module.exports = require("blake2b");

/***/ }),

/***/ 4269:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 4460:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
const _interopRequireWildcard = (__webpack_require__(164)/* ["default"] */ .Z);
(()=>{
    var exports1 = {};
    exports1.id = 9568;
    exports1.ids = [
        9568
    ];
    exports1.modules = {
        /***/ 9648: /***/ (module1)=>{
            module1.exports = Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(__webpack_require__(2167)));
            ;
        /***/ },
        /***/ 4460: /***/ (module1, __webpack_exports__, __nested_webpack_require_541__)=>{
            __nested_webpack_require_541__.a(module1, async (__webpack_handle_async_dependencies__, __webpack_async_result__)=>{
                try {
                    __nested_webpack_require_541__.r(__webpack_exports__);
                    /* harmony export */ __nested_webpack_require_541__.d(__webpack_exports__, {
                        /* harmony export */ "default": ()=>/* binding */ Browse
                    });
                    /* harmony import */ var _utils_NFTCDN__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_541__(2775);
                    /* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_541__(9648);
                    var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([
                        axios__WEBPACK_IMPORTED_MODULE_1__
                    ]);
                    axios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
                    async function Browse(req, res) {
                        let result = null;
                        if (req.query.size) {
                            result = (0, _utils_NFTCDN__WEBPACK_IMPORTED_MODULE_0__ /* .tokenImageFromUnit */ .g)(req.query.unit, {
                                size: req.query.size
                            });
                        } else {
                            result = (0, _utils_NFTCDN__WEBPACK_IMPORTED_MODULE_0__ /* .tokenImageFromUnit */ .g)(req.query.unit);
                        }
                        const axiosResult = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(result, {
                            responseType: "arraybuffer"
                        });
                        res.setHeader("Content-Type", axiosResult.headers["content-type"]);
                        res.status(200);
                        res.send(Buffer.from(axiosResult.data));
                    }
                    __webpack_async_result__();
                } catch (e) {
                    __webpack_async_result__(e);
                }
            });
        /***/ },
        /***/ 2775: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_2756__)=>{
            // EXPORTS
            __nested_webpack_require_2756__.d(__webpack_exports__, {
                "g": ()=>/* binding */ tokenImageFromUnit
            });
            ; // CONCATENATED MODULE: external "crypto"
            const external_crypto_namespaceObject = __webpack_require__(6113);
            var external_crypto_default = /*#__PURE__*/ __nested_webpack_require_2756__.n(external_crypto_namespaceObject);
            ; // CONCATENATED MODULE: external "url"
            const external_url_namespaceObject = __webpack_require__(4269);
            ; // CONCATENATED MODULE: external "blake2b"
            const external_blake2b_namespaceObject = __webpack_require__(803);
            var external_blake2b_default = /*#__PURE__*/ __nested_webpack_require_2756__.n(external_blake2b_namespaceObject);
            ; // CONCATENATED MODULE: external "bech32"
            const external_bech32_namespaceObject = __webpack_require__(9848);
            ; // CONCATENATED MODULE: ./utils/NFTCDN.js
            function tokenImageFromUnit(unit, params = {}) {
                if (!process.env.NFTCDN_KEY) throw new Error("Missing environment variables: NFTCDN_KEY");
                if (!unit || unit.length < 57) {
                    return null;
                }
                params.tk = "";
                const key = Buffer.from(process.env.NFTCDN_KEY, "base64");
                const policyId = Buffer.from(unit.substring(0, 56), "hex");
                const assetName = Buffer.from(unit.substring(56), "hex");
                const hashBuf = external_blake2b_default()(20)?.update(new Uint8Array([
                    ...policyId,
                    ...assetName
                ])).digest("binary");
                const words = external_bech32_namespaceObject.bech32.toWords(hashBuf);
                const bech = external_bech32_namespaceObject.bech32.encode("asset", words);
                let url = buildUrl(bech, params);
                params.tk = external_crypto_default().createHmac("sha256", key).update(url).digest("base64url");
                return buildUrl(bech, params);
            }
            function buildUrl(token, params) {
                if (!process.env.NETWORK) throw new Error("Missing environment variables: NETWORK");
                const uri = "/image";
                let domain = process.env.NETWORK.toLowerCase();
                if (domain === "mainnet") {
                    domain = process.env.NFTCDN_DOMAIN || "plutus";
                }
                const searchParams = new external_url_namespaceObject.URLSearchParams(params);
                return `https://${token}.${domain}.nftcdn.io${uri}?${searchParams.toString()}`;
            }
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_5480__ = __webpack_require__(2525);
    __nested_webpack_require_5480__.C(exports1);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_5480__(__nested_webpack_require_5480__.s = moduleId);
    var __webpack_exports__ = __webpack_exec__(4460);
    module.exports = __webpack_exports__;
})();


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [164,501,525], () => (__webpack_exec__(4460)));
module.exports = __webpack_exports__;

})();