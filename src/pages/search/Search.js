// styles
import "./Search.css";
// components
import RecipeList from "../../components/RecipeList";

// reouter dom
import { useLocation } from "react-router-dom";
// custom hook fretch
import { useFetch } from "../../hooks/useFetch";
// custom context hook
import { useTheme } from "../../hooks/useTheme";

export default function Search() {
  // custom context hook
  const {mode} = useTheme();
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const url = "http://localhost:3000/recipes?q=" + query;
  // send request
  const { error, isPending, data } = useFetch(url);
  return (
    <div>
      <h2 className={`page-title ${mode}`}>Recipes including: {query}</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
