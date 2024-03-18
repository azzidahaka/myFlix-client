import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';

export const MovieView = ({ movies, checkMovies }) => {
  const { movieID } = useParams();

  console.log(movies);
  console.log('ID: ' + movieID);
  const movie = movies.find((m) => m._id === movieID);
  const similarMovies = movies.filter((m) => checkMovies(m, movie));
  console.log(similarMovies);
  return (
    <div>
      <div>
        <img
          src={movie.ImagePath}
          alt={movie.Title}
          height='400px'
        />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <Link to={`/`}>
        <button className='back-button'>Back</button>
      </Link>
      {/* Check if there are similar movies and render accordinly */}
      {similarMovies.length !== 0 && (
        <>
          <h2>Similar Movies</h2>
          <Row>
            {similarMovies.map((movie) => (
              <Col
                className='mb-4 '
                key={movie._id}
                md={4}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

//Define props constraint for view
//  MovieView.propTypes = {
//   movie: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     Title: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired
//     }).isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired
//     }).isRequired,
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };
