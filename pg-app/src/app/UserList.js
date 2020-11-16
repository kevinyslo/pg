import React, { useEffect, useState } from "react";
import { useStateValue } from "./State";
import axios from "axios";
import { Link } from "react-router-dom"; // use hook to get history from router

export const UserList = (props) => {
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
      <div>
        <input name="username" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {state.list.map((u) => (
              <tr key={u.id}>
                <td>
                  <Link to={`/app/user/${u.id}`}>{u.username}</Link>
                </td>
                <td>{u.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
