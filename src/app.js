const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const UserRepository = require('./userRepository');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(bodyParser.json());

let userRepository;
let client;
let connected = false;

app.use(async (req, res, next) => {
    if (!connected) {
        const uri = process.env.MONGO_URI;
        client = new MongoClient(uri);
        await client.connect();

        const collection = client.db('users_db').collection('users');

        userRepository = new UserRepository(collection);

        connected = true;
    };

    next();
})

app.get('/users', async (request, response) => {
    try {
        const users = await userRepository.findAllUsers();
        response.status(200).json(users);
    } catch (error) {
        if (error.message === 'Empty list')
            return response.status(200).json([])
    }
});

app.get('/users/:id', async (request, response) => {
    try {
        const user = await userRepository.findOneById(new ObjectId(request.params.id));
        response.json(user);
    } catch (error) {
        response.status(404).send()
    }
});

app.post('/users', async (request, response) => {
    const user = await userRepository.insertUser(request.body);
    response.status(201).json(user)
});

module.exports = app