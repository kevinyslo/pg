import React, {useState, useReducer } from "react";

const ThemeContext = React.createContext(
    /* optional default value */
)

export const App = props => (
    <ThemeContext.Provider value={{ primaryColor: 'green' }}>
        {props.children}
    </ThemeContext.Provider>
)

export const ThemedButton = () => (
    <ThemeContext.Consumer>
        {value => (
            <button style={{backgroundColor: value.primaryColor }}>
                I'm button using context!
            </button>
        )}
    </ThemeContext.Consumer>
)

export function Increment( {initialCount, ...props} ) {
    const [count, setCount] = useState(initialCount);  return (
        <button onClick={() => setCount(prevCount => prevCount + 1)}>
            Increment: {count}
        </button>
    );
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };

        default:
            return state;
    }
};

export function Increment2({ initialCount }) {
    const [state, dispatch] = useReducer(reducer, {count: 0});
    return (
        <button onClick={() => dispatch({type: 'increment'})}>
            Increment: {state.count}
        </button>
    );
}