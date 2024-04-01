import { useState } from 'react';
import { Button, Form, Row, Col, Card, CardBody, Container } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      UserName: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    fetch('https://the-movies-flix-a42e388950f3.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        return response.text().then((errorText) => {
          throw new Error(errorText);
        });
      }
      alert('Signup successful');
      navigate('/login');
    }).catch(error => {
      alert('Signup failed: ' + error.message);
    });

  };

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId='formBirthday'>
                <Form.Label> Birthday:</Form.Label>
                <Form.Control
                  type='date'
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId='formEmail'>
                <Form.Label> Email:</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type='submit'>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
