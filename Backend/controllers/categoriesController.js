const Category = require('../models/Category')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { model } = require('mongoose')


// @desc Get all categories
// @route GET /categories
// @access Private
const getAllCategories = asyncHandler(async (req, res) => {
        // Get all categories from MongoDB
        const categories = await Category.find().lean()
        // If no categories 
        if (!categories?.length) {
            return res.status(400).json({ message: 'No categories found' })
        }
        res.json(categories)
})


// @desc Create new categories
// @route POST /categories
// @access Private
const createNewCategory = asyncHandler(async (req, res) => {
    const {categoryName, description} = req.body

    //confirm data
    if (!categoryName || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //check duplicate
    const duplicateCategoryName = await Category.findOne({categoryName}).lean().exec()

    if (duplicateCategoryName ) {
        return res.status(409).json({ message: 'Duplicate categoryName' })
    }

    const categoryObject = {categoryName, description}

    //create and store new category
    const category = await Category.create(categoryObject)

    if (category) { //created 
        res.status(201).json({ message: `New category ${categoryName} created` })
    } else {
        res.status(400).json({ message: 'Invalid category data received' })
    }
})

// @desc Update a categories
// @route PATCH /categories
// @access Private
const updateCategory = asyncHandler(async (req, res) => {
    const { id, categoryName, description } = req.body

    // Confirm data 
    if (!id || !categoryName || !description) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the category exist to update?
    const category = await Category.findById(id).exec()

    if (!category) {
        return res.status(400).json({ message: 'Category not found' })
    }

    // Check for duplicate 
    const duplicate = await Category.findOne({categoryName}).lean().exec()

    // Allow updates to the original category 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate category' })
    }

    category.categoryName = categoryName
    category.description = description



    const updatedCategory = await category.save()

    res.json({ message: `${updatedCategory.categoryName} updated` })
})

// @desc Delete a categories
// @route DELETE /categories
// @access Private
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Category ID Required' })
    }

    // Does the category still have assigned notes?
    // const note = await Note.findOne({ category: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'Category has assigned notes' })
    // }

    // Does the category exist to delete?
    const category = await Category.findById(id).exec()

    if (!category) {
        return res.status(400).json({ message: 'Category not found' })
    }

    const result = await category.deleteOne()

    const reply = `CategoryName ${result.categoryName} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllCategories,
    createNewCategory,
    updateCategory,
    deleteCategory
}