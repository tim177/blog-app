const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide the username"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: [true, "This email is already taken"],
    },
    password: {
      type: String,
      required: [true, "Please provide a your password"],
      min: [true, "the password should be min of 6 characters"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    readList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Story",
      },
    ],
    readListLength: { type: Number, default: 0 },
    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  { timestamps: true }
);

//document middleware when the document is about to save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//will delete this later as it will be too much for this small application
// mehods.functionName -> defining the method name on the object defined by userSchema
userSchema.methods.getResetPasswordToken = function () {
  const randomHexString = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

  this.resetPasswordToken = passwordResetToken;

  this.resetPasswordExpire =
    Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE);

  return passwordResetToken;
};

//defining the jwt here not the best way not seprating business logic
userSchema.methods.generateJwtToken = function () {
  payload = {
    id: this._id,
    username: this.username,
    email: this.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
