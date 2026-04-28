const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const session = require('express-session')

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const connection = require('./config/db')
connection()

const userSchema = require('./model/userSchema')

app.get('/users', async (req, res) => {
  try {
    const result = await userSchema.find()
    return res.status(200).json({
      success: true,
      message: "Data Fetched Successfully",
      data: result
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
})

app.post('/addUser', async (req, res) => {
  try {
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required"
      })
    }

    const isUserExist = await userSchema.findOne({
      $and: [{ userName: userName }, { email: email }]
    })

    if (isUserExist) {
      return res.status(200).json({
        success: true,
        message: "User Already Exists"
      })
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const result = new userSchema({
      userName,
      email,
      password: hashpassword
    })

    await result.save()

    return res.status(200).json({
      success: true,
      message: "User added successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }

})


app.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id

    const result = await userSchema.findByIdAndDelete(id)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
})
app.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required"
      })
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const result = await userSchema.findByIdAndUpdate(
      id,
      { userName, email, password: hashpassword },
      { new: true }
    )

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "User Updated successfully",
      data: result
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
})


const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});