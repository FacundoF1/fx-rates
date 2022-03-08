import { DBAccessModel } from './model';
import Nedb from 'nedb';
export class ConnectionNeDB {

    private nedb: Nedb | any;

    constructor( nameDBAccess: DBAccessModel ) {
        this.nedb = new Nedb(`./database/${nameDBAccess}.db`);
        this.nedb.loadDatabase();
    }

    public connectionNeDB() {
        return this.nedb;
    }
}
