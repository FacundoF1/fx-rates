import express from 'express';
import logger from 'morgan';
import routes from './routes';
import { error404Handler, errorHandler } from './middleware/index';

const app = express();

const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('docs/specs/swagger.yaml');


app.use(express.json());
app.use(express.static(path.join(__dirname)));


app.use(logger('dev', {}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1', routes);

app.use(error404Handler);
app.use(errorHandler);

export { app };
