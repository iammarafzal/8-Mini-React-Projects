import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../context';

function Details() {
  const { id } = useParams();
  const { recipeDetailsData, setRecipeDetailsData, favoriteList, handleAddToFavorite } = useContext(GlobalContext);
  const isFavorite = favoriteList && favoriteList.length > 0 &&
    favoriteList.findIndex((item) => item.id === recipeDetailsData?.recipe.id) !== -1;

  async function getRecipeDetails() {
    try {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
      const result = await response.json();

      if (result?.data) {
        setRecipeDetailsData(result?.data);
      }
    } catch(e) {
      console.log(e.message);
      

    }
  }

  useEffect(() => {
    getRecipeDetails()
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <div className="grid grid-cols-1 gap-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 lg:grid-cols-2 lg:p-8">
      <div className="row-start-2 lg:row-start-auto">
        <div className="group h-80 overflow-hidden rounded-3xl bg-slate-100 sm:h-[30rem]">
          <img src={recipeDetailsData?.recipe?.image_url}
          className='block h-full w-full object-cover duration-500 group-hover:scale-105' />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <span className="w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">{recipeDetailsData?.recipe?.publisher}</span>
        <h3 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">{recipeDetailsData?.recipe?.title}</h3>
        <p className="max-w-lg leading-7 text-slate-500">A delicious recipe ready to become part of your home-cooking collection.</p>
        <button className={`mt-3 w-full rounded-2xl px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 sm:w-fit ${
          isFavorite
            ? 'bg-rose-600 shadow-rose-200 hover:bg-rose-700'
            : 'bg-slate-900 shadow-slate-200 hover:bg-orange-500'
        }`} onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}>
          {
            isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
        </button>
      </div>
      <div className="rounded-3xl bg-slate-50 p-6 sm:p-8 lg:col-span-2">
        <span className='text-2xl font-black text-slate-900'>Ingredients</span>
        <ul className='mt-6 grid grid-cols-1 gap-3 md:grid-cols-2'>
          {
            recipeDetailsData?.recipe?.ingredients.map((ingredient) => (
              <li className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500" />
                <span className='font-bold text-slate-900'>{ingredient.quantity} {ingredient.unit}</span>
                <span className='text-slate-600 capitalize'>{ingredient.description}</span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
    </main>
  )
}

export default Details
