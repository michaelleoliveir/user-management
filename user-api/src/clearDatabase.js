require('dotenv').config();
const { connectDB, closeDB } = require('./db');

(async () => {
    try {
        console.log('Conectando ao banco...');

        const dbHandle = await connectDB();
        const userRepository = dbHandle.userRepository || dbHandle;

        if (!userRepository) throw new Error('userRepository não encontrado!');
        if (typeof userRepository.deleteAll !== 'function') throw new Error('deleteAll não é uma função');

        console.log('Chamando deleteAll()...');
        const result = await userRepository.deleteAll();
        console.log('Resultado do deleteAll:', result);
        console.log('Database cleared ✅');

    } catch (error) {
        console.error('Erro ao limpar banco:', error);
    } finally {
        if (typeof closeDB === 'function') {
            await closeDB();
            console.log('Conexão com DB encerrada.');
        }
    }
})();
