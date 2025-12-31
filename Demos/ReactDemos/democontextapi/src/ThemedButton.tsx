import { useContext } from "react";
import { ThemeContext } from "./Common";

function ThemedButton(){
    const theme = useContext(ThemeContext);
    return (
        <>
            <button style={{
                    backgroundColor: theme.background,
                    color: theme.foreground,
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px"                
                }}>
                Click Me!
            </button>
        </>
    );
}

export {ThemedButton};