import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import './genre-view.scss'

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Card bg='dark' text='light' border='light' className='genre-card'>
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>
            <span className='label'>Description: </span>
            <span className='value'>{genre.Description}</span>
          </Card.Text>
          <Button variant='custom-primary' size='lg' onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
  );

  }

}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};