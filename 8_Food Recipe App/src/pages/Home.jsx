import { useContext, useState } from "react";
import { GlobalContext } from '../context/index';
import RecipeItem from "../components/RecipeItem";

function Home() {
  const { loading, recipesList, searchedQuery } = useContext(GlobalContext);
  const [publisherFilter, setPublisherFilter] = useState('all');

  const publishers = [...new Set(recipesList.map((recipe) => recipe.publisher))].sort();
  const activePublisherFilter = publishers.includes(publisherFilter) ? publisherFilter : 'all';
  const filteredRecipes = activePublisherFilter === 'all'
    ? recipesList
    : recipesList.filter((recipe) => recipe.publisher === activePublisherFilter);

  if (loading) {
    return (
      <div className="flex min-h-[55vh] flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
        <p className="text-sm font-semibold tracking-wide text-slate-500">Finding delicious recipes...</p>
      </div>
    )
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6">
      {recipesList.length > 0 && (
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-slate-900">Filter recipes</p>
            <p className="text-sm text-slate-500">Showing {filteredRecipes.length} of {recipesList.length} recipes</p>
          </div>
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-600">
            Publisher
            <select
              value={activePublisherFilter}
              onChange={(event) => setPublisherFilter(event.target.value)}
              className="min-w-52 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            >
              <option value="all">All publishers</option>
              {publishers.map((publisher) => (
                <option key={publisher} value={publisher}>{publisher}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {
        filteredRecipes.length > 0 ? (
          filteredRecipes.map((item) => (
            <RecipeItem key={item.id} item={item} />
          ))
        ) : recipesList.length > 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 px-6 py-20 text-center">
            <p className="text-xl font-extrabold text-slate-900">No recipes match this filter</p>
            <button onClick={() => setPublisherFilter('all')} className="mt-4 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">
              Clear filter
            </button>
          </div>
        ) : searchedQuery !== '' ? (
          <div className="col-span-full flex min-h-[45vh] flex-col items-center justify-center rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 px-6 text-center">
            <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl shadow-sm">🔎</span>
            <p className="text-xl font-extrabold text-slate-900 lg:text-3xl">
              No data found for {searchedQuery}
            </p>
            <p className="mt-2 text-sm text-slate-500">Try another ingredient or recipe name.</p>
          </div>
        ) : (
          <div className="col-span-full flex min-h-[45vh] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 px-6 text-center">
            <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl shadow-sm">🍲</span>
            <p className="text-xl font-extrabold text-slate-900 lg:text-3xl">
              Please search something...
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">Search by an ingredient or dish to discover your next favorite recipe.</p>
          </div>
        )
      }
      </div>
    </main>
  )
}

export default Home
