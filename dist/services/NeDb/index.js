"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionNeDB = void 0;
const nedb_1 = __importDefault(require("nedb"));
class ConnectionNeDB {
    constructor(nameDBAccess) {
        this.nedb = new nedb_1.default(`./database/${nameDBAccess}.db`);
        this.nedb.loadDatabase();
    }
    connectionNeDB() {
        return this.nedb;
    }
}
exports.ConnectionNeDB = ConnectionNeDB;
//# sourceMappingURL=index.js.map