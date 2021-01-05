import React, { useEffect, useState } from "react";
import { useStateValue } from "./State";
import axios from "axios";
import { Link } from "react-router-dom"; // use hook to get history from router
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - 56px)",
    "@media (min-width:0px) and (orientation: landscape)": {
      minHeight: "calc(100vh - 48px)",
    },
    "@media (min-width:600px)": { minHeight: "calc(100vh - 64px)" },
  },
  content: {
    flex: "1 0 auto",
  },
  bottomPad: {
    flexShrink: 0,
    height: "56px",
  },
  bottomNav: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

export const UserList = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  const [username, setUsername] = useState("");

  function fetchUsers(username) {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    axios
      .get(
        `/api/data/users/search/findByUsernameContaining?username=${username}`,
        { cancelToken: source.token }
      )
      .then((result) =>
        dispatch({
          type: "list",
          list: result.data._embedded.users,
        })
      )
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log("Request canceled ...");
        } else {
          dispatch({
            type: "init",
          });
        }
      });
    return source;
  }

  useEffect(() => {
    const source = fetchUsers(username);
    return () => source.cancel();
  }, [username]);

  return (
    <>
      <div className={classes.layout}>
        <Grid
          className={classes.content}
          container
          alignContent={"flex-start"}
          spacing={3}
        >
          <Grid item xs={12}>
            <TextField
              name="username"
              value={username}
              label={"Search by Username"}
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table size={"small"}>
                <TableHead>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell>Password</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.list.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <Link to={`/app/user/${u.id}`}>{u.username}</Link>
                      </TableCell>
                      <TableCell>{u.password}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <div className={classes.bottomPad} />
      </div>
      <BottomNavigation
        onChange={() => setUsername("")}
        className={classes.bottomNav}
      >
        <BottomNavigationAction label={"Refresh"} icon={<Refresh />} />
      </BottomNavigation>
    </>
  );
};
