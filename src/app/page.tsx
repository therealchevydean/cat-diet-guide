"use client";

import { useState } from 'react';
import Link from 'next/link';
import catFoods from '@/data/cat_foods.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFoods = catFoods.filter(item => 
    item.food.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            The Ultimate Cat Diet Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Search our database to find out exactly what human foods are safe, and what is incredibly toxic for your cat.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 border border-gray-300 rounded-full leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg shadow-sm transition-shadow hover:shadow-md"
              placeholder="Search for a food (e.g., Apples, Chocolate)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No foods found</h3>
            <p className="text-gray-500">We couldn't find anything matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((item) => (
              <Link href={`/${item.slug}`} key={item.slug} className="block group">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 border border-gray-100 h-full flex flex-col justify-between transform group-hover:-translate-y-1">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.food}</h2>
                    <div className="mb-4">
                      {item.isSafe ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800">
                          Safe for Cats
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-800">
                          Highly Toxic
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {item.shortAnswer}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-50 text-blue-600 text-sm font-medium group-hover:text-blue-700">
                    Read full guide &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
