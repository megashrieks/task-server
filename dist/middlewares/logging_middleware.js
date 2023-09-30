"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const store_1 = require("../utils/store");
const requestLogger = (req, _res, next) => {
    store_1.logger.debug('received request: ', req.method, req.url);
    next();
};
exports.requestLogger = requestLogger;
