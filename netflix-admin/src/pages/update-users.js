import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as ROUTES from '../constants/routes';
import { useUserData } from "../hooks";
import contentServiceUpdateContent from '../services/contents/contents-service-update-content';
import Swal from 'sweetalert2';

export default function UpdateUsers() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const contentSlug = queryParams.get('email');

    // Fetching content data
    const fetcheduser = useUserData();

    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        genre: '',
        maturity: 0,
        slug: '',
        display_picture: '',
        cover_picture: ''
    });


    // Set form data when content is fetched
    useEffect(() => {
        if (fetchedContent) {
            setFormData(fetchedContent);
        }
    }, [fetchedContent]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.files[0])
        if(name == "display_picture" || name == "cover_picture"){
            setFormData({
                ...formData,
                [name]: URL.createObjectURL(e.target.files[0]),
            });
            if(name == "cover_picture"){
                setcover_picture_preview(URL.createObjectURL(e.target.files[0]));
            }else{
                setdisplay_picture_preview(URL.createObjectURL(e.target.files[0]));
            }
        }else{
            setFormData({
            ...formData,
            [name]: value,
            });
        }

        console.log(value)
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataObj = new FormData();
            formDataObj.append('target',collection);
            formDataObj.append('id',fetchedContent._id);
            formDataObj.append('title',formData.title);
            formDataObj.append('description',formData.description);
            formDataObj.append('genre',formData.genre);
            formDataObj.append('maturity',formData.maturity);
            formDataObj.append('slug',formData.slug);
            await contentServiceUpdateContent(formDataObj);
            Swal.fire({
            title: 'Content Updated!',
            text: formData.title + ' Updated!',
            icon: 'success',
            confirmButtonText: 'OK'
            });
            navigate(ROUTES.CONTENTS); 
        } catch (error) {
            console.log(error)
        }
        };

    return (
        <Container style={{ marginTop: '100px' }}>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Display Picture</Form.Label>
                                <Form.Control type="file" name='display_picture' onChange={handleChange}/>
                                <img 
                                    src={display_picture_preview || `/images/${collection}/${formData.genre}/${formData.slug}/small.jpg`} 
                                    style={{ width: "330px", height: "250px" }} 
                                    alt="Display"
                                />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3" style={{ marginLeft: '100px' }}>
                                <Form.Label>Cover Picture</Form.Label>
                                <Form.Control type="file" name='cover_picture' onChange={handleChange}/>
                                <img 
                                    src={cover_picture_preview || `/images/${collection}/${formData.genre}/${formData.slug}/large.jpg`} 
                                    style={{ width: "860px", height: "250px" }} 
                                    alt="Display"
                                />
                            </Form.Group>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                            <Form.Control
                                name="title"
                                placeholder="Title"
                                aria-label="Title"
                                value={formData.title}
                                onChange={handleChange}
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Description</InputGroup.Text>
                            <Form.Control 
                                as="textarea" 
                                name="description"
                                aria-label="With textarea" 
                                value={formData.description} 
                                onChange={handleChange}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Genre</InputGroup.Text>
                            <Form.Control
                                name="genre"
                                placeholder="Genre"
                                aria-label="Genre"
                                value={formData.genre}
                                onChange={handleChange}
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Maturity</InputGroup.Text>
                            <Form.Control
                                name="maturity"
                                placeholder="Maturity"
                                aria-label="Maturity"
                                type="number" 
                                value={formData.maturity}
                                onChange={handleChange}
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Slug</InputGroup.Text>
                            <Form.Control
                                name="slug"
                                placeholder="Slug"
                                aria-label="Slug"
                                value={formData.slug}
                                onChange={handleChange}
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}