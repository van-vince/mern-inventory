const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)


const customerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    customerName: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "Please add a quantity"],
      trim: true,
    },

  },
  {
    timestamps: true,
  }
);

customerSchema.plugin(AutoIncrement, {
  inc_field: 'counter',
  id: 'idCus',
  start_seq: 00
})

module.exports = mongoose.model('Customer', customerSchema)
