import { StateProvider } from './State'
import { UserPage } from './UserPage'
import React, {useEffect} from "react"
import axios from "axios"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export const App = () => {
    const initialUserState = {
        username: '',
        password: '',

    }

    const userReducer = (user, action) => {
        switch (action.type) {
            case 'edit':
                return action.user
            default:
                // return user
                axios.get('http://localhost:3000/api/data/users/1').then(
                    response => user = response.data)
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

