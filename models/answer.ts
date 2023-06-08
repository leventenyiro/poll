import { Model, DataTypes, Sequelize } from 'sequelize';

interface AnswerAttributes {
  title: string;
  questionId: string;
}

class Answer extends Model<AnswerAttributes> {
  public title!: string;
  public questionId!: string;

  public static associate(models: any): void {
    Answer.belongsTo(models.Question);
    Answer.hasMany(models.Vote);
  }
}

Answer.init(
  {
    title: DataTypes.STRING,
    questionId: DataTypes.STRING,
  },
  {
    sequelize: new Sequelize(),
    modelName: 'Answer',
  }
);

export default Answer;
