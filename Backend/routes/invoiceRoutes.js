const express = require('express')
const router = express.Router()
const invoiceController = require('../controllers/invoiceController')

router.route('/')
        .get(invoiceController.getAllInvoice)
        .post(invoiceController.createNewInvoice)
        .patch(invoiceController.updateInvoice)
        .delete(invoiceController.deleteInvoice)


module.exports = router