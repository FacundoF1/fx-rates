"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionNeDB = void 0;
const index_1 = require("./index");
const model_1 = require("./model");
class connectionNeDB {
    constructor(name) {
        this.getAlls = async (page, limit) => {
            return new Promise((resolve, reject) => this.collection.find({})
                .skip(page * limit).limit(limit).exec((err, docs) => {
                if (err)
                    return reject(err);
                return resolve(docs);
            }));
        };
        this.getForId = async (id) => {
            return new Promise((resolve, reject) => this.collection.findOne({ _id: id }, (err, docs) => {
                if (err)
                    return reject(err);
                return resolve(docs);
            }));
        };
        this.get = async (data) => {
            return new Promise((resolve, reject) => this.collection.find(data, (err, docs) => {
                if (err)
                    return reject(err);
                return resolve(docs);
            }));
        };
        this.create = async (data) => {
            return new Promise((resolve, reject) => this.collection.insert(data, (err, docs) => {
                if (err)
                    return reject(err);
                return resolve(docs);
            }));
        };
        this.update = async (id, data) => {
            const { email, username } = data;
            const update = { $set: { email, username } };
            return new Promise((resolve, reject) => this.collection
                .update({ _id: id }, update, {}, (err, docs) => {
                if (err)
                    return reject(err);
                return resolve(docs);
            }));
        };
        this.delete = async (id) => {
            return new Promise((resolve, reject) => this.collection
                .remove({ _id: id }, (err, docs) => {
                if (err)
                    return reject(err);
                return resolve(docs);
            }));
        };
        this.collection = new index_1.ConnectionNeDB(model_1.DBAccessModel[name]).connectionNeDB();
    }
}
exports.connectionNeDB = connectionNeDB;
//# sourceMappingURL=dao.js.map