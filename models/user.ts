import { Model, DataTypes } from 'sequelize';
const { sequelize } = require('../config/config');

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: 'users',
        sequelize
    }
);

export default User;
