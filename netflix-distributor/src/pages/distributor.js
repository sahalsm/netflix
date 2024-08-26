import { React, useState, useContext } from 'react';
import * as ROUTES from '../constants/routes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { SelectProfileContiner } from '../containers/profiles';
import { Header } from '../components';
import logo from '../logo.svg';
import { FirebaseContext } from '../context/firebase';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Distributor() {

    const [profile, setProfile] = useState({});
    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};
    return profile.displayName ? (
        <>
        <Header.Frame>
            <Header.Group>
                <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
    
            </Header.Group>
            <Header.Group>
                <Header.Profile>
                <Header.Picture src={user.photoURL} />
                <Header.Dropdown>
                    <Header.Group>
                        <Header.Picture src={user.photoURL} />
                        <Header.TextLink>{user.displayName}</Header.TextLink>
                    </Header.Group>
                    <Header.Group>
                        <Header.TextLink onClick={() => firebase.auth().signOut()}>Sign out</Header.TextLink>
                    </Header.Group>
                </Header.Dropdown>
                </Header.Profile>
            </Header.Group>
        </Header.Frame>

        <Container style={{ marginTop: '100px' }}>
          <Row>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><i className="bi bi-plus-circle"></i>Add Content</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="danger" href={`${ROUTES.ADD_CONTENT}?userEmail=${user.email}`}>Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><i className="bi bi-eye"></i>View Contents</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="danger" href={`${ROUTES.VIEW_CONTENTS}?userEmail=${user.email}`}>Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><i className="bi bi-credit-card"></i>Payment</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="danger" href={ROUTES.PAYMENT}>Details</Button>
                    </Card.Body>
                </Card>
            </Col>

          </Row>
        </Container>
      </>
) : (
    <SelectProfileContiner user={user} setProfile={setProfile}/>
);


}
