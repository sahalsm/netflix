import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as ROUTES from '../constants/routes';
import contentServiceAddContent from '../services/contents/contents-service-add-content';
import Swal from 'sweetalert2';

export default function AddContent() {
    const [cover_picture_preview, setcover_picture_preview] = useState('');
    const [display_picture_preview, setdisplay_picture_preview] = useState('');
    const [video_preview, setvideo_preview] = useState(null);
    const [selectedCollection, setselectedCollection] = useState('');
    const [selectedGenre, setselectedGenre] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userEmail = queryParams.get('userEmail');

    // State to hold form data
    const [formData, setFormData] = useState({
        collection: '',
        title: '',
        description: '',
        genre: '',
        maturity: 0,
        slug: '',
        display_picture: '',
        cover_picture: '',
        distributor_id: userEmail
    });


    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name == "display_picture" || name == "cover_picture" || name == 'video' || name == "collection" || name == "genre"){
            if (name === 'collection') {
                setselectedCollection(value);
                setFormData({
                    ...formData,
                    [name]: value,
                    });
            } else if (name === 'genre') {
                setselectedGenre(value);
                setFormData({
                    ...formData,
                    [name]: value,
                    });
            } else {
                setFormData({
                    ...formData,
                    [name]: URL.createObjectURL(e.target.files[0]),
                });
                if(name === "cover_picture"){
                    setcover_picture_preview(URL.createObjectURL(e.target.files[0]));
                } else if (name === 'video') {
                    setvideo_preview(URL.createObjectURL(e.target.files[0]));
                } else{
                    setdisplay_picture_preview(URL.createObjectURL(e.target.files[0]));
                }
            }
        }else{
            setFormData({
            ...formData,
            [name]: value,
            });
        }

                // Clear error when field is corrected
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }

    };
    const renderGenreOptions = () => {
        if (selectedCollection === 'series') {
            return (
                <>
                    <option value="">Choose Genre</option>
                    <option value="documentaries">Documentaries</option>
                    <option value="comedies">Comedies</option>
                    <option value="children">Children</option>
                    <option value="crime">Crime</option>
                    <option value="feel-good">Feel-good</option>
                </>
            );
        } else if (selectedCollection === 'films') {
            return (
                <>
                    <option value="">Choose Genre</option>
                    <option value="drama">Drama</option>
                    <option value="suspense">Suspense</option>
                    <option value="children">Children</option>
                    <option value="thriller">Thriller</option>
                </>
            );
        }
    };


    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const formDataObj = new FormData();
            formDataObj.append('target',formData.collection);
            formDataObj.append('title',formData.title);
            formDataObj.append('description',formData.description);
            formDataObj.append('genre',formData.genre);
            formDataObj.append('maturity',formData.maturity);
            formDataObj.append('slug',formData.slug);
            formDataObj.append('distributor_id',formData.distributor_id);
            await contentServiceAddContent(formDataObj);
            Swal.fire({
            title: 'Content Uploaded!',
            text: formData.title + ' Uploaded!',
            icon: 'success',
            confirmButtonText: 'OK'
            });
            navigate(ROUTES.DISTRIBUTOR); 
        } catch (error) {
            console.log(error)
        }
        };

            // Validate form data
    const validate = () => {
        let formErrors = {};
        if (!formData.collection) formErrors.collection = 'Collection is required';
        if (!formData.title) formErrors.title = 'Title is required';
        if (!formData.description) formErrors.description = 'Description is required';
        if (!formData.genre) formErrors.genre = 'Genre is required';
        if (formData.maturity <= 0) formErrors.maturity = 'Maturity must be greater than 0';
        if (!formData.slug) formErrors.slug = 'Slug is required';
        if (!formData.display_picture) formErrors.display_picture = 'Display picture is required';
        if (!formData.cover_picture) formErrors.cover_picture = 'Cover picture is required';
        if (!video_preview) formErrors.video = 'Video is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };


    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h3 style={{ 
                marginTop: '20px', 
                fontSize: '48px', 
                fontWeight: 'bold',
            }}>
                ADD CONTENT
            </h3>
        </div>

        <Container style={{ marginTop: '40px' }}>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Display Picture</Form.Label>
                                <Form.Control type="file" name='display_picture' onChange={handleChange} required="true"/>
                                <img 
                                    src={display_picture_preview} 
                                    style={{ width: "330px", height: "250px" }} 
                                    alt="Display"
                                    />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3" style={{ marginLeft: '100px' }}>
                                <Form.Label>Cover Picture</Form.Label>
                                <Form.Control type="file" name='cover_picture' onChange={handleChange} required="true"/>
                                <img 
                                    src={cover_picture_preview} 
                                    style={{ width: "860px", height: "250px" }} 
                                    alt="Display"
                                    />
                            </Form.Group>
                        </InputGroup>
                        <Form.Group controlId="formSelect" className="mb-3">
                            <Form.Select value={selectedCollection} onChange={handleChange} name="collection" required="true"> 
                                <option value="">Choose Collection</option>
                                <option value="films">Films</option>
                                <option value="series">Series</option>
                            </Form.Select>
                        </Form.Group>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                            <Form.Control
                                name="title"
                                placeholder="Title"
                                aria-label="Title"
                                value={formData.title}
                                onChange={handleChange}
                                aria-describedby="basic-addon1"
                                required="true"
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
                                required="true"
                                />
                        </InputGroup>
                        <Form.Group controlId="formSelect" className="mb-3">
                            <Form.Select value={selectedGenre} onChange={handleChange} name="genre">
                            {renderGenreOptions()}
                            </Form.Select>
                        {errors.genre && <p style={{ color: 'red' }}>{errors.genre}</p>}
                        </Form.Group>
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
                                required="true"
                                />
                        {errors.maturity && <p style={{ color: 'red' }}>{errors.maturity}</p>}
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
                                required="true"
                                />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Group controlId="formFile" >
                                <Form.Label>Video</Form.Label>
                                <Form.Control type="file" name='video' onChange={handleChange} accept="video/*" required="true" />
                                {video_preview && (
                                    <video 
                                    controls 
                                    src={video_preview} 
                                    />
                                )}
                            </Form.Group>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" href={ROUTES.DISTRIBUTOR} style={{ marginRight: '10px' }}>
                            Back
                        </Button>
                        <Button variant="success" type="submit">
                            Save Changes
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
        </>
    );
}