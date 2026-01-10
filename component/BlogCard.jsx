import Image from "next/image";

export default function BlogCard({ title, excerpt, image }) {
  return (
    <article className="card bg-base-200 shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group">
      <div className="relative h-44 w-full overflow-hidden">
        <Image src={image} alt={title} fill style={{ objectFit: "cover" }} className="group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="mt-2 text-sm opacity-90">{excerpt}</p>
        <div className="mt-4">
          <button className="btn btn-sm btn-outline group-hover:btn-primary transition-all duration-300">Read more</button>
        </div>
      </div>
    </article>
  );
}
