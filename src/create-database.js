const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:@localhost:3306', {
    logging: false,
});

async function createDatabase() {
    try {
        await sequelize.query('CREATE DATABASE IF NOT EXISTS poll');
        console.log('Database "poll" created successfully.');
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        await sequelize.close();
    }
}

createDatabase();
