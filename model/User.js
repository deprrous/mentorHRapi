const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const myError = require("../utils/myError");
const UserSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: [true, "Хэрэглэгчийн нэрийг оруулна уу."],
      },
      email: {
         type: String,
         required: true,
         unique: true,
         match: [/^[\w.-]+@ms\.com$/, "Please enter a valid  email address"],
      },
      password: {
         type: String,
         required: [true, "Please enter the passssss"],
         minlength: 4,
         select: false,
      },
      firstName: {
         type: String,
         required: true,
      },
      lastName: {
         type: String,
         required: true,
      },
      contactNumber: {
         type: String,
      },
      role: {
         type: String,
         enum: ["member"],
         default: "member",
      },
      dateOfJoining: {
         type: Date,
         default: Date.now,
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
   },
   { timestamps: true },
);

UserSchema.pre("save", async function () {
   // Nuuts ug oorchlogdoogui bol daraachiin middleware luu shiljine
   if (!this.isModified(this.password)) {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
   }
});

UserSchema.methods.getJWT = function () {
   const token = jwt.sign(
      {
         id: this._id,
         role: this.role,
      },
      process.env.JWT_SECRET,
      {
         expiresIn: process.env.EXPIRESIN,
      },
   );
   return token;
};

UserSchema.methods.checkPass = async function (input) {
   let match;
   try {
      match = await bcrypt.compare(input, this.password);
      console.log(match);
   } catch (err) {
      throw new myError("Email password not match!", 401);
   }
   return match;
};

UserSchema.methods.generatePasswordResetToken = async function () {
   const resetToken = crypto.randomBytes(30).toString("hex");
   this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
   this.resetPasswordExpire = Date.now() + 10 * 60000;
   return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
