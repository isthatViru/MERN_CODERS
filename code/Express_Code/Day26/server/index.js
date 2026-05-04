require('dotenv').config()

const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const session = require('express-session')
const cors = require('cors')

app.use(cors({
  origin: "http://localhost:5173"
}))

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const connection = require('./config/db')
connection()

const userRoutes = require("./Routes/userRoutes")
app.use('/', userRoutes)

const authRoutes = require("./Routes/authRoutes")
app.use('/api', authRoutes)


const PORT = 3000
const HOST = "127.0.0.1"

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`)
})