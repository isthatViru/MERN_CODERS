const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.static("/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
const connection = require("./config/db.js");
connection();
const User = require("./model/usersSchema.js");
const session = require("express-session");

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "viraj",
  }),
);

app.get("/", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
  try {
    const { userName, email } = req.body;
    const password = req.body.password;
    if (!userName || !email || !password) {
      return res.send(`
                <script>
                alert('All fields are mandatory');
                window.location.href="/";
                </script>
            `);
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.send(`
                <script>
                alert('User already exists');
                window.location.href="/";
                </script>
            `);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const isEmailExist = await User.findOne({ email });
    if (!isEmailExist) {
      return res.send(`
                <script>
                alert('User Not Exist ');
                window.location.href="/login";
                </script>
            `);
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isEmailExist.password,
    );
    if (!isPasswordMatch) {
      return res.send(`
                <script>
                alert('{Password Not Matched}');
                window.location.href="/login";
                </script>
            `);
    }
    if (isEmailExist || isPasswordMatch) {
      req.session.loginId = isEmailExist._id;
      //res.send("Session Id"+req.session.loginId)
     res.redirect('/home')
    }
  } catch (error) {
    console.log(error);
  }
});
app.get("/home", (req, res) => {
    if(req.session.loginId){
  res.render("home.ejs");
    }
    else{
      return res.redirect('/')
    }

});

const PORT = 3000;
const HOST = "127.0.0.1";
app.listen(PORT, HOST, () => {
  console.log(`Server is up http://${HOST}:${PORT}`);
});
