import { React } from 'react';
import * as ROUTES from '../constants/routes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Admin() {
    return  (

        <Container style={{ marginTop: '100px' }}>
          <Row>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><i className="bi bi-person-fill"></i>User</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="danger" href={ROUTES.USERS}>Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><i className="bi bi-camera-video"></i>Contents</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="danger" href={ROUTES.CONTENTS}>Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><i className="bi bi-person-fill"></i>Distributors</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="danger" href={ROUTES.DISTRIBUTORS}>Details</Button>
                    </Card.Body>
                </Card>
            </Col>

          </Row>
        </Container>
      );
}
