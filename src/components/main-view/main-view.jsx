import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import jojoRabbit from '../../img/jojorabbit.jpg';
import tenThings from '../../img/10things.jpeg';
import bigHero6 from '../../img/bighero6.jpg';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'JoJo Rabbit', Description: 'A young German boy in the Hitler Youth whose hero and imaginary friend is the country\'s dictator is shocked to discover that his mother is hiding a Jewish girl in their home.', ImagePath: jojoRabbit, Genre: 'Comedy', Director: 'Taika Watiti'},
        { _id: 2, Title: '10 Things I Hate About You', Description: 'A pretty, popular teenager can\'t go out on a date until her ill-tempered older sister does.', ImagePath: tenThings, Genre: 'Comedy', Director: 'Gil Junger'},
        { _id: 3, Title: 'Big Hero 6', Description: 'A special bond develops between plus-sized inflatable robot Baymax and prodigy Hiro Hamada, who together team up with a group of friends to form a band of high-tech heroes.', ImagePath: bigHero6, Genre: 'Animated', Director: 'Don Hall'}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

    if (movies.length === 0) return <div className='main-view'>The list is empty!</div>;
    
    return (
      <div className="main-view">
        {movies.map((movie) => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
      </div>
    );
  }
}