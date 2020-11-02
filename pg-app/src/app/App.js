import { StateProvider } from './State'
import { UserPage,  } from './UserPage'
import { UserList,  } from './UserList'
import React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export const App = () => {

    const initialUserState = {
        user: {
            // username: '',
            // password: '',
        },
        users: []
    }

    const mainReducer = (state, action) => {
        // state.msg = action.msg  // not working
        state = {...state, msg: action.msg}
        switch (action.type) {
            case 'list':
                return {...state, users: action.users}
            case 'fetch':
                return {...state, user: action.user}
            case 'set':
                return {...state, user: {...state.user, [action.fieldName]: action.fieldValue}}
            case 'create':
               return state
            default:
                return initialUserState
        }
    }

    return (
        <StateProvider initialState={initialUserState} reducer={mainReducer}>
            <Router>
                <Switch>
                    <Route exact path="/app/user/:userId">
                        <UserPage/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path="/app/userList">
                        <UserList/>
                    </Route>
                </Switch>
            </Router>
        </StateProvider>
    )
}

