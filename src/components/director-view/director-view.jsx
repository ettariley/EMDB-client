import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {

  getFormattedYear(year) {
    const d = new Date(year); 
    return d.getFullYear();
  }
  
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card bg='dark' text='light' border='light' className='director-card'>
        <Card.Body>
          <Card.Title>Director: {director.Name}</Card.Title>
          <Card.Text>
            <span className='label'>Bio: </span>
            <span className='value'>{director.Bio}</span>
          </Card.Text>
          <Card.Text>
            <span className='label'>Birth Year: </span>
            <span className='value'>{this.getFormattedYear(director.Birth)}</span>
          </Card.Text>
          <Button variant='custom-primary' size='lg' onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
  );

  }

}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};