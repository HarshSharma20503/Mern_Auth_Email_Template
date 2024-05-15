import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define the schema for User
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Email must be unique
    },
    password: {
      type: String,
      required: true, // Password is required
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

/**
 * @method matchPassword
 * @desc   Compare entered password with hashed password
 * @param  {String} enteredPassword - Password entered by the user
 * @return {Promise<Boolean>} - True if passwords match, false otherwise
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare entered password with the stored hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * @pre save
 * @desc   Hash the password before saving the user document
 * @param  {Function} next - Callback to proceed to the next middleware
 */
userSchema.pre("save", async function (next) {
  // If the password is not modified or the document is new, proceed to the next middleware
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  // Hash the password with a salt factor of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Create and export the User model
export const User = mongoose.model("User", userSchema);
