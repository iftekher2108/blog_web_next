export default function SimpleCategoryCard({ name, count }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-base-200 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
      <div className="font-medium">{name}</div>
      <div className="text-sm opacity-90">{count}</div>
    </div>
  );
}
