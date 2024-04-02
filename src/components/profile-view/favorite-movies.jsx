import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Figure, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './profile-view.scss';
import { setUserData } from '../../redux/reducers/user';
export const FavoriteMovies = ({ favoriteMoviesList }) => {
  const dispatch = useDispatch();
  //Remove movie from favorite list, calls the API and updates the user data
  const removeFavorite = (movieId) => {
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));
    let url = `https://the-movies-flix-a42e388950f3.herokuapp.com/users/${user.UserName}/movies/${movieId}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(setUserData(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {favoriteMoviesList.map((movies) => {
            return (
              <Col
                xs={12}
                md={6}
                lg={3}
                key={movies._id}
                className='fav-movie'>
                <Figure>
                  <Link to={`/movies/${movies._id}`} />
                  <Figure.Image
                    src={movies.ImagePath}
                    alt={movies.title}
                  />
                  <Figure.Caption>{movies.Title}</Figure.Caption>
                </Figure>
                <Button
                  variant='secondary'
                  onClick={() => removeFavorite(movies._id)}>
                  Remove
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};
//Define props constraint for favorite movies
FavoriteMovies.propTypes = {
  favoriteMoviesList: PropTypes.array.isRequired,
};
