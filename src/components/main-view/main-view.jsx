import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Return bool if movie genre are the same as long as the name is not the same
const checkMovies = (movie, selected) => {
  return movie.Genre.Name === selected.Genre.Name && movie._id !== selected._id;
};

export const MainView = () => {
  //assign variables the value saved in localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  //check if  there is data in localStorage and set state as local Storage if true or null if false
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newUser, setNewUser] = useState(null);
  useEffect(() => {
    if (!token) return; //return if token is empty

    fetch('https://the-movies-flix-a42e388950f3.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((moviesFromApi) => {
        setMovies(moviesFromApi);
      });
  }, [token]); //a dependency array that calls fetch every time token changes
  //Start on login page if there is no active user
  const similarMovies = selectedMovie ? movies.filter((movie) => checkMovies(movie, selectedMovie)) : [];
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className='align-items-center justify-content-center vh-100 flex-shrink-0 '>
        <Routes>
          <Route
            path='/signup'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <LoginView
                      //set created user and token
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/movies/:title'
            element={
              <>
                {!user ? (
                  <Navigate
                    to='/login'
                    replace
                  />
                ) : (
                  (() => {
                    return (
                      <Col md={8}>
                        <MovieView movie={selectedMovie} />
                        {/* Check if there are similar movies and render accordinly */}
                        {similarMovies.length !== 0 && (
                          <>
                            <h2>Similar Movies</h2>
                            <Row>
                              {similarMovies.map((movie) => (
                                <Col
                                  className='mb-4 '
                                  key={movie._id}
                                  md={3}>
                                  <MovieCard movie={movie} />
                                </Col>
                              ))}
                            </Row>
                          </>
                        )}
                      </Col>
                    );
                  })()
                )}
              </>
            }
          />
          <Route
            path='/'
            element={
              <>
                {!user ? (
                  <Navigate
                    to='/login'
                    replace
                  />
                ) : (
                  <>
                    <Row className='align-item-stretch'>
                      {movies.map((movie) => (
                        <Col
                          className='mb-4 '
                          key={movie._id}
                          md={3}>
                          <MovieCard
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                          />
                        </Col>
                      ))}
                      {/* set user and token to null on logout click */}
                    </Row>
                    <button
                      style={{ width: '100px', height: '30px' }}
                      onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}>
                      Logout
                    </button>
                  </>
                )}
              </>
            }
          />
          <Route
            path='/users'
            element={
            <ProfileView user={user} movie={movies}/>
          />
        </Routes>
      </Row>{' '}
    </BrowserRouter>
  );
};
