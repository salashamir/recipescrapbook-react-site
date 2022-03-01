// custom hook for getting context provider value w/o having to do these imports in our components: less code, + reusable
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  // returns value prop of provider, in our case an object rn
  const context = useContext(ThemeContext);
  // context will be undefined if we try to use our context outside of scope of it
  if (context === undefined) {
    // in case someone uses it outside scope of context throw error
    throw new Error("useTheme() must be used inside a ThemeProvider");
  }

  return context;
};
