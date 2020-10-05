import React, {useEffect} from "react";
import { useStateValue } from './State';
import axios from "axios";
import { useHistory } from "react-router-dom";

export const UserPage = () => {
    const history = useHistory();
    const [ user, dispatch] = useStateValue()
    useEffect(async () => {
        const result = await axios.get('http://localhost:3000/api/data/users/1')
        dispatch({
            type: 'edit',
            newuser: {username: result.data.username, password: result.data.password}
        })
    }, [])
    return (
        <div>
            <input value={user.username}/>
            <input value={user.password}/>
            <button onClick={
                () => history.push("/")
            }
            >
            Click me</button>
        </div>
    )
}