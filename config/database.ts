import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'postgres', // Replace with your desired database dialect (e.g., mysql, sqlite)
    database: 'your_database_name',
    username: 'your_username',
    password: 'your_password',
    host: 'localhost',
    port: 5432, // Replace with your database port
    define: {
        timestamps: false // If you don't want Sequelize to automatically manage timestamps for your models
    }
});
