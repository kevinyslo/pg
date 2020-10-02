import { StateProvider } from './State';
import React from "react";

export const App2 = props => {
    const initialState = {
        theme: { primary: 'green' }
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'changeTheme':
                return {
                    ...state,
                    theme: action.newTheme
                };
            default:
                return state;
        }
    };

    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            {props.children}
        </StateProvider>
    );
}

