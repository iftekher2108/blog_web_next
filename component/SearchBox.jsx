'use client'

import { useState } from 'react';

export default function SearchBox() {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      console.log('Search for:', search);
    }
  };

  return (
    <form onSubmit={handleSearch} className="p-4 bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h4 className="font-semibold text-white mb-3 text-sm">Search Articles</h4>
      <div className={`relative transition-all duration-300`}>
        <input
          type="text"
          placeholder="Find your next read..."
          className="input input-bordered w-full text-base-content pl-4 pr-12 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 btn btn-sm btn-ghost text-white btn-outline btn-primary hover:text-primary transition-all duration-300"
        >
          🔍
        </button>
      </div>
      <p className="text-xs text-white opacity-80 mt-2">Search by keyword, category, or author</p>
    </form>
  );
}
