const { ObjectId } = require("mongodb");

class UserRepository {

    constructor(collection) {
        this.collection = collection
    };

    async findAllUsers() {
        const users = await this.collection.find({}).toArray();

        if (users.length === 0) {
            throw new Error('Empty list');
        }

        return users;
    };

    async findOneByEmail(email) {
        const user = await this.collection.findOne({ email });

        if (user === null) {
            throw new Error(`User with email ${email} does not exist`);
        }

        return user;
    };

    async findOneById(id) {
        const user = await this.collection.findOne({ _id: new ObjectId(id) });

        if (user === null) {
            throw new Error(`User with id ${id} does not exist`);
        }

        return user;
    };

    async insertUser(user) {
        const result = await this.collection.insertOne(user);
        return {
            _id: result.insertedId,
            ...user
        };
    };

    async deleteUser(id) {
        const result = await this.collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            throw new Error(`It is not possible to delete an inexistent user`);
        }
    };

    async updateUser(id, data) {
        const result = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });

        if(result.matchedCount === 0) {
            throw new Error(`User with id ${id} does not exist`);
        }

        return this.collection.findOne({_id: new ObjectId(id)})
    }

}

module.exports = UserRepository