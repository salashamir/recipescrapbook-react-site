// hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
// firestore
import { projectFirestore } from "../../firebase/config";
// styles
import "./Recipe.css";

export default function Recipe() {
  // custom context hook
  const { mode } = useTheme();
  // params hook
  const { id } = useParams();
  // state
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    // use projectfirestore: doc method for single reference accepts id
    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          // we dont need id int his case so no need to spread data ojcet along w id
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Could not find that recipe.");
        }
      });
    // we're using id in here from outside function so need to pass in as dependcy
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}
