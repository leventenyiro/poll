import { Model, DataTypes } from 'sequelize';
import Answer from './answer';
const { sequelize } = require('../config/config');

class Vote extends Model {
    public id!: number;
    public username!: string;
    public answerId!: string;
}

Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answerId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Answer,
                key: 'id'
            }
        }
    },
    {
        tableName: 'votes',
        sequelize
    }
);

Vote.belongsTo(Answer, { foreignKey: 'answerId' });

export default Vote;
