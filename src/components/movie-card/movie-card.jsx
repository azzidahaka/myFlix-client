import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/reducers/user';
import './movie-card.scss';
//MovieCard components accepts movie object as props and renders the movie card
export const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const [favorite, setFavorite] = useState(user.FavoriteMovies.includes(movie._id));
  const token = useSelector((state) => state.user.token);
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
        setFavorite(false);
        dispatch(setUserData(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //Add movie to favorite list, calls the API and updates the user data
  const addFavorite = (movieId) => {
    let url = `https://the-movies-flix-a42e388950f3.herokuapp.com/users/${user.UserName}/movies/${movieId}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        //setFavorite(user.FavoriteMovies.includes(movie._id));
        setFavorite(true);
        dispatch(setUserData(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Card className='h-100 animate-card'>
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img
          variant='top'
          src={movie.ImagePath}
        />
      </Link>
      {!favorite ? (
        <i
          className='fa-regular fa-star fa-lg'
          onClick={() => addFavorite(movie._id)}></i>
      ) : (
        <i
          onClick={() => removeFavorite(movie._id)}
          className='fa-solid fa-star fa-lg'></i>
      )}
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Card.Text style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          Genre: {movie.Genre.Name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
//Define props constraint for moviecard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
