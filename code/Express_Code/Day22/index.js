const express = require('express')
const app = express()

app.use(express.static('public/'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const bcrypt = require('bcryptjs')

const connection = require('./config/db')
connection()

const User = require("./model/instaSchema")

// view engine
app.set('view engine','ejs')

/* ======================
        SIGNUP PAGE
====================== */

app.get('/', (req, res) => {
    res.render('signup')
})


/* ======================
        SIGNUP
====================== */

app.post('/signup', async (req, res) => {

    try {

        const { userName, email, password } = req.body

        if (!userName || !email || !password) {
            return res.send(`
                <script>
                alert('All fields are mandatory');
                window.location.href="/";
                </script>
            `)
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.send(`
                <script>
                alert('User already exists');
                window.location.href="/";
                </script>
            `)
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            userName,
            email,
            password: hashPassword
        })

        await newUser.save()

        res.redirect('/signin')

    } catch (error) {
        console.log(error)
    }

})


/* ======================
        SIGNIN PAGE
====================== */

app.get('/signin', (req,res)=>{
    res.render('signin')
})


/* ======================
        LOGIN
====================== */

app.post('/login', async (req,res)=>{

try {

const {userName,password}=req.body

if(!userName || !password){
 return res.send(`<script>alert('All fields are mandatory')</script>`)
}

const isUserExists = await User.findOne({userName:userName})

if(!isUserExists){
 return res.send(`
<script>
alert('User not found');
window.location.href="/signin";
</script>
`)
}

const isPasswordMatch = await bcrypt.compare(
    password,
    isUserExists.password
)

if(!isPasswordMatch){
 return res.send(`
<script>
alert('Wrong password');
window.location.href="/signin";
</script>
`)
}

res.send("<h1>Login Successful</h1>")

} catch(error){
console.log(error)
}

})


/* ======================
        SERVER
====================== */

const HOST = '127.0.0.1'
const PORT = 3000

app.listen(PORT, HOST, () => {
    console.log(`Server is up http://${HOST}:${PORT}`)
})