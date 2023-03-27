const Warehouse = require('../models/Warehouse')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { model } = require('mongoose')


// @desc Get all warehouse
// @route GET /warehouse
// @access Private
const getAllWarehouse = asyncHandler(async (req, res) => {
        // Get all warehouse from MongoDB
        const warehouse = await Warehouse.find().lean()
        // If no warehouse 
        if (!warehouse?.length) {
            return res.status(400).json({ message: 'No warehouse found' })
        }
        res.json(warehouse)
})



// @desc Create new warehouse
// @route POST /warehouse
// @access Private
const createNewWarehouse = asyncHandler(async (req, res) => {
    const {warehouseName, location} = req.body

    //confirm data
    if (!warehouseName || !location) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //check duplicate
    const duplicateWarehouseName = await Warehouse.findOne({warehouseName}).lean().exec()

    if (duplicateWarehouseName ) {
        return res.status(409).json({ message: 'Duplicate warehouseName' })
    }

    const warehouseObject = {warehouseName, location}

    //create and store new warehouse
    const warehouse = await Warehouse.create(warehouseObject)

    if (warehouse) { //created 
        res.status(201).json({ message: `New warehouse ${warehouseName} created` })
    } else {
        res.status(400).json({ message: 'Invalid warehouse data received' })
    }
})

// @desc Update a warehouse
// @route PATCH /warehouse
// @access Private
const updateWarehouse = asyncHandler(async (req, res) => {
    const { id, warehouseName, location } = req.body

    // Confirm data 
    if (!id || !warehouseName || !location) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the warehouse exist to update?
    const warehouse = await Warehouse.findById(id).exec()

    if (!warehouse) {
        return res.status(400).json({ message: 'Warehouse not found' })
    }

    // Check for duplicate 
    const duplicate = await Warehouse.findOne({warehouseName}).lean().exec()

    // Allow updates to the original warehouse 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate warehouse' })
    }

    warehouse.warehouseName = warehouseName
    warehouse.location = location



    const updatedWarehouse = await warehouse.save()

    res.json({ message: `${updatedWarehouse.warehouseName} updated` })
})

// @desc Delete a warehouse
// @route DELETE /warehouse
// @access Private
const deleteWarehouse = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Warehouse ID Required' })
    }

    // Does the warehouse still have assigned notes?
    // const note = await Note.findOne({ warehouse: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'Warehouse has assigned notes' })
    // }

    // Does the warehouse exist to delete?
    const warehouse = await Warehouse.findById(id).exec()

    if (!warehouse) {
        return res.status(400).json({ message: 'Warehouse not found' })
    }

    const result = await warehouse.deleteOne()

    const reply = `WarehouseName ${result.warehouseName} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllWarehouse,
    createNewWarehouse,
    updateWarehouse,
    deleteWarehouse, 
}