// usetheme hook
import { useTheme } from "../hooks/useTheme";
// icon
import modeIcon from "../assets/mode-icon.svg";
//styles
import "./ThemeSelector.css";

// themec olors array
const themeColors = [
  "#453F78",
  "#249c6b",
  "#AD343E",
  "#F2AF29",
  "#7FC8F8",
  "#FF6392",
];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  const toggleMode = () => {
    localStorage.setItem("mode", mode === "dark" ? "light" : "dark");
    changeMode(mode === "dark" ? "light" : "dark");
  };
  console.log(mode);
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="dark/light mode theme toggle icon"
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
          onClick={toggleMode}
        />
      </div>
      <div className="theme-buttons">
        {/* map thru our colors array and output swatch buttons to click for color theme change */}
        {themeColors.map((color) => (
          // colors will be unique so can use as keys
          <div
            key={color}
            onClick={() => {
              localStorage.setItem("color", color);
              changeColor(color);
            }}
            style={{ background: color }}
          ></div>
        ))}
      </div>
    </div>
  );
}
