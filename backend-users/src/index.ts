require('dotenv').config({ path: '.env' });
import express from "express";
import GetPingRoute from "./routes/api/v1/GetPingRoute";
import IRoute from "./services/routes/IRoute";
import LoggerService from './services/logger/impl/LoggerService';
import ILoggerService from "./services/logger/ILoggerService";
const cors = require('cors');



// express initializing
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.WEBSITE_CORS_URL
}));

const initializeApp = async () => {
    const logger = new LoggerService();
    const routes = createRoutes(logger);

    // start express listening
    const appPort = process.env.PORT
    app.listen(appPort, () => {
        return console.log(`Backend is listening at port ${appPort}`);
    });
}

// create routes
const createRoutes = async (logger: ILoggerService): Promise<Array<IRoute>> => {
    let routes = new Array<IRoute>();
    routes.push(new GetPingRoute("/api/v1/ping"));

    // initialize routes
    for (const route of routes) {
        await route.initialize(app);
        logger.log(`\x1b[32mInitialized ${route.path} route \x1b[0m`);
    }

    logger.log(`\x1b[32mAll routes are initialized! \x1b[0m`);
    return routes;
}

initializeApp();