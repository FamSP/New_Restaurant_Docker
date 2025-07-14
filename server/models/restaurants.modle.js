import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Restaurant = sequelize.define("restuarant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoincrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Restaurant.sync({ force: false })
  .then(() => {
    console.log("Table created or already existe");
  })
  .catch((err) => {
    console.log("Error creating table", error);
  });
export default Restaurant;
