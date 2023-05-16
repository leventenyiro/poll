import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Assuming you have a separate file for Sequelize configuration

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
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
