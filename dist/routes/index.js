"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../apiServices/rates/routes"));
const systemCounter_1 = require("../decorators/systemCounter");
const router = express_1.default.Router();
router.use('/rates', routes_1.default);
router.use('/systemInfo', async (req, res) => res.json(systemCounter_1.Monitor.printInstances()));
exports.default = router;
//# sourceMappingURL=index.js.map