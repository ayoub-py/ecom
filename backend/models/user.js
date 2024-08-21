const mongoose = require("mongoose"),
      bcrypt = require("bcryptjs")
;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    default:''
  },
  apartment: {
    type: String,
    default:''
  },
  city: {
    type: String,
    default:''
  },
  zip: {
    type: String,
    default:''
  },
  country: {
    type: String,
    default:''
  },
  phone: {
    type: String,
    default:''
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  let result = await bcrypt.compare(enteredPassword, this.password);;
  console.log("result ",result);
  return result;
};

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtuals: true });


const User = mongoose.model("User", userSchema);

module.exports = User;
