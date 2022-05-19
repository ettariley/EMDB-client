import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export function FavoriteMovies({ favoriteMoviesList, removeFav }) {
  return (
      <>
        <Row className="fave-movie-title">
          <h3>Favorite Movies</h3>
        </Row>
        <Row>
            {favoriteMoviesList.map(movie => {
                return (
                  <Col md={4} className='favorite-movie-card'>
                      <Card bg='dark' text='light' border='light'>
                      <Card.Img variant="top" src={movie.ImageURL} />
                      <Card.Body>
                        <Card.Title>
                          <Link to={`/movies/${movie._id}`}>
                            {movie.Title}
                          </Link>
                        </Card.Title>  
                        <Button variant="outline-danger" onClick={(e) => removeFav(e, movie._id)}>Remove from Favorites</Button>          
                      </Card.Body>
                    </Card> 
                  </Col>                 
                )
              })
            }
        </Row>
      </>
  );
}