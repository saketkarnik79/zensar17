import { createContext  } from "react";
//Define themes
  const themes = {
    light: {
      foreground: '#000000',
      background: '#eeeeee'
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222'
    }
  };

  //Create the context
  const ThemeContext = createContext(themes.light);

  export {themes, ThemeContext};
