const request = require('supertest');
const app = require('./app');
const UserRepository = require('./userRepository');
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

describe('UserAPI', () => {

    let userRepository;
    let collection;
    let client;

    beforeAll(async () => {
        let uri = process.env.MONGO_URI;
        client = new MongoClient(uri);
        await client.connect(); // connecting with database

        collection = client.db('users_db').collection('users');

        userRepository = new UserRepository(collection);
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await collection.deleteMany({});
    })

    describe('/users', () => {

        describe('GET /', () => {
            test('Deve retornar uma lista vazia de usuários', async () => {
                const response = await request(app).get('/users');
                expect(response.statusCode).toBe(400);
                expect(response.body).toStrictEqual([]);
            });

            test('Deve retornar uma lista completa de usuários', async () => {
                await userRepository.insertUser({
                    name: 'Michaelle Oliveira',
                    email: 'michaelle@teste.com'
                });

                await userRepository.insertUser({
                    name: 'Adelino Lopes',
                    email: 'adelino@teste.com'
                })

                const response = await request(app).get('/users');

                expect(response.statusCode).toBe(200);
                expect(response.body[0]).toEqual(expect.objectContaining({
                    name: 'Michaelle Oliveira',
                    email: 'michaelle@teste.com'
                }));
                expect(response.body[1]).toEqual(expect.objectContaining({
                    name: 'Adelino Lopes',
                    email: 'adelino@teste.com'
                }));
            });
        });

        describe('POST /', () => {
            test('Deve incluir um usuário no banco de dados', async () => {
                const response = await request(app).post('/users').send({
                    name: 'Michaelle Oliveira',
                    email: 'michaelle@teste.com'
                });

                const users = await userRepository.findAllUsers();

                expect(response.statusCode).toBe(201);
                expect(users).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name: 'Michaelle Oliveira',
                            email: 'michaelle@teste.com'
                        })
                    ]))
            });

            test('Não deve permitir a inclusão de usuários com emails duplicados', async () => {
                const user1 = await request(app).post('/users').send({
                    name: 'Michaelle Oliveira',
                    email: 'michaelle@teste.com'
                });
                expect(user1.body).toEqual(
                    expect.objectContaining({
                        name: 'Michaelle Oliveira',
                        email: 'michaelle@teste.com'
                    })
                );

                const user2 = await request(app).post('/users').send({
                    name: 'Lara Raj',
                    email: 'michaelle@teste.com'
                });
                expect(user2.statusCode).toBe(400);
                expect(user2.body).toEqual(
                    expect.objectContaining({
                        message: 'Invalid email',
                        code: 400
                    })
                )
            });
        });

    });

    describe('/users/:id', () => {

        describe('GET /', () => {
            test('Deve retornar os dados de um usuário', async () => {
                const user = await userRepository.insertUser({
                    name: 'Michaelle Oliveira',
                    email: 'michaelle@teste.com'
                });

                const response = await request(app).get(`/users/${user._id}`);

                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: 'Michaelle Oliveira',
                        email: 'michaelle@teste.com'
                    })
                )
            });

            test('Deve retornar status code 404 para usuário não existente', async () => {
                const response = await request(app).get('/users/1234567890abcdef1234567z');
                expect(response.statusCode).toBe(404);
                expect(response.body).toStrictEqual({
                    message: 'User not found',
                    code: 404
                })
            });
        });

        describe('PUT /', () => {
            test('Deve atualizar os dados de um usuário', async () => {
                const user = await request(app).post('/users').send({
                    name: 'Michaelle Oliveira',
                    email: 'michaelle@teste.com'
                });

                const updated = await request(app).put(`/users/${user.body._id}`).send({
                    name: 'Michaelle Maria Silva de Oliveira',
                    email: 'michaelle@teste.com.br'
                });

                expect(updated.statusCode).toBe(200);
                expect(updated.body).toStrictEqual(
                    expect.objectContaining({
                        name: 'Michaelle Maria Silva de Oliveira',
                        email: 'michaelle@teste.com.br'
                    })
                )
            });

            test('Deve retornar status code 404 para usuário não existente', async () => {
                const invalidId = '64f3c0d8a9f1e2b3c4d5e6f7'
                const updated = await request(app).put(`/users/${invalidId}`).send({
                    name: 'Teste',
                    email: 'teste@teste.com'
                });

                expect(updated.statusCode).toBe(404)
            });
        });

        describe('DELETE /', () => {
            test('Deve remover um usuário', async () => {
                const user = await request(app).post('/users').send({
                    name: 'Michaelle Oliveira',
                    email: 'michaelle@teste.com'
                });
                expect(user.body).toStrictEqual(
                    expect.objectContaining({
                        name: 'Michaelle Oliveira',
                        email: 'michaelle@teste.com'
                    })
                );

                const deletar = await request(app).delete(`/users/${user.body._id}`);
                expect(deletar.statusCode).toBe(204)
            });

            test('Deve retornar status code 404 para usuário não existente', async () => {
                const invalidId = '64f3c0d8a9f1e2b3c4d5e6f7';
                const deletar = await request(app).delete(`/users/${invalidId}`);
                expect(deletar.statusCode).toBe(404);
            });
        });

    });

});