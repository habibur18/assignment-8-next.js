import Categories from "./components/home/Categories";
import HeroSection from "./components/home/HeroSection";
import Recipes from "./components/home/Recipes";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="container py-8">
        <div className="grid grid-cols-12 py-4">
          <Categories />
          <Recipes />
        </div>
      </section>
    </>
  );
}
