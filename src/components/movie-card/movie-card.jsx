import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';

//MovieCard components
export const MovieCard = ({ movie }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [favorite, setFavorite] = useState(user.FavoriteMovies.includes(movie._id));
  const addFavorite = (movieId) => {
    const token = localStorage.getItem('token');

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
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Card className='h-100 '>
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img
          variant='top'
          src={movie.ImagePath}
        />
      </Link>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Card.Text>{movie.Genre.Name}</Card.Text>

        <Row>{!favorite && <Button onClick={() => addFavorite(movie._id)}>Favorite</Button>}</Row>
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
