import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../context';

function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);

  const linkStyles = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? 'bg-orange-500 text-white shadow-sm shadow-orange-200'
        : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
    }`;

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-7xl px-4">
      <nav className="flex flex-col items-center gap-5 rounded-3xl border border-slate-200/80 bg-white/90 px-5 py-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl md:flex-row md:justify-between">
        <NavLink to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500 text-xl shadow-md shadow-orange-200 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            🍽️
          </span>
          <span>
            <span className="block text-lg font-extrabold tracking-tight text-slate-900">
              Food Recipe
            </span>
            <span className="block text-xs font-medium text-slate-400">
              Cook something delicious
            </span>
          </span>
        </NavLink>

        <form onSubmit={handleSubmit} className="w-full md:max-w-md">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 transition-all focus-within:border-orange-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
            <svg className="h-5 w-5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              name="search"
              aria-label="Search recipes"
              placeholder="Search recipes..."
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              required
              minLength={3}
            />
            <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300">
              Search
            </button>
          </label>
        </form>

        <ul className="flex items-center gap-1 rounded-full bg-slate-50 p-1">
          <li><NavLink to="/" className={linkStyles}>Home</NavLink></li>
          <li><NavLink to="/favorites" className={linkStyles}>Favorites</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
