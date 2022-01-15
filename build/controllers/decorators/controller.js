"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            // looping for all available methods in Controller
            var routeHandler = target.prototype[key]; // assign method
            var path = Reflect.getMetadata('path', target.prototype, key); // get metadata
            var method = Reflect.getMetadata('method', target.prototype, key);
            if (path && method === 'get') {
                router.get("" + routePrefix + path, routeHandler);
            }
        }
    };
}
exports.controller = controller;
