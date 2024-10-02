import Recipe from "@/models/recipes-model";

export async function GET() {
  try {
    // Fetch all recipes from the database
    const recipes = await Recipe.find();

    // Extract unique categories
    const uniqueCategories = [
      ...new Set(recipes.map((recipe) => recipe.category)),
    ];

    // Return the unique categories as a JSON response
    return new Response(JSON.stringify(uniqueCategories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch categories" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
