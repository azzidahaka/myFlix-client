import React from 'react'

export const UserInfo =({name, email}) =>{
    return (
        <>
        <h4>Your Info</h4>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        </>
    )
}