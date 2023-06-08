import { Model, DataTypes, Sequelize } from 'sequelize';

interface QuestionAttributes {
  title: string;
  description: string;
  userId: string;
}

class Question extends Model<QuestionAttributes> {
  public title!: string;
  public description!: string;
  public userId!: string;

  public static associate(models: any): void {
    Question.belongsTo(models.User);
    Question.hasMany(models.Answer);
  }
}

Question.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.STRING,
  },
  {
    sequelize: new Sequelize(), // Pass your Sequelize instance here
    modelName: 'Question',
  }
);

export default Question;
