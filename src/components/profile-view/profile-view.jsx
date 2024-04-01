import PropTypes from 'prop-types';
import { useState } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { FavoriteMovies } from './favorite-movies';
import { UserInfo } from './user-info';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, Card, CardBody, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { UpdateUser } from './update-user';

export const ProfileView = () => {
  const user = useSelector((state) => state.user.userData);
  const movies = useSelector((state) => state.movies.list);
 // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const favoriteMoviesList = movies.filter((m) => user.FavoriteMovies.includes(m._id));
  console.log('favoriteMoviesList', user)
  return (
    <Container>
      <Row className='user-info'>
        <Col
          xs={12}
          sm={4}>
          <UserInfo   />
        </Col>
        <Col
          xs={12}
          sm={4}>
          <UpdateUser
          />
        </Col>
      </Row>

      {favoriteMoviesList.length !== 0 && (
      <FavoriteMovies favoriteMoviesList={favoriteMoviesList} />)}
    </Container>
  );
};

