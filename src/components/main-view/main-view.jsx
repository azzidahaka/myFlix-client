import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
//Return bool if movie genre are the same as long as the name is not the same
const checkMovies = (movie, selected) => {
  return movie.Genre.Name === selected.Genre.Name && movie._id !== selected._id;
};

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch('https://the-movies-flix-a42e388950f3.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data;
        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) {
    //filter movies by genre
    let similarMovies = movies.filter((movie) => checkMovies(movie, selectedMovie));
    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
