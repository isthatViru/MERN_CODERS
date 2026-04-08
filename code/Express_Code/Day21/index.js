const express = require('express')
const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

const multer = require("multer")

const connection = require('./config/db.js')
connection()

const User = require('./model/userSchema.js')

// Signup page
app.get('/', (req, res) => {
    res.render("signup")
})

// Multer storage
const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname)
    }
})

const upload = multer({ storage })

// Create user
app.post('/signup', upload.single('profile'), async (req, res) => {
    try {

        const { userName, email, phone, password } = req.body
        const profile = req.file ? req.file.filename : null

        const user = new User({
            userName,
            email,
            phone,
            password,
            profile
        })

        await user.save()

        res.redirect("/users")

    } catch (error) {
        console.log(error)
        res.send("Error saving user")
    }
})

// Show all users
app.get("/users", async (req, res) => {
    try {

        const users = await User.find()

        res.render("allUsers", { users })

    } catch (error) {
        console.log(error)
        res.send("Error fetching users")
    }
})

app.get("/delete/:id",async (req,res)=>{
    const id=req.params.id;
    await User.findByIdAndDelete(id)
    res.redirect('/users')
})

const HOST = '127.0.0.1'
const PORT = 3000

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})