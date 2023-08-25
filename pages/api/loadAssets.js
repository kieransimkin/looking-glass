"use strict";
(() => {
var exports = {};
exports.id = 513;
exports.ids = [513];
exports.modules = {

/***/ 9111:
/***/ ((module) => {

module.exports = require("@emurgo/cardano-serialization-lib-nodejs");

/***/ }),

/***/ 871:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 5233:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


(()=>{
    var exports = {};
    exports.id = 8513;
    exports.ids = [
        8513
    ];
    exports.modules = {
        /***/ 9111: /***/ (module1)=>{
            module1.exports = __webpack_require__(9111);
        /***/ },
        /***/ 1841: /***/ (__unused_webpack_module, __webpack_exports__, __nested_webpack_require_342__)=>{
            // ESM COMPAT FLAG
            __nested_webpack_require_342__.r(__webpack_exports__);
            // EXPORTS
            __nested_webpack_require_342__.d(__webpack_exports__, {
                "default": ()=>/* binding */ Browse
            });
            // EXTERNAL MODULE: external "@emurgo/cardano-serialization-lib-nodejs"
            var cardano_serialization_lib_nodejs_ = __nested_webpack_require_342__(9111);
            ; // CONCATENATED MODULE: external "buffer"
            const external_buffer_namespaceObject = __webpack_require__(871);
            ; // CONCATENATED MODULE: ./pages/api/loadAssets.js
            function Browse(req, res) {
                let tokens = {};
                let ada = 0;
                const setTokenAmount = (policyID, token, amount)=>{
                    let tpolicy = null;
                    if (tokens.hasOwnProperty(policyID)) {
                        tpolicy = tokens[policyID];
                    } else {
                        tpolicy = tokens[policyID] = {};
                    }
                    if (tpolicy.hasOwnProperty(token)) {
                        tpolicy[token] += parseInt(amount);
                    } else {
                        tpolicy[token] = parseInt(amount);
                    }
                };
                for(var c = 0; c < req.body.utxos.length; c++){
                    var output = JSON.parse(cardano_serialization_lib_nodejs_.TransactionUnspentOutput.from_bytes(external_buffer_namespaceObject.Buffer.from(req.body.utxos[c], "hex")).output().to_json());
                    ada += parseInt(output.amount.coin);
                    if (output.amount.multiasset) {
                        var policies = Object.keys(output.amount.multiasset);
                        for(var d = 0; d < policies.length; d++){
                            var tassets = Object.keys(output.amount.multiasset[policies[d]]);
                            var tpolicy = output.amount.multiasset[policies[d]];
                            for(var e = 0; e < tassets.length; e++){
                                setTokenAmount(policies[d], tassets[e], tpolicy[tassets[e]]);
                            }
                        }
                    }
                }
                res.status(200).json({
                    lovelace: ada,
                    tokens: tokens
                });
            //res.status(200).json(Object.keys(req.query));
            }
        /***/ }
    };
    ;
    // load runtime
    var __nested_webpack_require_2847__ = __webpack_require__(2525);
    __nested_webpack_require_2847__.C(exports);
    var __webpack_exec__ = (moduleId)=>__nested_webpack_require_2847__(__nested_webpack_require_2847__.s = moduleId);
    var __webpack_exports__ = __webpack_exec__(1841);
    module.exports = __webpack_exports__;
})();


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [501,525], () => (__webpack_exec__(5233)));
module.exports = __webpack_exports__;

})();