import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

//MovieCard components
export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100 ">
    <Card.Img variant="top" src={movie.ImagePath} />
    <Card.Body>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Text>{movie.Director.Name}</Card.Text>
      <Card.Text>{movie.Genre.Name}</Card.Text>
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
      </Link>
    </Card.Body>
  </Card>
  );
};

//Define props constraint for moviecard
// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     Title: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }).isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired
// };
