import { Navbar, Container, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData,setToken } from '../../redux/reducers/user';

export const NavigationBar = () => {
  user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log('navbar user:', user);
  return (
    <Navbar
      bg='dark'
      expand='lg'
      data-bs-theme='dark'
      fixed='top'>
      <Container>
        <Navbar.Brand
          as={Link}
          to='/'>
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {!user.userData && (
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
            {user.userData && (
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
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    localStorage.clear();
                    dispatch(setToken(null));
                    dispatch(setUserData(null));
                  }}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
