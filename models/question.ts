import { Model, DataTypes } from 'sequelize';
import User from './User';
const { sequelize } = require('../config/config');

class Question extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public userId!: string;
}

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        tableName: 'questions',
        sequelize
    }
);

Question.belongsTo(User, { foreignKey: 'userId' });

export default Question;
