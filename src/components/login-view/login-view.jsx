import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
export const LoginView = ({ onLoggedIn, onNewClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault(); //prevents the default behavior of the form which is to reload the entire page
    //data object stores user input and passes it to api
    const data = {
      UserName: username,
      Password: password,
    };

    fetch('https://the-movies-flix-a42e388950f3.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          //storing user and token in localStorage object,
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formUsername'>
        <Form.Label> Username:</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)} //set username state with user input
          required
          minLength='3'
        />
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Label> Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} //set password state with user input
          required
        />
      </Form.Group>
      <button type='submit'>Submit</button>
    </Form>
  );
};
