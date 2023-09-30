"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const config_1 = __importDefault(require("../config"));
const utils_1 = require("../utils");
const dbUrl = (0, utils_1.parseDbUrl)(config_1.default.database);
const client = (0, postgres_1.default)(dbUrl, { ssl: config_1.default.database.ssl });
exports.db = (0, postgres_js_1.drizzle)(client);
