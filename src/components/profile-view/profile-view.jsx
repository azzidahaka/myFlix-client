import { FavoriteMovies } from './favorite-movies';
import { UserInfo } from './user-info';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { UpdateUser } from './update-user';
export const ProfileView = () => {
  const user = useSelector((state) => state.user.userData);
  const movies = useSelector((state) => state.movies.list);
  const favoriteMoviesList = movies.filter((m) => user.FavoriteMovies.includes(m._id));
  console.log('favoriteMoviesList', user);
  return (
    <Container>
      <Row className='user-info'>
        <Col
          xs={12}
          sm={4}>
          <UserInfo />
        </Col>
        <Col
          xs={12}
          sm={4}>
          <UpdateUser />
        </Col>
      </Row>
      {favoriteMoviesList.length !== 0 && <FavoriteMovies favoriteMoviesList={favoriteMoviesList} />}
    </Container>
  );
};
