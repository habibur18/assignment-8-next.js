import Recipe from "@/models/recipes-model";

export async function GET(requet) {
  const recipes = await Recipe.find({}).lean();
  return new Response(JSON.stringify(recipes), { status: 200 });
}
export async function POST(request) {
  const {
    name,
    description,
    author,
    activeTime,
    totalTime,
    thumbnail,
    image,
    category,
    serves,
    rating,
    steps,
  } = await request.json();
  const result = await Recipe.create({
    name,
    description,
    author,
    activeTime,
    totalTime,
    thumbnail,
    image,
    category,
    serves,
    rating,
    steps,
  });
  return new Response(JSON.stringify(result), { status: 200 });
}
