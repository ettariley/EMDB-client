import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import './movie-card.scss'

let mapStateToProps = state => {
  return { movies: state.movies }
}

class MovieCard extends React.Component {
  
  render() {
    const { movie } = this.props;
    
    return (
      <Col className='movie-card-col'>
        <Link to={`/movies/${movie._id}`}>
          <Card bg='dark' text='light' border='light' className='movie-card'>
            <Card.Img variant="top" src={movie.ImageURL} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              {movie.Featured && <Card.Text className='featured'>Featured!</Card.Text>}
              <Card.Text>{movie.Description}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      );
  }
}

export default connect(mapStateToProps)(MovieCard);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string
    }),
    ReleaseYear: PropTypes.string.isRequired,
    Actors: PropTypes.array,
    ImageURL: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
};