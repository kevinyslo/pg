import { StateProvider } from './State'
import { UserPage } from './UserPage'
import React, {useEffect} from "react"
import axios from "axios"
import {Route, Switch, BrowserRouter as Router,} from "react-router-dom";

export const App = () => {
    const initialUserState = {
        username: '',
        password: '',

    }



    const userReducer = (user, action) => {
        switch (action.type) {
            case 'edit':
                return action.newuser
            default:
                // return user
                axios.get('http://localhost:3000/api/data/users/1').then(
                    response => user = response.data)
                return user
        }
    }

    return (

        <StateProvider initialState={initialUserState} reducer={userReducer}>
            {/*<Router>*/}
            {/*<Switch>*/}
            {/*    <Route exact path="/">*/}
                    <UserPage/>
            {/*    </Route>*/}
            {/*</Switch>*/}
            {/*</Router>*/}
        </StateProvider>
    )
}

