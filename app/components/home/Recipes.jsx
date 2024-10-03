import RecipeCard from "./RecipeCard";

export default async function Recipes() {
  const res = await fetch("http://localhost:3000/api/recipes");
  const recipes = await res.json();

  if (!recipes) {
    return <div>No recipes found</div>;
  }
  return (
    <div className="col-span-12 md:col-span-9">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8 justify-items-center">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
