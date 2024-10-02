import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const SALT_ROUNDS = 12;

// Define the schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  favourites: {
    // Storing an array of strings (IDs or any other values)
    // type: [String], // if this is a normal string
    type: [mongoose.Schema.Types.ObjectId], // if this is an ObjectId
    // Default value is an empty array
    default: [],
  },
  accessToken: {
    type: String,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
});

// Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  const user = this;

  // previous : 1234
  // next : 12345 // password will be hashed
  //if password alreay changed, skip hashing
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    // Hash the password
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Create and export the model
const User = mongoose.models.users ?? mongoose.model("users", userSchema);
export default User;
