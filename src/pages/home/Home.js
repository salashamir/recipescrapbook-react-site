// hooks
import { useEffect, useState } from "react";
// components
import RecipeList from "../../components/RecipeList";
// firestore
import { projectFirestore } from "../../firebase/config";

// styles
import "./Home.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    // connect to recipes collection
    // get fetches snapshot of colection, async like a fetch request, returns promise
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        // snapshot has diff properties and methods
        if (snapshot.empty) {
          setError("No recipes to load.");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
