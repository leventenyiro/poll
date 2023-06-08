import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;

  public static associate(models: any): void {
    User.hasMany(models.Question);
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: new Sequelize(), // Pass your Sequelize instance here
    modelName: 'User',
  }
);

export default User;
