import Recipe from "@/models/recipes-model";

export async function GET(request, { params }) {
  console.log(params);
  const { name } = params;
  console.log(params);
  const recipes = await Recipe.find({ category: name }).lean();
  return new Response(JSON.stringify(recipes), { status: 200 });
}
