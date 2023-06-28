import mysql, { ServerlessMysql } from "serverless-mysql";
import DatabaseConfig from "./DatabaseConfig";


class DatabaseQuery {
    private readonly config: DatabaseConfig;
    constructedQuery: string = ""
    readonly mysql: ServerlessMysql;

    constructor(config: DatabaseConfig) {
        this.config = config;
        this.mysql = mysql({
            config: this.config,
        });
    }

    selectAllFrom = (tableName: string): DatabaseQuerySelectAllFrom => {
        this.constructedQuery += "SELECT * FROM `" + tableName + "` "
        let selectAllFrom = new DatabaseQuerySelectAllFrom(this);
        return selectAllFrom;
    }
}

class DatabaseQuerySelectAllFrom {
    private readonly self: DatabaseQuery;

    constructor(self: DatabaseQuery) {
        this.self = self;
    }

    where = (condition: string) => {
        this.self.constructedQuery += "WHERE " + condition;
        let selectAllFromWhere = new DatabaseQueryWhere(this.self);
        return selectAllFromWhere;
    }
}

class DatabaseQueryWhere {
    private readonly self: DatabaseQuery;

    constructor(self: DatabaseQuery) {
        this.self = self;
    }

    getQueryPart(): string {
        return "WHERE ";
    }

    execute = async (values: any[]): Promise<any[]> => {
        let queryResult = await this.self.mysql.query(this.self.constructedQuery, values) as any[];

        return queryResult;
    }
}


export default DatabaseQuery;