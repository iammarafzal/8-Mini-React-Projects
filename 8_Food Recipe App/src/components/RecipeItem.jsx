import { Link } from 'react-router-dom';

function RecipeItem({ item }) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
        <div className="relative h-52 overflow-hidden rounded-2xl bg-slate-100">
            <img src={item.image_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-orange-600 shadow-sm backdrop-blur">Recipe</span>
        </div>
        <div className="flex flex-1 flex-col p-3 pt-5">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">{item?.publisher}</span>
            <h3 className="mt-2 line-clamp-2 text-xl font-extrabold leading-tight text-slate-900">{item?.title}</h3>
            <Link to={`/recipe-item/${item?.id}`}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100"
            >View Recipe <span className="ml-2">→</span>
            </Link>
        </div>
    </article>
  )
}

export default RecipeItem
