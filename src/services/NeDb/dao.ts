import { ConnectionNeDB } from './index';
import { DBAccessModel } from './model';

export class connectionNeDB <T> {

  private collection: ConnectionNeDB | any | T;

  constructor( name: string ){
    this.collection = new ConnectionNeDB( DBAccessModel[name] ).connectionNeDB()
  }

  getAlls = async (page, limit) => {
    return new Promise((resolve, reject) => this.collection.find({})
      .skip(page * limit).limit(limit).exec((err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }));
  };

  getForId = async (id: string): Promise<T> => {
    return new Promise((resolve, reject) => this.collection.findOne({ _id: id }, (err, docs) => {
      if (err) return reject(err);
      return resolve(docs);
    }));
  };

  get = async (data): Promise<T[]> => {
    return new Promise((resolve, reject) => this.collection.find(data, (err, docs) => {
      if (err) return reject(err);
      return resolve(docs);
    }));
  };

  create = async (data: T) => {
    return new Promise((resolve, reject) => this.collection.insert(data, (err, docs) => {
      if (err) return reject(err);
      return resolve(docs);
    }));
  };

  update = async (id, data?: T | any): Promise<T> => {
    const { email, username } = data;
    const update = { $set: { email, username } };

    return new Promise((resolve, reject) => this.collection
      .update({ _id: id }, update, {}, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }));
  };

  delete = async (id) => {
    return new Promise((resolve, reject) => this.collection
      .remove({ _id: id }, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }));
  };
}
