import { StateProvider } from './State'
import { UserPage,  } from './UserPage'
import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from 'axios'

export const App = () => {
    const initialUserState = {
        username: '',
        password: '',

    }

    const userReducer = (user, action) => {
        switch (action.type) {
            case 'fetch':
                return action.user
            case 'set':
                return {...user, [action.fieldName]: action.fieldValue}
            case 'create':
               return {...user, msg: action.msg}
            default:
                // return user
                console.log('====================', user)
                return user
        }
    }

    return (
        <StateProvider initialState={initialUserState} reducer={userReducer}>
            <Router>
                <Switch>
                    <Route exact path="/app">
                        <UserPage/>
                    </Route>
                </Switch>
            </Router>
        </StateProvider>
    )
}

