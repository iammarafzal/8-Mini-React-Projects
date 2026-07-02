function Search({ search, setSearch, handleSearch, loading }) {
    return (
        <form className="search-engine" onSubmit={handleSearch}>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
                type="search"
                value={search}
                placeholder="Search a city..."
                aria-label="City name"
                onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit" disabled={loading || !search.trim()}>
                {loading ? "Loading" : "Search"}
            </button>
        </form>
    );
}

export default Search;
