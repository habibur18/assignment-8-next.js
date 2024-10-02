import User from "@/models/user-model";
import bcrypt from "bcryptjs";
import jtw from "jsonwebtoken";
export async function PATCH(request, { params }) {
  const { email, password } = await request.json();
  const user = await User.findOne({ email });

  if (!user)
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });

  if (!(await bcrypt.compare(password, user.password)))
    return new Response(JSON.stringify({ message: "Invalid password" }), {
      status: 400,
    });

  const accessToken = jtw.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jtw.sign(
    { id: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const result = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    favourites: user.favourites,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
