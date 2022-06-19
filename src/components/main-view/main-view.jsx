import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { UserRegistrationView } from '../user-registration-view/user-registration-view';
import ProfileView from '../profile-view/profile-view';
import { Navbar } from '../navbar/navbar';
import { Row, Col, Button } from 'react-bootstrap';

import './main-view.scss';

class MainView extends React.Component {

  constructor(){
    super();
    // Set initial states to null
    this.state = {
      favoriteMovies: [],
      selectedMovie: null,
    }
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://ettasmoviedb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    // Assign results to the state
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  addFavoriteMovie(e, movie, user) {
    const token = localStorage.getItem('token');
    axios.post(`https://ettasmoviedb.herokuapp.com/users/${user}/movies/${movie._id}`, {
      FavoriteMovies: movie._id
    }, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      alert('Movie added to your favorites list.');
    })
    .catch(e => {
      console.error(e);
      alert('Unable to add movie to list');
    });
  }

  onLoggedIn(authData) {
    console.log(authData)
    this.props.setUser(authData.user.Username);
    // Save user data to local storage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    // Load movies
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser(null);
  }

  render() {
    let { movies, user } = this.props;
    
    return (
      <Router>
        <Navbar user={user} />
        <Row className="main-view justify-content-center">
          <Route exact path="/" render={() => {
            // If there is no user logged in, LoginView is rendered.
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            // Before movies are loaded
            if (movies.length === 0) return <div className='main-view' />;

            // Show movies
            return <MoviesList movies={movies} />;
          }} />
          
          {/* User Registration View */}
          <Route path="/register" render={() => {
            if (user) return <Redirect to='/' />
            return <UserRegistrationView />
          }} />

          {/* Movie View */}
          <Route path="/movies/:movieId" render={({ match, history }) => {
            // If there is no user logged in, LoginView is rendered.
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            // Before movies are loaded
            if (movies.length === 0) return <div className='main-view' />;

            return <MovieView user={user} movie={movies.find(m => m._id === match.params.movieId)} addFavoriteMovie={this.addFavoriteMovie} onBackClick={() => history.goBack()} />
          }} />

          {/* Genre View */}
          <Route path="/genres/:name" render={({ match, history }) => {
            // If there is no user logged in, LoginView is rendered.
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            // Before movies are loaded
            if (movies.length === 0) return <div className='main-view' />;
            
            return <Col lg={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
            
          }} />

          {/* Director View */}
          <Route path="/directors/:name" render={({ match, history }) => {
            // If there is no user logged in, LoginView is rendered.
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            // Before movies are loaded
            if (movies.length === 0) return <div className='main-view' />;
            
            return <Col lg={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* User Profile View */}
          <Route path={`/users/${user}`} render={({ history }) => {
            // If there is no user logged in, LoginView is rendered.
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            // Before movies are loaded
            if (movies.length === 0) return <div className='main-view' />;
            
            return <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
          }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);