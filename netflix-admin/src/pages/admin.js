import { React, useState, useContext } from 'react';
import * as ROUTES from '../constants/routes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../logo.svg';
import { FirebaseContext } from '../context/firebase';
import { SelectProfileContiner } from '../containers/profiles';
import { FooterContainer } from '../containers/footer';
import { Header } from '../components';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Admin() {

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
                        <Card.Title><i className="bi bi-person-fill"></i> User</Card.Title>
                        <Card.Text>
                        View all the registered users in Netflix
                        </Card.Text>
                        <Button variant="danger" href={ROUTES.USERS}>Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><i className="bi bi-camera-video"></i> Contents</Card.Title>
                        <Card.Text>
                        View, Update and Delete all the contents available in Netflix.
                        </Card.Text>
                        <Button variant="danger" href={ROUTES.CONTENTS}>Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title><i className="bi bi-person-fill"></i> Distributors</Card.Title>
                        <Card.Text>
                        View and Delete all the registed Distributors partners. 
                        </Card.Text>
                        <Button variant="danger" href={ROUTES.DISTRIBUTORS}>Details</Button>
                    </Card.Body>
                </Card>
            </Col>

          </Row>
        </Container>
        <FooterContainer />
        </>
        ) : (
            <SelectProfileContiner user={user} setProfile={setProfile}/>
        );
}
