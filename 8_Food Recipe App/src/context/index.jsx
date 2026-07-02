import { createContext, useState } from "react";

const GlobalContext = createContext(null);

function GlobalState({children}) {
    const [searchParam, setSearchParam] = useState('');
    const [searchedQuery, setSearchedQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipesList, setRecipesList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoriteList, setFavoriteList] = useState([]);

    function handleAddToFavorite(getItem) {
        const copyFavoriteList = [...favoriteList];
        const index = copyFavoriteList.findIndex(item => item.id === getItem.id);

        if (index === -1) copyFavoriteList.push(getItem);
        else copyFavoriteList.splice(index);

        setFavoriteList(copyFavoriteList);
    }
    async function handleSubmit(event) {
        event.preventDefault();
        const query = searchParam.trim();
        setSearchedQuery(query);
        try {
            setLoading(true)
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`)
            const result = await response.json();

            if (result?.data?.recipes) {
                setRecipesList(result.data.recipes);
            }
        } catch(e){
            console.log(e.message);
        } finally {
            setLoading(false);
            setSearchParam('');
        }    
    }

  return (
    <GlobalContext.Provider
        value={{searchParam, setSearchParam, searchedQuery, loading, recipesList, handleSubmit, recipeDetailsData, setRecipeDetailsData, favoriteList, handleAddToFavorite }}
    >
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalState;
export { GlobalContext };
