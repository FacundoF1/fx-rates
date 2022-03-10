const { ConnectionNeDB } = require('./index');
class connectionNeDB {

  constructor( name ){
    this.collection = new ConnectionNeDB( name ).connectionNeDB()
  }

  async getAlls (page, limit) {
    return new Promise((resolve, reject) => this.collection.find({})
      .skip(page * limit).limit(limit).exec((err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }));
  };

  async getForId (id) {
    return new Promise((resolve, reject) => this.collection.findOne({ _id: id }, (err, docs) => {
      if (err) return reject(err);
      return resolve(docs);
    }));
  };

  async get (data) {
    return new Promise((resolve, reject) => this.collection.find(data, (err, docs) => {
      if (err) return reject(err);
      return resolve(docs);
    }));
  };

  async create (data) {
    return new Promise((resolve, reject) => this.collection.insert(data, (err, docs) => {
      if (err) return reject(err);
      return resolve(docs);
    }));
  };

  async update (id, data = {}) {
    const { email, username } = data;
    const update = { $set: { email, username } };

    return new Promise((resolve, reject) => this.collection
      .update({ _id: id }, update, {}, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }));
  };

  async delete (id) {
    return new Promise((resolve, reject) => this.collection
      .remove({ _id: id }, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }));
  };
}

module.exports = {
  connectionNeDB
}
