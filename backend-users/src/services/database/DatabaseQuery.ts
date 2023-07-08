import mysql, {ServerlessMysql} from "serverless-mysql";
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

    build = (): DatabaseQueryBuilder => {
        return new DatabaseQueryBuilder(this.mysql);
    }
}

class DatabaseQueryBuilder {
    constructedQuery: string = ""
    readonly mysql: ServerlessMysql;

    constructor(mysql: ServerlessMysql) {
        this.mysql = mysql;
    }

    selectAllFrom = (tableName: string): DatabaseQuerySelectAllFrom => {
        this.constructedQuery += "SELECT * FROM `" + tableName + "` "
        return new DatabaseQuerySelectAllFrom(this);
    }

    insertInto = (tableName: string, columns: string[]): DatabaseQueryInsertInto => {
        this.constructedQuery += "INSERT INTO `" + tableName + "` ";

        // cols
        let columnsString = "";
        for (let i = 0; i < columns.length; i++) {
            if (i >= columns.length - 1) {
                columnsString += columns[i];
            } else {
                columnsString += columns[i] + ", "
            }
        }
        this.constructedQuery += "(" + columnsString + ") ";

        return new DatabaseQueryInsertInto(this);
    }

    update = (tableName: string): DatabaseQueryUpdate => {
        this.constructedQuery += "UPDATE " + tableName + " SET ";

        return new DatabaseQueryUpdate(this);
    }

    deleteFrom = (tableName: string): DatabaseQueryDeleteFrom => {
        this.constructedQuery += "DELETE FROM `" + tableName + "` ";

        return new DatabaseQueryDeleteFrom(this);
    }

    getNextUuid = async (): Promise<string> => {
        const queryResponse = await this.mysql.query(
            `SELECT UUID() AS UUID_Value`,
            []
        ) as any[];

        const uuid = queryResponse[0]["UUID_Value"] as string;

        if (uuid == "")
            throw new Error("Failed to get UUID");

        return uuid;
    }
}

class DatabaseQueryInsertInto {
    private readonly self: DatabaseQueryBuilder;

    constructor(self: DatabaseQueryBuilder) {
        this.self = self;
    }

    values = (values: any[]) => {
        // vals
        let valuesString = "";
        for (let i = 0; i < values.length; i++) {
            if (i >= values.length - 1) {
                valuesString += "?"
            } else {
                valuesString += "?, "
            }
        }
        this.self.constructedQuery += "VALUES (" + valuesString + ");";

        return new DatabaseQueryInsertIntoValues(this.self, values);
    }
}

class DatabaseQueryInsertIntoValues {
    private readonly self: DatabaseQueryBuilder;
    private readonly values: any[];

    constructor(self: DatabaseQueryBuilder, values: any) {
        this.self = self;
        this.values = values;
    }

    execute = async (): Promise<DatabaseQueryInsertResponse> => {
        let queryResult = await this.self.mysql.query(this.self.constructedQuery, this.values);
        return DatabaseQueryInsertResponse.fromQueryResult(queryResult);
    }
}

class DatabaseQueryInsertResponse {
    fieldCount: number = 0
    affectedRows: number = 0
    insertId: number = 0;
    serverStatus: number = 0;
    warningCount: number = 0;
    message: string = "";
    changedRows: number = 0

    static fromQueryResult = (queryResult: unknown) => {
        return queryResult as DatabaseQueryInsertResponse;
    }
}


class DatabaseQuerySelectAllFrom {
    private readonly self: DatabaseQueryBuilder;

    constructor(self: DatabaseQueryBuilder) {
        this.self = self;
    }

    where = (condition: string): DatabaseQuerySelectWhere => {
        this.self.constructedQuery += "WHERE " + condition;
        return new DatabaseQuerySelectWhere(this.self);
    }
}

class DatabaseQuerySelectWhere {
    private readonly self: DatabaseQueryBuilder;

    constructor(self: DatabaseQueryBuilder) {
        this.self = self;
    }

    limit = (limit: Number): DatabaseQuerySelectWhereLimit => {
        this.self.constructedQuery += "LIMIT " + limit;
        return new DatabaseQuerySelectWhereLimit(this.self);
    }

    execute = async (values: any[]): Promise<any[]> => {
        let queryResult = await this.self.mysql.query(this.self.constructedQuery, values) as any[];
        return queryResult;
    }
}

class DatabaseQuerySelectWhereLimit {
    private readonly self: DatabaseQueryBuilder;

    constructor(self: DatabaseQueryBuilder) {
        this.self = self;
    }

    execute = async (values: any[]): Promise<any[]> => {
        let queryResult = await this.self.mysql.query(this.self.constructedQuery, values) as any[];
        return queryResult;
    }
}


class DatabaseQueryDeleteFrom {
    private readonly self: DatabaseQueryBuilder;

    constructor(self: DatabaseQueryBuilder) {
        this.self = self;
    }

    where = (condition: string) => {
        this.self.constructedQuery += "WHERE " + condition;
        let selectAllFromWhere = new DatabaseQueryDeleteWhere(this.self);
        return selectAllFromWhere;
    }
}

class DatabaseQueryDeleteWhere {
    private readonly self: DatabaseQueryBuilder;

    constructor(self: DatabaseQueryBuilder) {
        this.self = self;
    }

    execute = async (values: any[]): Promise<any[]> => {
        let queryResult = await this.self.mysql.query(this.self.constructedQuery, values) as any[];
        return queryResult;
    }
}

class DatabaseQueryUpdate{
    private readonly self: DatabaseQueryBuilder;

    constructor(self: DatabaseQueryBuilder) {
        this.self = self;
    }

    column = (column: string): DatabaseQueryUpdate=> {
        this.self.constructedQuery += column + " = ?, ";
        return this;
    }

    where = (whereCondition: string): DatabaseQueryUpdateWhere => {
        this.self.constructedQuery = this.self.constructedQuery.slice(0, -2) + " ";
        this.self.constructedQuery += "WHERE " + whereCondition + " ";

        return new DatabaseQueryUpdateWhere(this.self);
    }
}

class DatabaseQueryUpdateWhere {
    private readonly self: DatabaseQueryBuilder;

    constructor(self: DatabaseQueryBuilder) {
        this.self = self;
    }

    execute = async (values: any[]): Promise<any[]> => {
        let queryResult = await this.self.mysql.query(this.self.constructedQuery, values) as any[];
        return queryResult;
    }
}

export default DatabaseQuery;