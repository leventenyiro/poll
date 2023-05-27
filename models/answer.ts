import { Model, DataTypes } from 'sequelize';
import Question from './question';
const { sequelize } = require('../config/config');

class Answer extends Model {
    public id!: number;
    public title!: string;
    public questionId!: string;
}

Answer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        questionId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Question,
                key: 'id'
            }
        }
    },
    {
        tableName: 'answers',
        sequelize
    }
);

Answer.belongsTo(Question, { foreignKey: 'questionId' });

export default Question;
