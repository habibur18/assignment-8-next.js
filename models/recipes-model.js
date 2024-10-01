import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  activeTime: {
    type: String,
    required: true,
  },
  totalTime: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  serves: {
    type: Number,
    // Default value of 0 serves
    default: 0,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3,
  },
  steps: {
    // Array of steps, each step is a string
    type: [String],
    required: true,
  },
});

// Create and export the model
const Recipe =
  mongoose.models.recipes ?? mongoose.model("recipes", recipeSchema);
export default Recipe;
