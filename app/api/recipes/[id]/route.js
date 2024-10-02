import Recipe from "@/models/recipes-model";

export async function GET(request, { params }) {
  const { id } = params;
  const recipe = await Recipe.findById(id).lean();
  return new Response(JSON.stringify(recipe), { status: 200 });
}
