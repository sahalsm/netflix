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
import contentServiceDeleteContent from '../services/contents/contents-service-delete-content';
import Swal from 'sweetalert2';
import { useMongoContent } from "../hooks";

export function ViewContentContainer() {
  const { series } = useMongoContent('series');
  const { films } = useMongoContent('films');
  const [seriesData, setSeriesData] = useState([]); 
  const [filmsData, setFilmsData] = useState([]); 
  const [profile, setProfile] = useState({});
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};


  useEffect(() => {
    if (series) {
        setSeriesData(Array.isArray(series) ? series : Object.values(series)); // Ensure seriesData is an array
    }
    }, [series]);
  useEffect(() => {
    if (films) {
        setFilmsData(Array.isArray(films) ? films : Object.values(films)); // Ensure seriesData is an array
    }
    }, [films]);

  const [isSeries, setisSeries] = useState(true);

  const handleClickSeries = () => {
      setisSeries(true);
  };
  const handleClickFilms = () => {
      setisSeries(false);
  }

  const handleDelete = async (id, collection, title) => {
    try {
        const formData = new FormData();
        formData.append('id',id);
        formData.append('collection',collection);
        await contentServiceDeleteContent(formData);
        setSeriesData(prevSeries => {
            const updatedSeries = Array.isArray(prevSeries) ? prevSeries.filter(item => item._id !== id) : [];
            return updatedSeries;
        });
        setFilmsData(prevSeries => {
            const updatedSeries = Array.isArray(prevSeries) ? prevSeries.filter(item => item._id !== id) : [];
            return updatedSeries;
        });
        Swal.fire({
          title: 'Content Removed!',
          text: title + ' removed from the server',
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
                <Button variant={isSeries? 'dark' : 'light'} onClick={handleClickSeries} style={{marginRight: '10px'}}>
                    Series
                </Button>
                <Button variant={isSeries? 'light' : 'dark'} onClick={handleClickFilms}>
                    Films
                </Button>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Genre</th>
                            <th>Maturity</th>
                            <th>Slug</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSeries ? 
                            seriesData.map((item, index) => (
                                <tr key={item._id || item.slug}>
                                    <td>{index + 1}</td>
                                    <td><img src={`/images/series/${item.genre}/${item.slug}/small.jpg`} alt={item.title} /></td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.maturity}</td>
                                    <td>{item.slug}</td>
                                    <td><Button variant="warning" href={`${ROUTES.UPDATE_CONTENTS}?slug=${item.slug}&collection=series`}>Edit</Button></td>
                                    <td><Button variant="danger" onClick={()=>handleDelete(item._id, "series", item.title)}>Delete</Button></td>
                                </tr>
                            )) :
                            filmsData.map((item, index) => (
                                <tr key={item._id || item.slug}>
                                    <td>{index + 1}</td>
                                    <td><img src={`/images/films/${item.genre}/${item.slug}/small.jpg`} alt={item.title} /></td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.maturity}</td>
                                    <td>{item.slug}</td>
                                    <td><Button variant="warning" href={`${ROUTES.UPDATE_CONTENTS}?slug=${item.slug}&collection=films`}>Edit</Button></td>
                                    <td><Button variant="danger" onClick={()=>handleDelete(item._id, "films", item.title)}>Delete</Button></td>
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