import React from "react";
import { useStateValue } from './State';

export const ThemedButton = () => {
    const [ {theme} , dispatch] = useStateValue();
    return (
        <button
            style={{backgroundColor: theme.primary}}
            onClick={() => dispatch({
                type: 'changeTheme',
                newTheme: { primary: 'blue'}
            })}
        >
            Make me blue!
        </button>
    );
}