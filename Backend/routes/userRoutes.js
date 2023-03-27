const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
        .get(usersController.getAllUsers)
       // .get(usersController.getAUser)
        .post(usersController.createNewUser)
        .patch(usersController.updateUser)
        .delete(usersController.deleteUser)


module.exports = router