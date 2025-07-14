import dotenv from "dotenv";
dotenv.config();
module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  PORT: process.env.PORT,
  dialect: process.env.DIALECT,
  pool: {
    max: 5,
    min: 0,
    aquire: 30000,
    idle: 10000,
  },
};
