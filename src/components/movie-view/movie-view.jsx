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
  //If movie is not found, render a message
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
  //Filter similar movies
  const similarMovies = movies.filter((m) => checkMovies(m, movie));
  return (
    <Container>
      <Row className='movie-info '>
        <Col>
          <div>
            <h1 className='movie-title'>{movie.Title}</h1>
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

        </Col>
        <Col
          lg={4}
          md={6}
          xs={12}
          sm={12}
          >
          <img
            src={movie.ImagePath}
            alt={movie.Title}
            height='350px'
          />

        </Col>
        {/* Check if there are similar movies and render accordinly */}
        <Link to={`/`}>
            <Button className='back-button'>Back</Button>
          </Link>
      </Row>
      {similarMovies.length !== 0 && (
        <>
          <h2>Similar Movies</h2>
          <Row>
            {similarMovies.map((movie) => (
              <Col
                className='mb-4 '
                key={movie._id}
                lg={4}
                md={6}
                xs={12}
                sm={12}>
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
