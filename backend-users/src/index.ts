require('dotenv').config({ path: '.env' });
import express from "express";
import GetPingRoute from "./routes/api/v1/GetPingRoute";
import IRoute from "./services/routes/IRoute";
import LoggerService from './services/logger/impl/LoggerService';
import ILoggerService from "./services/logger/ILoggerService";
import PostUserCreateRoute from "./routes/api/v1/user/PostUserCreateRoute";
import DatabaseQuery from "./services/database/DatabaseQuery";
import DatabaseConfig from "./services/database/DatabaseConfig";
const cors = require('cors');



// express initializing
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.WEBSITE_CORS_URL
}));

const initializeApp = async () => {
    const logger = new LoggerService();
    const databaseQuery = await createDatabaseQuery();
    const routes = createRoutes(logger, databaseQuery);

    // start express listening
    const appPort = process.env.PORT
    app.listen(appPort, () => {
        return console.log(`Backend is listening at port ${appPort}`);
    });
}

// create routes
const createRoutes = async (logger: ILoggerService, databaseQuery: DatabaseQuery): Promise<Array<IRoute>> => {
    let routes = new Array<IRoute>();
    routes.push(new GetPingRoute("/api/v1/ping"));
    routes.push(new PostUserCreateRoute("/api/v1/user/create", databaseQuery));

    // initialize routes
    for (const route of routes) {
        await route.initialize(app);
        logger.log(`\x1b[32mInitialized ${route.path} route \x1b[0m`);
    }

    logger.log(`\x1b[32mAll routes are initialized! \x1b[0m`);
    return routes;
}

// create database query
const createDatabaseQuery = async (): Promise<DatabaseQuery> => {
    const config = new DatabaseConfig(
        process.env.DB_HOST as string,
        Number.parseInt(process.env.DB_POPT as string),
        process.env.DB_NAME as string,
        process.env.DB_USER as string,
        process.env.DB_PASS as string,
        process.env.DB_IS_DEBUG == "true",
        process.env.DB_IS_TRACE == "true"
    );

    return new DatabaseQuery(config);
}


initializeApp();