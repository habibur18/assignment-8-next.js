import User from "@/models/user-model";

export async function GET(requet) {
  const users = await User.find({}).lean();

  return new Response(JSON.stringify(users), { status: 200 });
}

export async function PATCH(request, { params }) {
  const { lastName, userId } = await request.json();
  // const { userId } = params;

  const user = await User.findById(userId);
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  if (
    lastName === undefined ||
    lastName === "" ||
    lastName === null ||
    lastName === " "
  ) {
    return new Response(JSON.stringify({ message: "First name is required" }), {
      status: 400,
    });
  }

  user.lastName = lastName;
  const result = await user.save();
  return new Response(JSON.stringify(result), { status: 200 });
}
