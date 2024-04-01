import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col, Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movies, checkMovies }) => {
  const { movieID } = useParams();
  const movie = movies.find((m) => m._id === movieID);
  if (!movie) {
    return (
      <>
        <div>Movie not found</div>
        <Link to={`/`}>
          <Button className='back-button'>Back</Button>
        </Link>
      </>
    );
  }

  const similarMovies = movies.filter((m) => checkMovies(m, movie));

  return (
    <Container>
      <Row className='movie-info'>
        <Col>
          <div>
            <h1>{movie.Title}</h1>
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
            <Button className='back-button'>Back</Button>
          </Link>
        </Col>
        <Col>
          <img
            src={movie.ImagePath}
            alt={movie.Title}
            height='400px'
          />
        </Col>
        {/* Check if there are similar movies and render accordinly */}
      </Row>
      {similarMovies.length !== 0 && (
        <>
          <h2>Similar Movies</h2>
          <Row>
            {similarMovies.map((movie) => (
              <Col
                className='mb-4 '
                key={movie._id}
                md={6} xs={7} sm={5}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

//Define props constraint for view
MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  checkMovies: PropTypes.func.isRequired,
};
