import React, {useEffect} from "react";
import { useStateValue } from './State';
import axios from "axios";
import { Link } from "react-router-dom"; // use hook to get history from router

export const UserList = (props) => {
    const [state, dispatch] = useStateValue()

    async function fetchUsers() {
        const result = await axios.get('/api/data/users')
        dispatch({
            type: 'list',
            list: result.data._embedded.users
        })
        console.log(state)
    }

    useEffect(() => {
        fetchUsers()
        },[])


    return (
        <div>
            <table>
                <thead>
                    <tr><th>User Name</th><th>Password</th></tr>
                </thead>
                <tbody>
                {
                    state.list.map(u =>(
                    <tr key={u.id}>
                        <td><Link to={`/app/user/${u.id}`}>{u.username}</Link></td>
                        <td>{u.password}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}