"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionFixer = void 0;
const axios_1 = __importDefault(require("axios"));
class ConnectionFixer {
    constructor() {
        this.url = 'http://data.fixer.io/api';
        this.API_KEY = '824e753b9d8f1bf170e5adf80e7788e9';
    }
    async getFixerLatest(base, symbols) {
        try {
            const { data: response_data } = await axios_1.default.get(`${this.url}/latest?access_key=${this.API_KEY}&base=${base}&symbols=${symbols}`);
            if (Object.keys(response_data).length === 0 || !response_data.success) {
                throw new Error(response_data);
            }
            return response_data;
        }
        catch (error) {
            // instance decorator Logger
            return error;
        }
    }
}
exports.ConnectionFixer = ConnectionFixer;
//# sourceMappingURL=index.js.map