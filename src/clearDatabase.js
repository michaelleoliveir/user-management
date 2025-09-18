const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");
const { connectDB, closeDB } = require('./db');

dotenv.config();

(async () => {
    try {
        const {userRepository} = await connectDB();

        await userRepository.deleteAll();

        console.log('Database cleared');
    } catch (error) {
        console.log('Error while deleting database: ', error);
    } finally {
        await closeDB();
    }
})