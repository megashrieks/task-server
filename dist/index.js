"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const store_1 = require("./utils/store");
const routes_1 = require("./routes");
const error_boundary_1 = require("./middlewares/error_boundary");
const logging_middleware_1 = require("./middlewares/logging_middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(logging_middleware_1.requestLogger);
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
// main routes
app.use('/', routes_1.router);
app.use(error_boundary_1.errorBoundary);
app.listen(config_1.default.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    store_1.logger.debug('Listening to port :', config_1.default.PORT);
}));
