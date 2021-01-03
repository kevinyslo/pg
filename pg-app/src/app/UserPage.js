import React, { useEffect, useState } from "react";
import { useStateValue } from "./State";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Grid,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Add, Refresh } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

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
  footer: {
    flexShrink: 0,
  },
  bottomNav: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

export const UserPage = (props) => {
  // const history = useHistory();
  const { userId } = useParams();
  const [state, dispatch] = useStateValue();
  const [status, setStatus] = useState("");

  const classes = useStyles();

  async function fetchUser() {
    setStatus("loading");
    const result = await axios.get(`/api/data/users/${userId}`);
    setStatus("loaded");
    dispatch({
      type: "fetch",
      item: { username: result.data.username, password: result.data.password },
    });
  }

  async function createUser() {
    try {
      setStatus("loading");
      await axios.post("/api/app/user", state.item);
      setStatus("loaded");
      dispatch({
        type: "create",
        msg: `Create user ${state.item.username} successfully !`,
      });
    } catch (e) {
      setStatus("error");
      dispatch({
        type: "create",
        msg: `Create user ${state.item.username} fail !`,
      });
    }
  }

  useEffect(() => {
    fetchUser();
    return () => {
      dispatch({
        type: "init",
      });
    };
  }, []);

  function onChange(e) {
    dispatch({
      type: "set",
      fieldName: e.target.name,
      fieldValue: e.target.value,
    });
  }

  function onClick(e) {
    e.preventDefault();
    createUser();
  }

  return (
    <LoadingOverlay active={status === "loading" ? true : false} spinner>
      <div className={classes.layout}>
        <Grid
          className={classes.content}
          container
          spacing={3}
          alignContent={"flex-start"}
        >
          <Grid item xs={12}>
            <label style={{ color: "red" }}>{state.msg}</label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="User name"
              name="username"
              value={state.item.username}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={"Password"}
              name="password"
              fullWidth
              value={state.item.password}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              startIcon={<Add />}
              variant="contained"
              onClick={onClick}
            >
              Create User
            </Button>
          </Grid>
        </Grid>
        <BottomNavigation
          className={classes.footer}
          onChange={() => fetchUser()}
          // className={classes.bottomNav}
        >
          <BottomNavigationAction label={"Refresh"} icon={<Refresh />} />
        </BottomNavigation>
      </div>
    </LoadingOverlay>
  );
};
