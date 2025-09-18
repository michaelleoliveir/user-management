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
        await collection.createIndex({ "email": 1 }, { unique: true })

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
            return response.status(400).json([])
    }
});

app.get('/users/:id', async (request, response) => {
    try {
        const user = await userRepository.findOneById(new ObjectId(request.params.id));
        response.json(user);
    } catch (error) {
        response.status(404).send({
            message: 'User not found',
            code: 404
        })
    }
});

app.post('/users', async (request, response) => {
    const { name, email } = request.body;

    try {
        const user = await userRepository.insertUser({ name, email });
        response.status(201).json(user);
    } catch (error) {
        if (error.code === 11000) {
            return response.status(400).send({
                message: 'Invalid email',
                code: 400
            });
        }
    }
});

app.put('/users/:id', async (request, response) => {
    const data = request.body;
    const { id } = request.params;

    try {
        const user = await userRepository.updateUser(id, data);
        return response.status(200).send(user)
    } catch (error) {
        if (error.message === `User with id ${id} does not exist`) {
            return response.status(404).send();
        }
    }
})

app.delete('/users/:id', async (request, response) => {
    try {
        await userRepository.deleteUser(new ObjectId(request.params.id));
        response.status(204).send({
            message: 'User deleted',
            code: 204
        });
    } catch (error) {
        if (error.message === 'It is not possible to delete an inexistent user') {
            return response.status(404).send(message);
        }
    }
})

module.exports = app