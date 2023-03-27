const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const categorySchema = new mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Product",
      },
    categoryName: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        default: true 
    },
},
{
    timestamps: true,
  }
)

categorySchema.plugin(AutoIncrement, {
  inc_field: 'counter',
  id: 'idCats',
  start_seq: 00
})

module.exports = mongoose.model('Category', categorySchema)