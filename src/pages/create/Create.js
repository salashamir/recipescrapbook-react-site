import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
// hook to use context
import { useTheme } from "../../hooks/useTheme";
// firestore
import { projectFirestore } from "../../firebase/config";
// styles
import "./Create.css";

export default function Create() {
  // usetheme hook
  const { color, mode } = useTheme();
  // state
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  // useref
  const ingredientInput = useRef(null);
  // react router dom
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // object we want to save to db
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };
    // try/catch to catch any errors
    try {
      // automatically adds unique id for doc
      // await so it waits until the async task has been finished before proceeding
      await projectFirestore.collection("recipes").add(doc);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  // // redirect user when we get a data response, recipe posted
  // useEffect(() => {
  //   if (data) {
  //     history.push("/");
  //   }
  // }, [data]);
  // no lone need this since handling redirect in function + no longer using usefetch

  return (
    <div className={`create ${mode}`}>
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            required
          />
        </label>
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => {
                setNewIngredient(e.target.value);
              }}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button
              className="btn"
              onClick={handleAdd}
              style={{ background: color }}
            >
              Add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>
        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => {
              setMethod(e.target.value);
            }}
            required
            value={method}
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => {
              setCookingTime(e.target.value);
            }}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn" style={{ background: color }}>
          Submit
        </button>
      </form>
    </div>
  );
}
