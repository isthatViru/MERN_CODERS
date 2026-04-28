const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const session = require("express-session");
const GmailOtp = require("./GmailOTP.js");
const LoginAuth=require("./Controllers/LoginAuth.js")

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

const connection = require("./config/db.js");
connection();

const User = require("./model/usersSchema.js");

// session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "viraj",
  })
);

// ================== SIGNUP ==================

app.get("/", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup",LoginAuth);

// OTP page
app.get("/otppage", (req, res) => {
  res.render("otppage.ejs");
});

// verify signup OTP
app.post("/verifyotp", async (req, res) => {
  try {
    // ✅ FIX: handle case if userotp is not array
    let userotp = Array.isArray(req.body.userotp)
      ? req.body.userotp.join("")
      : req.body.userotp;

    let actualOTP = req.session.OTP;

    if (userotp === String(actualOTP)) {
      const { userName, email, password } = req.session.userDetails;

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        userName,
        email,
        password: hashPassword,
      });

      await newUser.save();

      // clear session
      req.session.userDetails = null;
      req.session.OTP = null;

      res.redirect("/login");

    } else {
      res.send(`<script>alert('Invalid OTP'); window.location.assign('/otppage')</script>`);
    }

  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

// ================== LOGIN ==================

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Step 1: check password + send OTP
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send(`<script>alert('User Not Exist'); window.location.href="/login";</script>`);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.send(`<script>alert('Password Not Matched'); window.location.href="/login";</script>`);
    }

    // store temp user
    req.session.tempUser = user;

    let otp = Math.floor(1000 + Math.random() * 9000);
    req.session.LOGINOTP = otp;

    // ✅ FIX: send OTP via function instead of only alert (function already exists)
    GmailOtp(user.email, otp);

    res.send(`<script>alert('OTP has been sent to your email'); window.location.assign('/login-otp')</script>`);

  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

// OTP page for login
app.get("/login-otp", (req, res) => {
  res.render("Loginotp.ejs");
});

// Step 2: verify login OTP
app.post("/verifyLoginotp", async (req, res) => {
  try {
    // ✅ FIX: handle both array and string input
    let userotp = Array.isArray(req.body.userotp2)
      ? req.body.userotp2.join("")
      : req.body.userotp2;

    let actualOTP = req.session.LOGINOTP;

    if (userotp === String(actualOTP)) {

      // login success
      req.session.loginId = req.session.tempUser._id;

      // clear session
      req.session.tempUser = null;
      req.session.LOGINOTP = null;

      res.redirect("/home");

    } else {
      res.send(`<script>alert('Invalid OTP'); window.location.assign('/login-otp')</script>`);
    }

  } catch (error) {
    console.log(error);
    res.send("Something went wrong");
  }
});

// ================== HOME ==================

app.get("/home", (req, res) => {
  if (req.session.loginId) {
    res.render("home.ejs");
  } else {
    res.redirect("/");
  }
});

// ================== SERVER ==================

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});