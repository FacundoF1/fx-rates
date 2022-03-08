"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const index_1 = require("./middleware/index");
const app = (0, express_1.default)();
exports.app = app;
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('docs/specs/swagger.yaml');
app.use(express_1.default.json());
app.use(express_1.default.static(path.join(__dirname)));
app.use((0, morgan_1.default)('dev', {}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1', routes_1.default);
app.use(index_1.error404Handler);
app.use(index_1.errorHandler);
//# sourceMappingURL=app.js.map