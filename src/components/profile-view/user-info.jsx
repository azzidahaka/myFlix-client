import React from 'react'
import { useSelector } from 'react-redux';
export const UserInfo =() =>{
    const user = useSelector((state) => state.user.userData);
    return (
        <>
        <h4 className='profile'>Your Info</h4>
        <p>Name: {user.UserName}</p>
        <p>Email: {user.Email}</p>
        </>
    )
}
