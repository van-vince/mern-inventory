const express = require('express')
const router = express.Router()
const warehouseController = require('../controllers/warehouseController')

router.route('/')
        .get(warehouseController.getAllWarehouse)
        .post(warehouseController.createNewWarehouse)
        .patch(warehouseController.updateWarehouse)
        .delete(warehouseController.deleteWarehouse)


module.exports = router