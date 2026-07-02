import { useContext } from "react";
import { GlobalContext } from '../context/index';
import RecipeItem from "../components/RecipeItem";

function Home() {
  const { loading, recipesList, searchedQuery } = useContext(GlobalContext);

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
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {
        recipesList?.length > 0 ? (
          recipesList.map((item) => (
            <RecipeItem key={item.id} item={item} />
          ))
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
