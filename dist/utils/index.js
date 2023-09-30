"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDbUrl = void 0;
const parseDbUrl = (dbConnectionDetails) => {
    const { username, name, password, host, port, schema } = dbConnectionDetails;
    const escapedUsername = encodeURIComponent(username);
    const escapedPassword = encodeURIComponent(password);
    const escapedName = encodeURIComponent(name);
    const escapedHost = encodeURIComponent(host);
    const escapedSchema = encodeURIComponent(schema);
    return `postgres://${escapedUsername}:${escapedPassword}@${escapedHost}:${port}/${escapedName}?search_path=${escapedSchema}`;
};
exports.parseDbUrl = parseDbUrl;
