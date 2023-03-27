// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true 
//     },
//     password: {
//         type: String,
//         required: true 
//     },
//     roles: [{
//         type: String,
//         default: "Employee"
//     }],
//     active: {
//         type: Boolean,
//         default: true 
//     },
// })

// module.exports = mongoose.model('User', userSchema)


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be up to 6 characters"],
      //   maxLength: [23, "Password must not be more than 23 characters"],
    },
    userImage: {
      type: Object,
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "0240000000",
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    status: {
        type: String,
        default: 'active'
    },
  },
  {
    timestamps: true,
  }
);

//   Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

userSchema.plugin(AutoIncrement, {
  inc_field: 'counter',
  id: 'idUse',
  start_seq: 000
})

module.exports = mongoose.model('User', userSchema)