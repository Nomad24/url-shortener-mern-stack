const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();
const config = require("config");
const auth = require("../middleware/auth.middleware");

// api/auth/register
router.post(
  "/register",
  [
    check("email", "Incorrect Email").isEmail(),
    check("password", "Must be at least 6 chars long").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during registration",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({
          message: "This user already exists",
        });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashPassword });

      await user.save();

      res.status(201).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

// api/auth/login

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").normalizeEmail().isEmail(),
    check("password", "Please enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User is not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password, try again" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("secret"));

      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

// api/auth/:id
router.post("/:id", auth, async (req, res) => {
    try {
      const user = await User.findOne({_id: req.params.id});
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "User is not found" });
    }
});

module.exports = router;
