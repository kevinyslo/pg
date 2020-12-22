import React, { useEffect, useState } from "react";
import { useStateValue } from "./State";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import RefreshIcon from "@material-ui/icons/Refresh";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

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
      obj: { username: result.data.username, password: result.data.password },
    });
  }

  async function createUser() {
    try {
      setStatus("loading");
      await axios.post("/api/app/user", state.obj);
      setStatus("loaded");
      dispatch({
        type: "create",
        msg: `Create user ${state.obj.username} successfully !`,
      });
    } catch (e) {
      setStatus("error");
      dispatch({
        type: "create",
        msg: `Create user ${state.obj.username} fail !`,
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
    <div>
      <LoadingOverlay
        active={status === "loading" ? true : false}
        spinner
        text="Loading your content..."
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Link to={"/app/user-list"}>User List</Link>
          </Grid>
          <Grid item xs={12}>
            <label style={{ color: "red" }}>{state.msg}</label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="User name"
              name="username"
              value={state.obj.username}
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
              value={state.obj.password}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <button
              onClick={() => {
                fetchUser();
                // history.push("/app")
              }}
            >
              Refresh
            </button>
            <button onClick={onClick}>Create User</button>
          </Grid>
        </Grid>
      </LoadingOverlay>
      <BottomNavigation classes={{ root: classes.stickToBottom }}>
        <BottomNavigationAction label={"Refresh"} icon={<RefreshIcon />} />
      </BottomNavigation>
    </div>
  );
};
