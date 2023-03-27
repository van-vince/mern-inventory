const User = require('../models/User')
//const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { model } = require('mongoose')
const cloudinary = require("../config/cloudinary");


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
        // Get all users from MongoDB
        const users = await User.find().select('-password').lean()
        // If no users 
        if (!users?.length) {
            return res.status(400).json({ message: 'No users found' })
        }
        res.json(users)
})



// @desc Get a single user
// @route GET /users
// @access Private
const getAUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      const { _id, username, email, userImage, phone,} = user;
      res.status(200).json({_id, username, email, userImage, phone,});
    } else {
      res.status(400);
      throw new Error("User Not Found");
    }
  });

// @desc Create new users
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const {username, email, userImage, password, roles} = req.body

    //confirm data
    if (!username || !email || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //check duplicate
    const duplicateUsername = await User.findOne({username}).lean().exec()
    const duplicateEmail = await User.findOne({email}).lean().exec()

    if (duplicateUsername || duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate username or email' })
    }

    // if (userImage) {
    //     const uploadedResponse = await cloudinary.uploader.upload(userImage, {
    //         upload_preset: "mern-inventory",
    //       });

    //       if(uploadedResponse) {

    //         const userObject = {username, email, userImage:uploadedResponse, password, roles}

    //         //create and store new user
    //         const user = await User.create(userObject)
        
    //         if (user) { //created 
    //             res.status(201).json({ message: `New user ${username} created` })
    //         } else {
    //             res.status(400).json({ message: 'Invalid user data received' })
    //         }

    //       }
    // }
    const userObject = {username, email, userImage, password, roles}

    //create and store new user
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }

   
})

// @desc Update a users
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email, userImage, phone, roles, active,} = req.body

    // Confirm data 
    if (!id || !username || !email|| !userImage || !phone || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields  are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({username}).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate user' })
    }

    user.username = username
    user.email = email
    user.userImage = userImage
    user.phone = phone
    user.roles = roles
    user.active = active

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a users
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    // const note = await Note.findOne({ user: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'User has assigned notes' })
    // }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    getAUser,
    createNewUser,
    updateUser,
    deleteUser
}