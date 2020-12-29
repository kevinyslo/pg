import { StateProvider } from "./State";
import { UserPage } from "./UserPage";
import { UserList } from "./UserList";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Checkout from "../checkout/Checkout";
import {
  AppBar,
  Container,
  Divider,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Menu, People } from "@material-ui/icons";
import LoadingOverlay from "react-loading-overlay";

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 240px)`,
      marginLeft: 240,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 240,
  },
}));

export const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const initialState = {
    item: {
      // username: '',
      // password: '',
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
        return { ...state, item: action.item };
      case "set":
        return {
          ...state,
          item: { ...state.item, [action.fieldName]: action.fieldValue },
        };
      case "create":
        return state;
      default:
        return initialState;
    }
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  // const func1 = () => {
  //   const o1 = { a: 1, b: 2 };
  //   const o2 = { a: 2, b: 2 };
  //   return [o1, o2];
  // };
  //
  // const [p1, p2] = func1();
  //
  // console.log("=================", p1);
  // console.log("=================", p2);

  const TempDrawer = () => {
    const history = useHistory();
    return (
      <Hidden mdUp>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant={"temporary"}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {innerDrawer(history)}
        </Drawer>
      </Hidden>
    );
  };

  const PermDrawer = () => {
    const history = useHistory();
    return (
      <Hidden smDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant={"permanent"}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {innerDrawer(history)}
        </Drawer>
      </Hidden>
    );
  };

  const innerDrawer = (history, ...props) => {
    return (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem
            button
            key={"user-list"}
            onClick={() => {
              history.push("/app/user-list");
              setDrawerOpen(false);
            }}
          >
            {/*<Link to={"/app/user-list"}>User List</Link>*/}
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary={"User List"} />
          </ListItem>
        </List>
      </div>
    );
  };

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            onClick={() => setDrawerOpen(true)}
          >
            <Menu />
          </IconButton>
          <Typography variant={"h6"} noWrap>
            My Playground
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Router>
          <nav>
            <TempDrawer />
            <PermDrawer />
          </nav>
          <main className={classes.appBar}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/app">
                <Checkout />
              </Route>
              <Route exact path="/app/user/:userId">
                <UserPage />
              </Route>
              <Route exact path="/app/user-list">
                <UserList />
              </Route>
            </Switch>
          </main>
        </Router>
      </Container>
    </StateProvider>
  );
};
