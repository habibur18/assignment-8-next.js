import User from "@/models/user-model";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = "yourAccessTokenSecret"; // Change this to a secure key
const REFRESH_TOKEN_SECRET = "yourRefreshTokenSecret"; // Change this to a secure key
export async function POST(request) {
  const { firstName, lastName, email, password, favourites } =
    await request.json();

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 400,
    });
  }

  // Create the user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    favourites: favourites || [],
  });

  // Generate JWT tokens
  const accessToken = jwt.sign(
    { id: newUser._id, email: newUser.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // Access token expires in 15 minutes
  );

  const refreshToken = jwt.sign(
    { id: newUser._id, email: newUser.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // Refresh token expires in 7 days
  );

  // Save tokens to the user document
  newUser.accessToken = accessToken;
  newUser.refreshToken = refreshToken;

  // Save the user to the database
  await newUser.save();

  const result = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    favourites: newUser.favourites,
    accessToken: newUser.accessToken,
    refreshToken: newUser.refreshToken,
  };

  return new Response(JSON.stringify(result), { status: 200 });
}
