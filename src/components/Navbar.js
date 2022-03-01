import { Link } from "react-router-dom";
// hook to use context
import { useTheme } from "../hooks/useTheme";
// components
import Searchbar from "./Searchbar";
// styles
import "./Navbar.css";

export default function Navbar() {
  // usecontext returns the object passed into value in our themecontext provider in themeprovider component
  // we destructure the object value
  // or we can use our custom hook:
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link className="brand" to="/">
          <h1>Recipe Scrapbook 🍤</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
