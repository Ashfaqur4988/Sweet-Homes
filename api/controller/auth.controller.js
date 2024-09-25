import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // Registration logic
  const { username, password, email } = req.body;
  //hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log({ newUser });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  // Login logic
  const { username, password } = req.body;

  try {
    //check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return res.status(401).json({ message: "invalid credentials" });
    // check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });
    //generate token and send to user
    // res.setHeader("Set-Cookie", "test=" + "myValue").send("success");
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        // isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    //sending information except password
    const { password: userPassword, ...userInfo } = user;

    res //setting the cookies
      .cookie("token", token, {
        httpOnly: true, //client side js cannot access our cookie
        // secure: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "failed to login!!" });
  }
};

export const logout = (req, res) => {
  // Logout logic
  res.clearCookie("token").status(300).json({ message: "Logout Successful" });
};
