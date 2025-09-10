class UserRepository {

    constructor(collection) {
        this.collection = collection
    };

    async findOneByEmail(email) {
        const user = await this.collection.findOne({email});

        if(user === null) {
            throw new Error(`User with email ${email} does not exist`);
        }

        return user;
    };

    async insertUser(user) {
        await this.collection.insertOne(user);
        return user;
    };

    async deleteUser(id) {
        const result = await this.collection.deleteOne({_id: id});

        if(result.deletedCount === 0) {
            throw new Error(`It is not possible to delete an inexistent user`);
        }
    }   

}

module.exports = UserRepository