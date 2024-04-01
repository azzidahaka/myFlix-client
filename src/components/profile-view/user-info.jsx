import React from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


export const UserInfo =() =>{
    const user = useSelector((state) => state.user.userData);
    
    return (
        <>
        <h4>Your Info</h4>
        <p>Name: {user.UserName}</p>
        <p>Email: {user.Email}</p>
        </>
    )
}
