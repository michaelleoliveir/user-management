const UserRepository = require('./userRepository');

const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

describe('User Repository', () => {

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

    // return user by their email
    describe('findOneByEmail', () => {
        test('Deve retornar um usuário existente pelo email', async () => {

            // inser user into database
            const result = await collection.insertOne({
                name: 'John Doe',
                email: 'johndoe@gmail.com'
            });

            const user = await userRepository.findOneByEmail('johndoe@gmail.com');
            expect(user).toStrictEqual({
                _id: result.insertedId,
                name: 'John Doe',
                email: 'johndoe@gmail.com'
            })
        });

        test('Deve retornar uma exceção para um usuário não existente', async () => {
            await expect(userRepository.findOneByEmail('johndoe@gmail.com'))
                .rejects.toThrow('User with email johndoe@gmail.com does not exist')
        })
    });

    // insert user into the database
    describe('insertUser', () => {
        test('Deve inserir um novo usuário', async () => {

            const user = await userRepository.insertUser({
                name: 'Michaelle Oliveira',
                email: 'michaelle@teste.com'
            });

            const result = await userRepository.findOneByEmail('michaelle@teste.com');
            expect(result).toStrictEqual(user)
        });
    });

    // updating users data
    describe('updateUser', () => {
        test('Deve atualizar um usuário existente', async () => {
            const user = await userRepository.insertUser({
                name: 'Michaelle Oliveira',
                email: 'michaelle@teste.com'
            });

            const result = await userRepository.updateUser(user._id, { name: 'Mika', email: 'teste@teste.com' });

            expect(result).toMatchObject({
                _id: user._id,
                name: 'Mika',
                email: 'teste@teste.com'
            });
        });

        test('Deve retornar uma exceção para um usuário não existente', async () => {
            const fakeId = new ObjectId().toString();

            await expect(
                userRepository.updateUser(fakeId, { name: 'Qualquer', email: 'teste@teste.com' })
            ).rejects.toThrow(`User with id ${fakeId} does not exist`);
        })
    });

    // removing user
    describe('deleteUser', () => {
        test('Deve remover um usuário existente', async () => {
            const user = await userRepository.insertUser({
                name: 'John Doe',
                email: 'johndoe@gmail.com'
            });

            await userRepository.deleteUser(user._id);

            await expect(userRepository.findOneByEmail('johndoe@gmail.com'))
                .rejects.toThrow('User with email johndoe@gmail.com does not exist')
        });

        test('Deve retornar uma exceção para um usuário não existente', async () => {
            await expect(userRepository.deleteUser(new ObjectId().toString()))
                .rejects.toThrow('It is not possible to delete an inexistent user');
        })
    });

    describe('findAll', () => {
        test('Deve retornar uma lista de usuários', async () => {
            await userRepository.insertUser({
                name: 'Lara Raj',
                email: 'lararaj@katseye.com'
            });

            await userRepository.insertUser({
                name: 'Daniella',
                email: 'daniella@katseye.com'
            });

            const users = await userRepository.findAllUsers();

            expect(users).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ name: 'Lara Raj', email: 'lararaj@katseye.com' }),
                    expect.objectContaining({ name: 'Daniella', email: 'daniella@katseye.com' })
                ])
            );
        });

        test('Deve retornar uma exceção para listagem não existente', async () => {
            await expect(userRepository.findAllUsers())
                .rejects.toThrow('Empty list')
        });
    })
})
