const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)

const invoiceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    companyAddress:[{
        companyName: String,
        companyLocation: String,
        companyContact: String,
    }],
    customerAddress:[{
        customerName: String,
        customerLocation: String,
        customerContact: String,
    }],
    invoiceId: {
      type: String,
      required: true,
      trim: true,
    },
    warehouse: {
      type: String,
      required: false,
      trim: true,
    },
    invoiceDetails: [{
        productName: String,
        quantity: Number,
        price: Number,
        subtotal: Number,
      
    }],
    total: {
        type: Number,
        required: true,
        trim: true,
      },
  },

  {
    timestamps: true,
  }
);

invoiceSchema.plugin(AutoIncrement, {
  inc_field: 'counter',
  id: 'idInv',
  start_seq: 00
})

module.exports = mongoose.model('Invoice', invoiceSchema)