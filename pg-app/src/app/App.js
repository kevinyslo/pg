import { StateProvider } from "./State";
import { UserPage } from "./UserPage";
import { UserList } from "./UserList";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const App = () => {
  const initialState = {
    obj: {
      // username: '',
      // pa6ssword: '',
    },
    list: [],
    msg: "",
  };

  const mainReducer = (state, action) => {
    // state.msg = action.msg  // not working
    state = { ...state, msg: action.msg };
    switch (action.type) {
      case "list":
        return { ...state, list: action.list };
      case "fetch":
        return { ...state, obj: action.obj };
      case "set":
        return {
          ...state,
          obj: { ...state.obj, [action.fieldName]: action.fieldValue },
        };
      case "create":
        return state;
      default:
        return initialState;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <Router>
        <Switch>
          <Route exact path="/app/user/:userId">
            <UserPage />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/app/user-list">
            <UserList />
          </Route>
        </Switch>
      </Router>
    </StateProvider>
  );
};
