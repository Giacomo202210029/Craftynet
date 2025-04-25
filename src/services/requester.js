const { sql, poolConnect } = require('../config/db');

class SQLRequester {
    async get(query, params = []) {
        try {
            const request = (await poolConnect).request();

            let paramIndex = 0;
            const formattedQuery = query.replace(/\?/g, () => {
                const paramName = `param${paramIndex}`;
                request.input(paramName, params[paramIndex]);
                paramIndex++;
                return `@${paramName}`;
            });

            const result = await request.query(formattedQuery);
            return result.recordset;
        } catch (error) {
            console.error('SQL GET error:', error);
            return null;
        }
    }

    async post(query, params = []) {
        try {
            const request = (await poolConnect).request();

            let paramIndex = 0;
            const formattedQuery = query.replace(/\?/g, () => {
                const paramName = `param${paramIndex}`;
                request.input(paramName, params[paramIndex]);
                paramIndex++;
                return `@${paramName}`;
            });

            const result = await request.query(formattedQuery);
            return result;
        } catch (error) {
            console.error('SQL POST error:', error);
            return null;
        }
    }
}

const sqlRequester = new SQLRequester();
module.exports = sqlRequester;
