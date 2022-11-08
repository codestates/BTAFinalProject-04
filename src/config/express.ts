import express from "express";
import cors from "cors";
import YAML from 'yamljs'
import path from 'path';
import swaggerUi from 'swagger-ui-express'

const passport = require('passport');
const session = require('express-session');

require('../middleware/oAuthHandler');

import logger from './logger';
import morgan from 'morgan';
import Config from './config';
import indexRouter from "../route/index";
import apiRouter from "../route/api";
import { notFoundErrorHandler, errorHandler } from '../middleware/apiErrorHandler';

const app = express();

app.use(morgan('combined', { "stream": logger.stream }));
app.use(session({secret:'MySecret', resave: false, saveUninitialized:true}));

// Passport setting
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use(express.static('public'));
app.use('/uploadFiles', express.static('uploadFiles'));
app.use("/", indexRouter);
app.use("/api", apiRouter);

//swagger 
if (Config.server.mode !== "production" && Config.server.swagger === "on") {
    console.log("Swagger On : /api-docs");
    const swaggerSpec = YAML.load(path.join(__dirname, '../../dist/swagger.yaml'));
    var options = { swaggerOptions: { docExpansion: "none" } }
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options))
}

app.use(notFoundErrorHandler);
app.use(errorHandler);

export default app;