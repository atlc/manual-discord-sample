import { MongoClient } from "mongodb";
import config from "../config";

const client = new MongoClient(config.db.mongo_url);

client.connect();

export default client;
