import React, { useState, useContext } from 'react'
import GithubContext from './../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext';

const UserSearch = () => {
    const [text, setText] = useState('');
    const { users, searchUsers, clearUsers } = useContext(GithubContext);
    const { setAlert } = useContext(AlertContext);

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert("Please type Something...", "ERROR");
        } else {
            //todo - search users
            searchUsers(text);
            setText('');
        }
    }



    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8 '>
            <div>
                <h2 className='text-3xl pb-8 font-bold tracking-wide'>Github finder Application</h2>

                <form className='form-control' onSubmit={handleSubmit}>
                    <div className="relative">
                        <input type="text"
                            className="w-full pr-40 bg-gray-200 input input-lg text-black"
                            placeholder='Search...'
                            value={text}
                            onChange={handleChange}
                        />

                        <button type='submit' className=' absolute top-0 right-0 rounded-l-none w-32 btn btn-lg'>Go</button>
                    </div>
                </form>
            </div>

            {users.length > 0 && (
                <div className='flex items-end'>
                    <button className='btn btn-ghost btn-lg' onClick={clearUsers}>
                        Clear
                    </button>
                </div>
            )}

        </div>
    )
}

export default UserSearch