import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { MoviesList } from '../movie-list/movie-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setToken, setUserData } from '../../redux/reducers/user';
import { setMovies } from '../../redux/reducers/movies';

//Return bool if movie genre are the same as long as the name is not the same
const checkMovies = (movie, selected) => {
  return movie.Genre.Name === selected.Genre.Name && movie._id !== selected._id;
};

export const MainView = () => {
  //assign variables the value saved in localStorage
  const dispatch = useDispatch();

  //check if  there is data in localStorage and set state as local Storage if true or null if false

  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.token);
  const movies = useSelector((state) => state.movies.list);

  useEffect(() => {
    if (!token) return; //return if token is empty

    fetch('https://the-movies-flix-a42e388950f3.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((moviesFromApi) => {
        dispatch(setMovies(moviesFromApi));
      });

  }, [token]); //a dependency array that calls fetch every time token changes

  //Start on login page if there is no active user

  return (
    <BrowserRouter>
      <Row>
        <NavigationBar />
      </Row>

      <Row style={{ marginTop: 55 }}>
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
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/movies/:movieID'
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
                        <MovieView
                          movies={movies}
                          checkMovies={checkMovies}
                        />
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
                      <MoviesList />
                    </Row>
                  </>
                )}
              </>
            }
          />
          <Route
            path='/users'
            element={
              <>
                {!user ? (
                  <Navigate
                    to='/login'
                    replace
                  />
                ) : (
                  <Row>
                    <ProfileView />
                  </Row>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
