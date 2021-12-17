import React from 'react'
import PublicLayout from '../../layouts/Public/PublicLayout';
import { Container, Row, Col } from 'react-bootstrap';

const Contact = () => {
    return (
        <PublicLayout>
            <main id="main_content">
                <section className="contact_sec py-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={12} className="text-center">
                                <h1>Contact Us</h1>
                            </Col>
                            <Col lg={6} md={6} xl={12}  className="text-center">
                                <p>
                                    <b>Address:</b> 2904 West Tower. Tektite Building, Pasig City
                                </p>
                                <p>
                                    <b>Office hours:</b> 9am - 5pm
                                </p>
                                <p>
                                    <b>Tel. no.:</b> 8633-6113
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
        </PublicLayout>
    )
}

export default Contact;
