import { useState } from "react";
import { useHistory } from "react-router-dom";
//styles
import "./Searchbar.css";

export default function SearchBar() {
  // state
  const [term, setTerm] = useState("");
  // react router dom
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ?q=pie query paramter, redircet to search page w/ query parameter
    history.push(`/search?q=${term}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          required
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
