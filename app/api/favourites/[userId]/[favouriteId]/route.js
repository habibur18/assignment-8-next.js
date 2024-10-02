import User from "@/models/user-model";

export async function PATCH(request, { params }) {
  const { userId, favouriteId } = params;
  // const { favouriteId } = await request.json();
  console.log(userId, favouriteId);
  // Find the user by userId
  const user = await User.findById(userId);

  // Check if the user exists
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  // Toggle the favoriteId in the user's favourites
  const IsFavourite = user.favourites.includes(favouriteId);
  if (IsFavourite) {
    user.favourites.pull(favouriteId);
  } else {
    user.favourites.push(favouriteId);
  }

  // Save the updated user document
  const result = await user.save();
  return new Response(JSON.stringify(result), { status: 200 });
}

// export async function POST(request, { params }) {
//   const { userId } = params;
//   const { favoriteId } = await request.json();
//   // extract bearer token from request headers
//   // const authHeader = request.headers.get("Authorization");
//   // const token = authHeader && authHeader.split(" ")[1];
//   // if (!token) {
//   //   return new Response("Unauthorized", { status: 401 });
//   // }

//   const user = await User.findById(userId);
//   if (user) {
//     // check first if the recipe is already in the user's list of favourites if not add it to the list and if it is already in the list remove it
//     if (user.favourites.includes(favoriteId)) {
//       user.favourites = user.favourites.filter((id) => id !== favoriteId);
//     } else {
//       user.favourites.push(favoriteId);
//     }
//   }
//   const result = await user.save();
//   return new Response(JSON.stringify(result), { status: 200 });
// }
