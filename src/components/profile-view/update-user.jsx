import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

export const UpdateUser = ({ user, setUser }) => {
  const [userD, setUserD] = useState({ UserName: '', Password: '', Email: '', Birthday: '' });

  //const [date, setDate] = useState(user.Birthday); //splits the date from the time and stores it in a variable
  const handleSubmit = (event) => {
    event.preventDefault(); //prevents the default behavior of the form which is to reload the entire page
    //data object stores user input and passes it to api
    const token = localStorage.getItem('token');

    fetch(`https://the-movies-flix-a42e388950f3.herokuapp.com/users/${user.UserName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userD),
    })
      .then((response) => response.json())
      .then((data) => {
        //storing user and token in localStorage object,
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setUserD({ UserName: '', Password: '', Email: '', Birthday: '' });
      })
      .catch((e) => {
        console.log(e);
        alert('Something went wrong');
      });
  };
  
  return (
    <Form
      className='profile-form'
      onSubmit={handleSubmit}>
      <h2>Want to change some info?</h2>
      <Form.Group controlId='formUsername'>
        <Form.Label> Username:</Form.Label>
        <Form.Control
          type='text'
          value={userD.UserName}
          onChange={(e) => setUserD({ ...userD, UserName: e.target.value })} //set username state with user input
          required
          minLength='3'
        />
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Label> Password:</Form.Label>
        <Form.Control
          type='password'
          value={userD.Password}
          onChange={(e) => setUserD({ ...userD, Password: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group controlId='formEmail'>
        <Form.Label> Email:</Form.Label>
        <Form.Control
          type='email'
          value={userD.Email}
          onChange={(e) => setUserD({ ...userD, Email: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group controlId='formBirthday'>
        <Form.Label> Birthday:</Form.Label>
        <Form.Control
          type='date'
          value={userD.Birthday}
          onChange={(e) => setUserD({ ...userD, Birthday: e.target.value.split('T')[0] })}
          required
        />
      </Form.Group>
      <button type='submit'>Update</button>
    </Form>
  );
};
