import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { userName, email, phone, password, address, answer } = req.body;
    // validation
    if (!userName || !email || !phone || !password || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please fill the feilds!",
      });
    }

    // cheack user exist
    const userIsExist = await userModel.findOne({ email });
    if (userIsExist) {
      return res.status(500).send({
        success: false,
        message: "User already exists! please login....",
      });
    }

    // hashing password (encrypting password)
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });

    res.status(201).send({
      success: true,
      message: "User registered successfully!!!",
      newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in auth regiter api!",
      err,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email and password feilds!",
      });
    }
    // get the user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // decrypting password || matching the input with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials!",
      });
    }
    // creating token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // password will not be sended in response..
    user.password = undefined;

    // after successful send response..
    res.status(200).send({
      success: true,
      message: "Login successfully!",
      token,
      user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in login api!",
      err,
    });
  }
};

export { registerController, loginController };
