import React, { useEffect, useState} from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import { connect } from "react-redux";
import './profile-view.scss';

function ProfileView(props) {
  const [userInfo, setUserInfo] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
  let { user, movies } = props;
  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getUserInfo = (token, user) => {
    axios.get(`https://ettasmoviedb.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      setUserInfo(response.data);
      setUpdatedUser(response.data);
      setFavoriteMoviesList(movies.filter(m => response.data.FavoriteMovies.includes(m._id)));
    })
    .catch(e => {
      console.error(e);
    });  
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`https://ettasmoviedb.herokuapp.com/users/${user}`, updatedUser)
      .then(response => {
        setUserInfo(response.data);
        alert('Profile Updated. You will be redirected to log in with your new information.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
    })
    .catch(e => {
      console.error(e);
    });    
  }

  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
  }
  
  const deleteUser = (e) => {
    axios.delete(`https://ettasmoviedb.herokuapp.com/users/${userInfo.Username}`)
    .then(response => {
      alert("Profile deleted");
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.open('/', '_self');
    })
    .catch(e => {
      console.error(e);
      alert('Unable to delete user');
    });  
  }

  const removeFav = (e, id) => {
    axios.delete(`https://ettasmoviedb.herokuapp.com/users/${userInfo.Username}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      setFavoriteMoviesList(favoriteMoviesList.filter(movie => movie._id != id));
    })
    .catch(e => {
      console.error(e);
      alert('Unable to delete movie');
    });
  }

  useEffect(() => {
    if (token !== null) {
      getUserInfo(token, user);
    } else {
      console.log('Not authorized');
    }
  }, []);

  return (
    <Container className='profile-container'>
      <Row className='profile-row'>
        <Col xs={12} sm={4}>
          <UserInfo userInfo={userInfo} />
          <Button variant="danger" type="submit" onClick={deleteUser}>Delete Profile</Button>
        </Col>
        <Col xs={12} sm={8}>
          <UpdateUser userInfo={userInfo} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
        </Col>          
      </Row>
      <FavoriteMovies favoriteMoviesList={favoriteMoviesList} removeFav={removeFav} />
    </Container>    
  );
}

let mapStateToProps = state => {
  return { user: state.user, movies: state.movies};
}

export default connect(mapStateToProps)(ProfileView);