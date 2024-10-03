import User from "@/models/user-model";

export async function GET(request, { params }) {
  console.log("params", params);
  const { email } = params;
  // const { email } = await request.json();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(user.favourites), { status: 200 });
}
