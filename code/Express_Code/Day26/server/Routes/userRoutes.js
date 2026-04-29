const express=require('express')
const router=express.Router()
const {getUsers,getuser,addUsers,deleteUser,updateUser}=require('../controllers/userControllers')

router.get('/users',getUsers)
router.get('/oneUser/:id', getuser)
router.post('/addUser',addUsers )


router.delete('/delete/:id',deleteUser )
router.put('/update/:id',updateUser)


module.exports = router