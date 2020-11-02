import React, {createContext, useContext, useReducer} from 'react';

export const useStateValue = () => useContext(StateContext)

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)
