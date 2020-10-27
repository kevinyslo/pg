import React, {useEffect, useState} from "react";
import { useStateValue } from './State';
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay'

export const UserPage = (props) => {
    // const history = useHistory();
    const {userId} = useParams()
    const [state, dispatch] = useStateValue()
    const [status, setStatus] = useState('')

    async function fetchUser() {
        setStatus('loading')
        const result = await axios.get(`/api/data/users/${userId}`)
        setStatus('loaded')
        dispatch({
            type: 'fetch',
            user: {username: result.data.username, password: result.data.password},
        })
    }

    async function createUser() {
        try {
            setStatus('loading')
            await axios.post('/api/app/user', state.user)
            setStatus('loaded')
            dispatch({
                type: 'create',
                msg: `Create user ${state.user.username} successfully !`,
            })
        }
        catch (e) {
            setStatus('error')
            dispatch({
                type: 'create',
                msg: `Create user ${state.user.username} fail !`,
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
            <LoadingOverlay
                active={status === 'loading' ? true : false}
                spinner
                text='Loading your content...'>
            <Link to={"/app/userList"}>User List</Link>
            <div/>
            <label style={{color:'red'}}>{state.msg}</label>
            <div/>
            <input name="username" value={state.user.username} onChange={onChange}/>
            <input name="password" value={state.user.password} onChange={onChange}/>
            <div/>
            <button onClick={
                () => {
                    fetchUser()
                    // history.push("/app")
                }
            }>Refresh</button>
            <button onClick={onClick}>Create User</button>
            </LoadingOverlay>
        </div>
    )
}