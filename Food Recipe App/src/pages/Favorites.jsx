import { useContext } from "react";
import { GlobalContext } from '../context/index';
import RecipeItem from "../components/RecipeItem";

function Favorites() {
  const { favoriteList } = useContext(GlobalContext);

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">Your collection</span>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Favorite recipes</h1>
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {
        favoriteList && favoriteList.length > 0 ? 
          favoriteList.map((item) => <RecipeItem item={item}/>)
        : 
        <div className="col-span-full flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-rose-200 bg-rose-50/50 px-6 text-center">
          <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl shadow-sm">♡</span>
          <p className="text-xl font-extrabold text-slate-900 lg:text-3xl">Nothing is added to favorites</p>
          <p className="mt-2 text-sm text-slate-500">Recipes you love will appear here.</p>
        </div>
        
        // searchParam !== '' ?
        // <div>
        //   <p className="lg-text-4xl text-xl text-black font-extrabold text-center">No data found for {searchParam}</p>
        // </div> :
        // <div>
        //   <p className="lg-text-4xl text-xl text-black font-extrabold text-center">Please search something...</p>
        // </div>
      }
      </div>
    </main>
  )
}

export default Favorites
