import { Link } from "react-router-dom";
// hook to use context
import { useTheme } from "../hooks/useTheme";
// styles
import "./RecipeList.css";
// icon
import deleteIcon from "../assets/delete-icon.svg";
import { projectFirestore } from "../firebase/config";

export default function RecipeList({ recipes }) {
  const { color, mode } = useTheme();
  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  // onclick function for trashcan to delete doc(recipe)
  const handleClick = (id) => {
    // get reference to doc with doc then use delete method
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`} style={{ background: color }}>
            Cook This
          </Link>
          <img
            src={deleteIcon}
            alt="trashcan icon"
            className="trashcan"
            onClick={() => {
              handleClick(recipe.id);
            }}
          />
        </div>
      ))}
    </div>
  );
}
