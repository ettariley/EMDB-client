import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import jojoRabbit from '../../img/jojorabbit.jpg';
import tenThings from '../../img/10things.jpeg';
import bigHero6 from '../../img/bighero6.jpg';

export class MainView extends React.Component {

  constructor(){
    super();
    // Set initial states to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount(){
    axios.get('https://ettasmoviedb.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    // If there is no user logged in, LoginView is rendered.
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before movies are loaded
    if (movies.length === 0) return <div className='main-view' />;
    
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map((movie) => 
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
            )
          }
      </div>
    );
  }
}