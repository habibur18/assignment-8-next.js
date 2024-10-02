import User from "@/models/user-model";
export async function PATCH(request, { params }) {
  const { userId } = params;
  const { refreshToken } = await request.json();
  const user = await User.findById(userId);
  if (user) {
    if (refreshToken === user.refreshToken) {
      const accessToken = jwt.sign();
      return new Response(JSON.stringify(accessToken), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid refresh token" }),
        {
          status: 400,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
}
