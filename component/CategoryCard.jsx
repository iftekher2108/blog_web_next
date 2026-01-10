import Image from "next/image";

export default function CategoryCard({ name, count, image }) {
  return (
    <div className="relative h-32 rounded-lg overflow-hidden shadow-lg group cursor-pointer transition-transform duration-300 hover:scale-105">
      {image && (
        <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
        <p className="text-white font-semibold text-center px-2">{name}</p>
      </div>
      <div className="absolute left-3 bottom-3 text-white text-sm font-medium">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-xs opacity-90">{count} posts</p>
      </div>
    </div>
  );
}
