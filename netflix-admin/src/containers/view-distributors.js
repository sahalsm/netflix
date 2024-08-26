import React, { useState, useContext, useEffect } from 'react';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';
import { FirebaseContext } from '../context/firebase';
import { SelectProfileContiner } from './profiles';
import { FooterContainer } from './footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { useMongoDistributor } from "../hooks";
import { userServiceDeleteUser } from '../services';

export function ViewDistributorContainer() {

  const [usersData, setUsersData] = useState([]); 
  const { users } = useMongoDistributor('users');
//   const { distributers } = useMongoUser('distributers');
  const [profile, setProfile] = useState({});
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  useEffect(() => {
    if (users) {
        setUsersData(Array.isArray(users) ? users : Object.values(users)); // Ensure seriesData is an array
    }
    }, [users]);

  const handleDelete = async (id, email) => {
    try {
        const formData = new FormData();
        formData.append('email',email);
        await userServiceDeleteUser(formData);
        setUsersData(prevUsers => {
            const updatedUsers = Array.isArray(prevUsers) ? prevUsers.filter(item => item._id !== id) : [];
            return updatedUsers;
        });
        Swal.fire({
          title: 'Content Removed!',
          text: email + ' removed from the server',
          icon: 'success',
          confirmButtonText: 'OK'
        });
    } catch (error) {
    console.log(error)
    }
  }


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

    <Container style={{ marginTop: '20px' }}>
        <Row>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total Payments</th>
                            <th>Total Earnings</th>
                            <th>Total Contents</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { usersData.map((item, index) => (
                                <tr key={item._id || item.email}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.payment_list.length}</td>
                                    <td>{item.payment_list.length * 0.01} ETH</td>
                                    <td>{item.content_id.length} </td>
                                    <td><Button variant="danger" onClick={()=>handleDelete(item._id, item.email)}>Delete</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
        <Row>
            <Col>
            </Col>
        </Row>
    </Container>

    <FooterContainer />
    </>
) : (
    <SelectProfileContiner user={user} setProfile={setProfile}/>
);


}