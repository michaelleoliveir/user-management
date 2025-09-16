describe('UserAPI', () => {
    
    describe('/users', () => {

        describe('GET /', () => {
            test.todo('Deve retornar uma lista vazia de usuários');
            test.todo('Deve retornar uma lista completa de usuários');
        });

        describe('POST /', () => {
            test.todo('Deve incluir um usuário no banco de dados');
            test.todo('Não deve permitir a inclusão de usuários com emails duplicados');
        });

    });

    describe('/users/:id', () => {

        describe('GET /', () => {
            test.todo('Deve retornar os dados de um usuário');
            test.todo('Deve retornar status code 404 para usuário não existente');
        });

        describe('PUT /', () => {
            test.todo('Deve atualizar os dados de um usuário');
            test.todo('Deve retornar status code 404 para usuário não existente');
        });

        describe('DELETE /', () => {
            test.todo('Deve remover um usuário');
            test.todo('Deve retornar status code 404 para usuário não existente');
        });

    });

});