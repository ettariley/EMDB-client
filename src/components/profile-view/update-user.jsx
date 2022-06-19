import React from "react";
import { Card, CardGroup, Form, Button } from "react-bootstrap";

export function UpdateUser(props) {
  const userInfo = props.userInfo;
  const { handleSubmit, handleUpdate } = props;

  return (
    <CardGroup>
          <Card bg='dark' text='light' border='danger'>
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control 
                    type="text"
                    name='Username'
                    defaultValue={userInfo.Username}
                    onChange={e => handleUpdate(e)} 
                    placeholder='Username must be at least 6 characters.'
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password: </Form.Label>
                  <Form.Control 
                    type="password"
                    name="Password"
                    onChange={e => handleUpdate(e)} 
                    minLength={6}
                    placeholder='Password required when making changes.'
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email: </Form.Label>
                  <Form.Control 
                    type="email" 
                    name="Email"
                    defaultValue={userInfo.Email}
                    onChange={e => handleUpdate(e)} 
                    placeholder='Update email address.'
                  />
                </Form.Group>
                <Button variant='custom-primary' type='submit' onClick={handleSubmit}>
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
  );
}