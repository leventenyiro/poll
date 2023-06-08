import { Model, DataTypes, Sequelize } from 'sequelize';

interface VoteAttributes {
  username: string;
  answerId: string;
}

class Vote extends Model<VoteAttributes> {
  public username!: string;
  public answerId!: string;

  public static associate(models: any): void {
    Vote.belongsTo(models.Answer);
  }
}

Vote.init(
  {
    username: DataTypes.STRING,
    answerId: DataTypes.STRING,
  },
  {
    sequelize: new Sequelize(), // Pass your Sequelize instance here
    modelName: 'Vote',
  }
);

export default Vote;
