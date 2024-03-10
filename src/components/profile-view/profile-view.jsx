import PropTypes from 'prop-types';
import { useState } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, Card, CardBody, Container } from 'react-bootstrap';

export const ProfileView = ({ user, movie }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');


  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>
             Username: {user.UserName}
            </Card.Title>
            
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card>
            <CardBody>
                <MovieView movie={movie}/>
            </CardBody>
        </Card>
      </Row>
    </Container>
  );
};

//Def
