// import function to create context object
import { createContext, useReducer } from "react";

// returns new context object, which has contextprovider component
export const ThemeContext = createContext();

// reducer function doesn't need to be inside the component, doesn't need to be reecreated everytime component reevaluated
// reut
const themeReducer = (state, action) => {
  // return value that represents new state at end
  // check type property on action object and react accoridngly
  switch (action.type) {
    case "CHANGE_COLOR":
      // return updated state object
      // only one property now, but in future might be more
      // spread properties, then u can overwrite whiever you want
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

//create custom react component with template to render te ThemeContext.Provider component and inside we pass any children components that ThemeProvider wraps, so they all get access to themecontextprovider value, then we wrap App component w this component
// this way of working = much more flexibility
export function ThemeProvider({ children }) {
  // usereducer hook allows us to specify a reducer function responsible for updating our state and keeping all update logic together in one place + initial state value
  // returns two values in array, destructure we cna: initial state, + dispatch function used to call udereducer to chnage state
  const [state, dispatch] = useReducer(themeReducer, {
    color: localStorage.getItem("color") ?? "#AD343E",
    mode: localStorage.getItem("mode") ?? "dark",
  });

  const changeColor = (color) => {
    // takes in object as arg referered to as dispatch action object: type property describes type of state change to mak,e, PAYLOAD IS any data we want to base state change on
    // wehwn we use dispatch function, react looks at reducer function associated w that dispatch and fires it to amke state change: reducer function when called w/ dispatch takes in two args: current state, and the action object passed into dispatch call
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
