// auth.controller.js - handles sign in, sign out, and checking login tokens and roles (JWT)
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../../config/config.js";

// POST /auth/signin - check email and password, then return a signed token and the user's role
const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatches = await user.authenticate(req.body.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Email and password don't match" });
    }

    // Create a token that identifies this user and expires in 1 hour
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    // Also store the token in a cookie named "t"
    res.cookie("t", token, { httpOnly: true });

    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(400).json({ error: "Could not sign in" });
  }
};

// GET /auth/signout - remove the token cookie
const signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signed out" });
};

// Middleware: lets a request through only if it carries a valid token
const requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    (authHeader && authHeader.startsWith("Bearer ") && authHeader.slice(7)) ||
    req.cookies.t;

  if (!token) {
    return res.status(401).json({ error: "Please sign in first" });
  }

  try {
    req.auth = jwt.verify(token, config.jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Middleware: lets a request through only if the signed-in user is an admin
// (use it after requireSignin, which sets req.auth)
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  } catch (error) {
    res.status(403).json({ error: "Admin access required" });
  }
};

export default { signin, signout, requireSignin, requireAdmin };