import './App.css'
import { useState } from 'react';
import { Toolbar } from './Toolbar';
import { themes, ThemeContext } from './Common';

function App() {
  const [themeName, setThemeName] = useState("light");
  const currentTheme = themes[themeName as keyof typeof themes];

  return (
    <>
      <select title="theme" value = {themeName} onChange={(e) => setThemeName(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <ThemeContext.Provider value={currentTheme}>
        <Toolbar />
      </ThemeContext.Provider>
    </>
  )
}

export default App
