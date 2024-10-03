import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  return (
    <Link className="card block" href={`/recipe/${recipe._id}`}>
      <Image
        src="https://cdn.pixabay.com/photo/2023/09/05/12/44/mug-8235059_1280.jpg"
        className="rounded-md"
        alt=""
        width={300}
        height={160}
      />
      <h4 className="my-2">
        {recipe.author}&apos;s {recipe.name}
      </h4>
      <div className="py-2 flex justify-between text-xs text-gray-500">
        <span>
          {" "}
          {Array.from({ length: 5 }, (_, index) =>
            index < recipe.rating ? "⭐️" : "☆"
          )}{" "}
          {recipe.rating}
        </span>
        <span>By: {recipe.author}</span>
      </div>
    </Link>
  );
}
