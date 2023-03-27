const Customer = require('../models/Customer')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { model } = require('mongoose')


// @desc Get all customers
// @route GET /customers
// @access Private
const getAllCustomers = asyncHandler(async (req, res) => {
        // Get all customers from MongoDB
        const customers = await Customer.find().lean()
        // If no customers 
        if (!customers?.length) {
            return res.status(400).json({ message: 'No customers found' })
        }
        res.json(customers)
})


// @desc Create new customers
// @route POST /customers
// @access Private
const createNewCustomer = asyncHandler(async (req, res) => {
    const {customerName, location, contact} = req.body

    //confirm data
    if (!customerName || !location || !contact ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //check duplicate
    const duplicateCustomerName = await Customer.findOne({customerName}).lean().exec()


    if (duplicateCustomerName) {
        return res.status(409).json({ message: 'Duplicate customerName or email' })
    }

    const customerObject = {customerName, location, contact}

    //create and store new customer
    const customer = await Customer.create(customerObject)

    if (customer) { //created 
        res.status(201).json({ message: `New customer ${customerName} created` })
    } else {
        res.status(400).json({ message: 'Invalid customer data received' })
    }
})

// @desc Update a customers
// @route PATCH /customers
// @access Private
const updateCustomer = asyncHandler(async (req, res) => {
    const { id, customerName, location, contact} = req.body

    // Confirm data 
    if (!id || !customerName || !location || !contact) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the customer exist to update?
    const customer = await Customer.findById(id).exec()

    if (!customer) {
        return res.status(400).json({ message: 'Customer not found' })
    }

    // Check for duplicate 
    const duplicate = await Customer.findOne({customerName}).lean().exec()

    // Allow updates to the original customer 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate customer' })
    }

    customer.customerName = customerName
    customer.location = location
    customer.contact = contact

    const updatedCustomer = await customer.save()

    res.json({ message: `${updatedCustomer.customerName} updated` })
})


// @desc Delete a customers
// @route DELETE /customers
// @access Private
const deleteCustomer = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Customer ID Required' })
    }

    // Does the customer still have assigned notes?
    // const note = await Note.findOne({ customer: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'Customer has assigned notes' })
    // }

    // Does the customer exist to delete?
    const customer = await Customer.findById(id).exec()

    if (!customer) {
        return res.status(400).json({ message: 'Customer not found' })
    }

    const result = await customer.deleteOne()

    const reply = `CustomerName ${result.customerName} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllCustomers,
    createNewCustomer,
    updateCustomer,
    deleteCustomer
}