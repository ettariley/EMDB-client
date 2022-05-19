import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

  getFormattedYear(year) {
    const d = new Date(year); 
    return d.getFullYear();
  }

  render() {
    const { movie, user, onBackClick, addFavoriteMovie } = this.props;
    return (
      <Container className='movie-view'>
        <Row className='movie-view-row'>
          <Col md={6}>
              <img className='movie-poster' src={movie.ImageURL} />
          </Col>
          <Col md={6} className='movie-info'>
            <div className='movie-title'>
              <span className='value'>{movie.Title}</span>
            </div>
            <div className='movie-description'>
              <span className='label'>Description: </span>
              <span className='value'>{movie.Description}</span>
            </div>
            <div className='movie-genre'>
              <span className='label'>Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <span className='value'>{movie.Genre.Name}</span>
              </Link>
            </div>
            <div className='movie-director'>
              <span className='label'>Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <span className='value'>{movie.Director.Name}</span>
              </Link>
            </div>
            <div className='movie-release-year'>
              <span className='label'>Release Year: </span>
              <span className='value'>{this.getFormattedYear(movie.ReleaseYear)}</span>
            </div>
            <div>
              <Button variant='secondary' onClick={(e) => { addFavoriteMovie(e, movie, user) }}>Add to Your Favorites</Button>
            </div>
            <Button variant='custom-primary' onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string
    }).isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    Actors: PropTypes.array,
    ImageURL: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};