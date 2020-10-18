import React, {useEffect} from "react";
import { useStateValue } from './State';
import axios from "axios";
import { useHistory } from "react-router-dom"; // use hook to get history from router

export const UserPage = (props) => {
    // const history = useHistory();
    const [user, dispatch] = useStateValue()

    async function fetchUser() {
        const result = await axios.get('/api/data/users/1')
        dispatch({
            type: 'fetch',
            user: {username: result.data.username, password: result.data.password}
        })
    }

    async function createUser() {
        try {
            await axios.post('/api/app/user', user)
            dispatch({
                type: 'create',
                msg: `Create user ${user.username} successfully !`
            })
        }
        catch (e) {
            dispatch({
                type: 'create',
                msg: `Create user ${user.username} fail !`
            })
        }
    }

    useEffect(() => {
        fetchUser()
        return () => {dispatch({
            type: 'init',
        })}
    },[])

    function onChange(e) {
        dispatch({
            type: 'set',
            fieldName: e.target.name,
            fieldValue: e.target.value
        })
    }

    function onClick(e) {
        e.preventDefault()
        createUser()
    }

    return (
        <div>
            <label style={{color:'red'}}>{user.msg}</label>
            <div/>
            <input name="username" value={user.username} onChange={onChange}/>
            <input name="password" value={user.password} onChange={onChange}/>
            <div/>
            <button onClick={
                () => {
                    fetchUser()
                    // history.push("/app")
                }
            }>Refresh</button>
            <button onClick={onClick}>Create User</button>
        </div>
    )
}