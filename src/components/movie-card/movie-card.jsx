import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

//MovieCard components
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
    <Card.Img variant="top" src={movie.ImagePath} />
    <Card.Body>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Text>{movie.Director.Name}</Card.Text>
      <Card.Text>{movie.Genre.Name}</Card.Text>
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
  onMovieClick: PropTypes.func.isRequired,
};
