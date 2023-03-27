const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)


const warehouseSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Product",
      },
    warehouseName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: [true, "Please add a name"],
    },
  },
  {
    timestamps: true,
  }
);

warehouseSchema.plugin(AutoIncrement, {
  inc_field: 'counter',
  id: 'idWares',
  start_seq: 000
})

module.exports = mongoose.model('Warehouse', warehouseSchema)