import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">404 Page Not Found</h1>
          <p className="lead text-center">The page you are looking for does not exist.</p>
          
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
