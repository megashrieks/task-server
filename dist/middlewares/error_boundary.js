"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorBoundary = void 0;
const store_1 = require("../utils/store");
const not_found_error_1 = require("../utils/errors/not_found_error");
const config_1 = __importDefault(require("../config"));
const errorBoundary = (err, _req, res, next) => {
    store_1.logger.error(err);
    if (err instanceof not_found_error_1.NotFoundError) {
        res.status(404).json({
            error: true,
            message: err.message,
        });
    }
    else
        res.status(500).json(Object.assign({ error: true, message: 'Error occured in the server' }, (config_1.default.ENVIRONMENT !== 'production' ? { reason: err.message } : {})));
    next();
};
exports.errorBoundary = errorBoundary;
