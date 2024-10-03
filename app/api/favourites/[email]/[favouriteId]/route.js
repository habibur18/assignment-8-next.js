import User from "@/models/user-model";

export async function PATCH(request, { params }) {
  const { email, favouriteId } = params;
  console.log("email", email, "favouriteId", favouriteId);

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Toggle the favouriteId in the user's favourites
    const isFavourite = user.favourites.includes(favouriteId);
    if (isFavourite) {
      user.favourites.pull(favouriteId);
    } else {
      user.favourites.push(favouriteId);
    }

    // Save the updated user document
    const result = await user.save();
    return new Response(JSON.stringify(result.favourites), { status: 200 });
  } catch (error) {
    console.error("Error updating favourites:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

// export async function POST(request, { params }) {
//   const { email } = params;
//   const { favoriteId } = await request.json();
//   // extract bearer token from request headers
//   // const authHeader = request.headers.get("Authorization");
//   // const token = authHeader && authHeader.split(" ")[1];
//   // if (!token) {
//   //   return new Response("Unauthorized", { status: 401 });
//   // }

//   const user = await User.findById(email);
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
