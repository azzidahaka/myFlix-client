import PropTypes from 'prop-types';
import { useState } from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { FavoriteMovies } from './favorite-movies';
import { UserInfo } from './user-info';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, Card, CardBody, Container } from 'react-bootstrap';

export const ProfileView = ({ movies, onUpdatedUserInfo }) => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState('');

  return (
    <>
      <UserInfo
        name={user.UserName}
        email={user.Email}
      />
        <FavoriteMovies
            favoriteMovies={favoriteMovies}/>
    </>
  );
};

//Def
