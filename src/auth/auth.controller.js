const express = require("express");
const router = express.Router();
const { authUser, GetUserById  } = require("./auth.service");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

// Validasi Input
const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  next();
};

// Fungsi untuk mendapatkan data pengguna dari database berdasarkan ID pengguna


// Middleware untuk verifikasi token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }
    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.userId = decoded.userId;
      next();
    });
  };
  

// Endpoint untuk login
router.post("/login", validateLoginInput, async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validasi kredensial pengguna
    const result = await authUser(email, password);
    if (!result) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const { user, token } = result;
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint untuk mengambil data pengguna yang sedang login
router.get("/profile", verifyToken, async (req, res) => {
  try {
    // Dapatkan data pengguna dari database berdasarkan userId yang telah diset oleh middleware verifyToken
    const user = await GetUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Kirim data pengguna yang sedang login
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
