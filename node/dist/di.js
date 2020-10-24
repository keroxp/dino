"use strict";
exports.__esModule = true;
exports.DI = void 0;
// (c) 2020 Yusuke Sakurai. MIT License.
var DI = /** @class */ (function () {
    function DI(parent) {
        if (parent === void 0) { parent = new Map(); }
        this.registry = new Map();
        this.registry = new Map(parent.entries());
    }
    DI.prototype.get = function (key) {
        var val = this.registry.get(key);
        if (!val) {
            throw new Error(key + " is not registered");
        }
        return val;
    };
    DI.prototype.has = function (key) {
        return this.registry.has(key);
    };
    DI.prototype.set = function (key, value) {
        this.registry.set(key, value);
    };
    DI.prototype.unset = function (key) {
        this.registry["delete"](key);
    };
    DI.prototype.reset = function () {
        this.registry.clear();
    };
    DI.prototype.domain = function () {
        return new DI(this.registry);
    };
    return DI;
}());
exports.DI = DI;
