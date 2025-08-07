import { Model, DataTypes } from 'sequelize';
import db from '../config/db';

interface RoleAttributes {
  id: number;
  name: string;
}

interface UserAttributes {
  email: string;
  name: string;
  password: string;
  role: number;
}

export class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: 'roles',
    timestamps: false
  }
);

export class User extends Model<UserAttributes> implements UserAttributes {
  public email!: string;
  public name!: string;
  public password!: string;
  public role!: number;
}

User.init(
  {
    email: {
      type: DataTypes.STRING(55),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: 'users',
    timestamps: false
  }
);

User.belongsTo(Role, { foreignKey: 'role', as: 'userRole' });
Role.hasMany(User, { foreignKey: 'role', as: 'users' });
