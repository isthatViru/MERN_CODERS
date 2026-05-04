const bcrypt = require('bcryptjs')
const userSchema = require('../model/userSchema')

// ❌ remove this line from controller
// app.use(express.urlencoded({ extended: true }))

const getUsers = async (req, res) => {
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
}

const getuser = async (req, res) => {
  try {
    const id = req.params.id   // ✅ fixed
    console.log(id)

    const result = await userSchema.findById(id)  // ✅ fixed

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

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
}

const addUsers = async (req, res) => {
  try {
    const { userName, email,role, password } = req.body

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required"
      })
    }

    const isUserExist = await userSchema.findOne({
      $and: [{ userName }, { email }]
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
      role,
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
}

const deleteUser = async (req, res) => {
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
}

const updateUser = async (req, res) => {
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
      { userName, email,role ,password: hashpassword },
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
}

module.exports = { getUsers, getuser, addUsers, deleteUser, updateUser }