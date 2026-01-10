
import IndexSlider from "../../component/IndexSlider";
import BlogCard from "../../component/BlogCard";
import CategoryCard from "../../component/CategoryCard";
import SimpleCategoryCard from "../../component/SimpleCategoryCard";
import SearchBox from "../../component/SearchBox";

const slides = [
  "/slider/slider-1767777045225-sfxz4mfs9bt.png",
  "/slider/slider-1767850198829-u7ksck9y4wm.jpg",
  "/slider/slider-1767850320827-adveq25dyxw.png",
];

export default function Home() {
  const samplePosts = Array.from({ length: 6 }).map((_, i) => ({
    title: `Sample Blog Post ${i + 1}`,
    excerpt: "This is an example excerpt for the blog card. It gives a short preview.",
    image: slides[i % slides.length],
  }));

  const categories = [
    { name: "Technology", image: slides[0] },
    { name: "Design", image: slides[1] },
    { name: "Business", image: slides[2] },
    { name: "Tutorials", image: slides[0] },
    { name: "News", image: slides[1] },
    { name: "Lifestyle", image: slides[2] },
  ];

  return (
    <main className="min-h-screen bg-base-100 text-base-content">

      <section className="px-4 pt-6 max-w-6xl mx-auto">
        <div className="grid gap-8">
          <IndexSlider slides={slides} />

          {/* Full-width category cards section - 6 columns */}
          <div className="w-full">
            <h3 className="text-2xl font-semibold mb-4">Categories</h3>
            <div className="grid grid-cols-6 gap-4">
              {categories.map((c) => (
                <CategoryCard key={c.name} name={c.name} image={c.image} count={Math.floor(Math.random() * 40) + 1} />
              ))}
            </div>
          </div>

          {/* Main content + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <main className="lg:col-span-2">
              {/* First section: large area with blog cards */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {samplePosts.map((p, idx) => (
                  <BlogCard key={idx} title={p.title} excerpt={p.excerpt} image={p.image} />
                ))}
              </section>
            </main>

            <aside className="space-y-3">
              <SearchBox />

              <div className="p-4 bg-base-200 rounded-lg shadow">
                <h4 className="font-semibold mb-3">Categories</h4>
                <div className="grid gap-2">
                  {categories.map((c) => (
                    <SimpleCategoryCard key={c.name} name={c.name} count={Math.floor(Math.random() * 40) + 1} />
                  ))}
                </div>
              </div>

              <div className="p-4 bg-base-200 rounded-lg shadow">
                <h4 className="font-semibold mb-3">About</h4>
                <p className="text-sm opacity-90">A clean, modern blog built with Next.js and DaisyUI.</p>
              </div>

              <div className="p-4 bg-base-200 rounded-lg shadow">
                <h4 className="font-semibold mb-3">Browse by Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <span key={c.name} className="badge badge-outline hover:badge-primary transition-colors duration-200">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
