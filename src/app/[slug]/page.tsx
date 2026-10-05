import catFoods from '@/data/cat_foods.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return catFoods.map((item) => ({
    slug: item.slug,
  }));
}

export default async function FoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const foodItem = catFoods.find((item) => item.slug === resolvedParams.slug);

  if (!foodItem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className={`p-10 text-center ${foodItem.isSafe ? 'bg-purple-500' : 'bg-red-500'}`}>
          <Link href="/" className="text-white/80 hover:text-white mb-6 inline-block text-sm font-bold tracking-widest uppercase transition-colors">
            &larr; Back to all foods
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Can Cats Eat {foodItem.food}?
          </h1>
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-8 py-3 shadow-sm border border-white/30">
            <span className="text-3xl font-black text-white tracking-widest uppercase">
              {foodItem.isSafe ? 'YES' : 'NO'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-12 space-y-10">
          <div>
            <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-3">The Short Answer</h2>
            <p className="text-2xl text-gray-900 font-medium leading-snug">{foodItem.shortAnswer}</p>
          </div>

          <div className="border-t border-gray-100 pt-10">
            <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-4">Detailed Explanation</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{foodItem.longExplanation}</p>
          </div>

          <div className="border-t border-gray-100 pt-10">
            <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-4">Serving Size for a Cat</h2>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
              <p className="text-xl text-indigo-900 font-medium">
                {foodItem.servingSize}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-gray-100 pt-10">
            <div>
              <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-5">
                 Potential Risks
              </h2>
              {foodItem.risks.length > 0 ? (
                <ul className="space-y-4">
                  {foodItem.risks.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                        <span className="text-red-600 text-sm font-bold">!</span>
                      </div>
                      <span className="ml-3 text-gray-700 text-lg">{risk}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-lg">No major risks reported.</p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-5">
                Nutritional Benefits
              </h2>
              {foodItem.benefits.length > 0 ? (
                <ul className="space-y-4">
                  {foodItem.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                       <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                        <span className="text-purple-600 text-sm font-bold">✓</span>
                      </div>
                      <span className="ml-3 text-gray-700 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-lg">None.</p>
              )}
            </div>
          </div>

          {/* Monetization / Affiliate Slot */}
          <div className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-100 text-center shadow-sm">
            <p className="text-xs text-orange-400 uppercase tracking-widest font-black mb-3">Sponsored</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Want the absolute best for your Cat?</h3>
            <p className="text-gray-600 mb-6 text-lg">Check out our highly recommended {foodItem.isSafe ? 'healthy, all-natural treats' : 'safe treat alternatives'} on Amazon.</p>
            <a href={foodItem.isSafe ? "https://www.amazon.com/s?k=healthy+cat+treats&tag=catdietguide-20" : "https://www.amazon.com/s?k=cat+toys&tag=catdietguide-20"} target="_blank" rel="noopener noreferrer" className="inline-block bg-fuchsia-400 hover:bg-fuchsia-500 text-fuchsia-900 font-bold text-lg py-4 px-10 rounded-xl shadow-sm transition-all hover:shadow-md transform hover:-translate-y-0.5">
              Shop Cat {foodItem.isSafe ? 'Treats' : 'Supplies'}
            </a>
            <p className="text-xs text-gray-400 mt-4">As an Amazon Associate I earn from qualifying purchases.</p>
          </div>

        </div>
      </div>
    </main>
  );
}
