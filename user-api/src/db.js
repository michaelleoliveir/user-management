const { MongoClient } = require("mongodb");
const UserRepository = require("./userRepository");
const dotenv = require("dotenv");

dotenv.config();

let client;
let collection;
let userRepository;

async function connectDB() {
    if (!client) {
        const uri = process.env.MONGO_URI;
        client = new MongoClient(uri);
        await client.connect();

        collection = client.db("users_db").collection("users");
        await collection.createIndex({ email: 1 }, { unique: true });

        userRepository = new UserRepository(collection);
    }

    return { client, collection, userRepository };
}

async function closeDB() {
    if (client) {
        await client.close();
        client = null;
        collection = null;
        userRepository = null;
    }
}

module.exports = { connectDB, closeDB };
