const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Store = sequelize.define("Store", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return Store;
};
