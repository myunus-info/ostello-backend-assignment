const path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require(path.join(process.cwd(), 'src/config/lib/sequelize'));
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(100),
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 8));
      },
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

User.prototype.isPasswordValid = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
