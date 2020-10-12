import React, {useEffect} from "react";
import { useStateValue } from './State';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const UserPage = (props) => {
    // const history = useHistory();


    const [ user, dispatch] = useStateValue()
    useEffect(() => {
        async function fetchUser() {
            const result = await axios.get('http://localhost:3000/api/data/users/1')
            dispatch({
                type: 'edit',
                user: {username: result.data.username, password: result.data.password}
            })
        }
        fetchUser()
    },
        [history])
    // [])
    return (
        <div>
            <input value={user.username} onChange={e => user.username = e.target.value}/>
            <input value={user.password} onChange={e => user.password = e.target.value}/>
            <button onClick={
                () => {

                    history.push("/app")
                    console.log('---------------------', history)

                }
            }
            >
            Click me</button>
        </div>
    )
}