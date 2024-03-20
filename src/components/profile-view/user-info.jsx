import React from 'react'
import PropTypes from 'prop-types';

export const UserInfo =({name, email}) =>{
    return (
        <>
        <h4>Your Info</h4>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        </>
    )
}
//Define the prop types expected by the component
UserInfo.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};