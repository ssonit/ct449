const { MongoClient } = require("mongodb");
const config = require("../config");

const uri = config.db.uri;
const db_name = "contactbook";

class MongoDB {
  client;
  db;

  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(db_name);
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(error);
    }
  }

  get client() {
    return this.client;
  }
}

const mongoDB = new MongoDB();

module.exports = mongoDB;
