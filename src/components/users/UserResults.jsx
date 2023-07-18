import React, { useEffect,useState } from 'react'
import Spinner from './../layout/Spinner';
import UserItem from './UserItem';

const UserResults = () => {
    const [users,setUsers] = useState([]);
    const [loading,setloading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`,{
            headers:{
                Authorization:`token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        });

        const data = await res.json();
        setUsers(data);
        setloading(false);
    }

    if(!loading){
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                {users.map((user)=>(
                    <UserItem user={user} key={user.id}/>
                ))}
            </div>
        )
    }else{
        return <Spinner/>
     }
}

export default UserResults