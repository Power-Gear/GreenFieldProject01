const { where } = require("sequelize");
const db = require("./config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await db.User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching users");
    }
  },

  getOneUser: async (req, res) => {
    const userId = req.params.userid;
    try {
      const user = await db.User.findByPk(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching user");
    }
  },
  addUser: async (req, res) => {
    const newUser = req.body;
    try {
      const hash = await bcrypt.hash(newUser.password, 10);
      newUser.password = hash;
      const user = await db.User.create(newUser);
      res
        .status(201)
        .send({ message: "User created successfully", userId: user.id });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error adding user");
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.userid;
    const updatedUserData = req.body;
    try {
      const user = await db.User.findByPk(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const hash = await bcrypt.hash(updatedUserData.password, 10);
      updatedUserData.password = hash;
      const updatedUser = await user.update(updatedUserData);
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating user");
    }
  },
  deleteUser: async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await db.User.findByPk(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      await user.destroy();
      res.send("User deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting user");
    }
  },register : async (req, res) => {  
    try {
      let newUser = req.body;
      // Check if the user already exists
      const existingUser = await db.User.findOne({ where: { email:newUser.email } });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists.' });
      }
      // Hash the password
      const hash = await bcrypt.hash(newUser.password, 10);
      // Create a new user
       newUser = {...newUser,password:hash};
      const user = await db.User.create(newUser);
      // Remove password from user data before sending response
      const userData = { id: user.id, userName: user.userName };
      res.status(201).json({ message: "User created successfully", user: userData });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error signing up");
    }
  },
 
   
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ msg: "User does not exist." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "password invalid" });
      }
      const token = jwt.sign(
        { id: user.id },
        "8X7EnmJieifHY1gXEG9r3DarKb1wTO.LPynOKPsy"
      );
      const userData = user.toJSON();
      delete userData.password;
      res.status(200).json({ token, user: userData });
    } catch (error) {
      throw error;
    }
  },
};
