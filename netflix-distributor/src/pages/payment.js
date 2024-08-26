import { React } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDistributorData } from '../hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const userEmail = queryParams.get('userEmail');
    console.log(userEmail);
    const distributor = useDistributorData(userEmail);

    // Handle cases where distributor or payment_list might be undefined
    const paymentList = distributor?.payment_list || [];

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h3 style={{ 
                    marginTop: '20px', 
                    fontSize: '48px', 
                    fontWeight: 'bold',
                }}>
                    PAYMENT DETAILS
                </h3>
            </div>

            <Container style={{ marginTop: '40px' }}>
                <Row>
                    <Col>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Transaction ID</th>
                                    <th>Etherium</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentList.length > 0 ? (
                                    paymentList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item}</td>
                                            <td>0.01 ETH</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: 'center' }}>
                                            No transactions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
