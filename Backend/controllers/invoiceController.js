const Invoice = require('../models/Invoice')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { model } = require('mongoose')


// @desc Get all invoice
// @route GET /invoice
// @access Private
const getAllInvoice = asyncHandler(async (req, res) => {
        // Get all invoice from MongoDB
        const invoice = await Invoice.find().select().lean()
        // If no invoice 
        if (!invoice?.length) {
            return res.status(400).json({ message: 'No invoice found' })
        }
        res.json(invoice)
})

// @desc Create new invoice
// @route POST /invoice
// @access Private
const createNewInvoice = asyncHandler(async (req, res) => {
    const {user, companyAddress, customerAddress, invoiceId, warehouse, invoiceDetails, total} = req.body

    //confirm data
    if ( !companyAddress || !customerAddress || !invoiceId || !warehouse || !invoiceDetails || !total) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //check duplicate
    const duplicateInvoiceName = await Invoice.findOne({invoiceId}).lean().exec()

    if (duplicateInvoiceName) {
        return res.status(409).json({ message: 'Duplicate Invoice' })
    }

    const invoiceObject = {user, companyAddress, customerAddress, invoiceId, warehouse, invoiceDetails, total}

    //create and store new invoice
    const invoice = await Invoice.create(invoiceObject)

    if (invoice) { //created 
        res.status(201).json({ message: `New invoice ${invoiceId} created` })
    } else {
        res.status(400).json({ message: 'Invalid invoice data received' })
    }
})

// @desc Update a invoice
// @route PATCH /invoice
// @access Private
const updateInvoice = asyncHandler(async (req, res) => {
    const { user, customerAddress, invoiceId, warehouse, invoiceDetails, total} = req.body

    // Confirm data 
    if(!user || !customerAddress || !invoiceId || !warehouse || !invoiceDetails || !total) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the invoice exist to update?
    const invoice = await Invoice.findById(id).exec()

    if (!invoice) {
        return res.status(400).json({ message: 'Invoice not found' })
    }

    // Check for duplicate 
    const duplicate = await Invoice.findOne({invoiceId}).lean().exec()

    // Allow updates to the original invoice 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate invoice' })
    }

    invoice.customerAddress = customerAddress
    invoice.invoiceId  = invoiceId 
    invoice.warehouse = warehouse
    invoice.invoiceDetails = quantity
    invoice.total = total


    const updatedInvoice = await invoice.save()

    res.json({ message: `${updatedInvoice.invoiceName} updated` })
})

// @desc Delete a invoice
// @route DELETE /invoice
// @access Private
const deleteInvoice = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Invoice ID Required' })
    }

    // Does the invoice still have assigned notes?
    // const note = await Note.findOne({ invoice: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'Invoice has assigned notes' })
    // }

    // Does the invoice exist to delete?
    const invoice = await Invoice.findById(id).exec()

    if (!invoice) {
        return res.status(400).json({ message: 'Invoice not found' })
    }

    const result = await invoice.deleteOne()

    const reply = `InvoiceName ${result.invoiceName} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllInvoice,
    createNewInvoice,
    updateInvoice,
    deleteInvoice
}












