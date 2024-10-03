import RecipeCard from "@/app/components/home/RecipeCard";

export default async function SingleCategoryPage({ params: { name } }) {
  const res = await fetch(`http://localhost:3000/api/category/${name}`);
  const recipes = await res.json();
  return (
    <section className="container py-8">
      <h3 className="font-semibold text-xl">{recipes[0].category}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
