import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setToken } from '../../redux/reducers/user';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export const UpdateUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const [formUser, setformUser] = useState({ UserName: '', Password: '', Email: '', Birthday: '' });
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const handleDelete = (user) => {
    fetch(`https://the-movies-flix-a42e388950f3.herokuapp.com/users/${user.UserName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        // If the response is ok, clear the local storage
        alert('Your account has been deleted.');
        localStorage.clear();
        dispatch(setUserData(null));
        dispatch(setToken(null));
        navigate('/login');

      } else {
        alert('Something went wrong.');
      }
    });
  };
  //const [date, setDate] = useState(user.Birthday); //splits the date from the time and stores it in a variable
  const handleSubmit = (event) => {
    event.preventDefault(); //prevents the default behavior of the form which is to reload the entire page
    //data object stores user input and passes it to api

    fetch(`https://the-movies-flix-a42e388950f3.herokuapp.com/users/${user.UserName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formUser),
    })
      .then((response) => response.json())
      .then((data) => {
        //storing user in localStorage object,
        setformUser({ UserName: '', Password: '', Email: '', Birthday: '' });
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(setUserData(data));
      })
      .catch((e) => {
        console.log(e);
        alert('Something went wrong');
      });
  };

  return (
    <>
      {' '}
      <Form
        className='profile-form'
        onSubmit={handleSubmit}>
        <h2>Want to change some info?</h2>
        <Form.Group controlId='formUsername'>
          <Form.Label> Username:</Form.Label>
          <Form.Control
            type='text'
            value={formUser.UserName}
            onChange={(e) => setformUser({ ...formUser, UserName: e.target.value })} //set username state with user input
            required
            minLength='3'
          />
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Label> Password:</Form.Label>
          <Form.Control
            type='password'
            value={formUser.Password}
            onChange={(e) => setformUser({ ...formUser, Password: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId='formEmail'>
          <Form.Label> Email:</Form.Label>
          <Form.Control
            type='email'
            value={formUser.Email}
            onChange={(e) => setformUser({ ...formUser, Email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId='formBirthday'>
          <Form.Label> Birthday:</Form.Label>
          <Form.Control
            type='date'
            value={formUser.Birthday}
            onChange={(e) => setformUser({ ...formUser, Birthday: e.target.value.split('T')[0] })}
            required
          />
        </Form.Group>
        <Button type='submit'>Update</Button>
      </Form>
      <Button onClick={() => handleDelete(user)}>Delete Account</Button>
    </>
  );
};
