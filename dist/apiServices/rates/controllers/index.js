"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const get_1 = require("./get");
exports.default = {
    createCurrency: async (req, res) => await new create_1.createCurrency(req, res).handleRequest(),
    ratesByPair: async (req, res) => await new get_1.ratesByPair(req, res).handleRequest()
};
//# sourceMappingURL=index.js.map