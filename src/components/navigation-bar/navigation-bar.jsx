import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setToken } from '../../redux/reducers/user';
import { MoviesFilter } from '../movies-filter/movies-filter';
export const NavigationBar = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  return (
    <Navbar
      bg='dark'
      expand='lg'
      data-bs-theme='dark'
      fixed='top'>
      <>
        <Navbar.Brand
          as={Link}
          to='/'
          style={{ paddingLeft: '20px' }}>
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {!user && (
              <>
                <Nav.Link
                  as={Link}
                  to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/signup'>
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link
                  as={Link}
                  to='/'>
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/users/'>
                  Profile
                </Nav.Link>{' '}
                <Nav.Link
                  onClick={() => {
                    localStorage.clear();
                    dispatch(setToken(null));
                    dispatch(setUserData(null));
                  }}>
                  Logout
                </Nav.Link>{' '}
                <MoviesFilter />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </>
    </Navbar>
  );
};
