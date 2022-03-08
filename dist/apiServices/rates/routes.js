"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("@awaitjs/express"));
const controllers_1 = __importDefault(require("./controllers"));
const { ratesByPair, createCurrency, } = controllers_1.default;
const router = express_1.default.Router();
router.postAsync('/fee', createCurrency);
router.postAsync('/:pair', ratesByPair);
exports.default = router;
//# sourceMappingURL=routes.js.map