import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import bcrypt from "bcryptjs"; //เข้ารหัส password
import jwt from "jsonwebtoken";
//สำหรับใช้ or
import { Op } from "sequelize";

const authController = {};

authController.signUp = async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    res.status(400).send({ message: "Pleas provide all required fields" });
    return;
  }
  await User.findOne({ where: { username } })
    // .select(-password)
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Username are already existed" });
        return;
      }
      const newUser = {
        username,
        name,
        email,
        password,
      };
      User.create(newUser)
        .then((user) => {
          if (req.body.roles) {
            //SELECT * FROM Role WHERE name=role 1OR name=role2
            Role.findAll({
              where: {
                name: {
                  [Op.or]: req.body.roles,
                },
              },
            }).then((roles) => {
              if (roles?.length === 0) {
                user.setRoles([1]).then(() => {
                  res.send({ message: "User registered succesfully3" });
                });
              }
              user.setRoles(roles).then(() => {
                res.send({ message: "User registered succesfully1" });
              });
            });
          } else {
            user.setRoles([1]).then(() => {
              res.send({ message: "User registered succesfully2" });
            });
          }
        })
        .catch((error) => {
          res.status(500).send({ message: error.message || "Something error" });
        });
    });
};

export default authController;
