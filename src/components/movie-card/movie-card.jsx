import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import './movie-card.scss'

export class MovieCard extends React.Component {
  // isFeatured() {
  //   return movie.Featured;
  // }
  
  render() {
    const { movie } = this.props;
    
    return (
      <Col md={4}>
        <Card bg='dark' text='light' border='light' className='movie-card'>
          <Card.Img variant="top" src={movie.ImageURL} />
          <Card.Body>
            <Card.Title>
              <Link to={`/movies/${movie._id}`}>
                {movie.Title}
              </Link>
            </Card.Title>
            {movie.Featured && <Card.Text className='featured'>Featured!</Card.Text>}
            <Card.Text>{movie.Description}</Card.Text>
            
          </Card.Body>
        </Card>
      </Col>
      );
  }
}

MovieCard.propTypes = {
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
};