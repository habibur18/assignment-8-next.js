import mongoose from "mongoose";

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
    type: [String],
    // Default value is an empty array
    default: [],
  },
});

// Create and export the model
const User = mongoose.models.users ?? mongoose.model("users", userSchema);
export default User;
