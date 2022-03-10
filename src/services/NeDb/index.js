const Nedb = require('nedb');
class ConnectionNeDB {
    constructor( nameDBAccess ) {
        this.nedb = new Nedb(`./database/${nameDBAccess}.db`);
        this.nedb.loadDatabase();
    }

    connectionNeDB() {
        return this.nedb;
    }
}

module.exports = {
    ConnectionNeDB
}
