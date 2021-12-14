import React from 'react'
import { Container } from 'react-bootstrap'
import PublicLayout from './../../layouts/Public/PublicLayout';
import { Row, Col } from 'react-bootstrap';

const FAQ = () => {
    return (
        <PublicLayout>
            <main id="main_content">
            <section className="section-3 pt-5 pb-0">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={10} md={10} xs={12} className="text-center">
                                    <h1>
                                        FAQs
                                    </h1>
                                </Col>
                            </Row>
                        </Container>
                    </section> 
                <Container className="my-5 text-center">
                    <p>
                        Everything you need to know about 1SAMBAYAN and the Online Primary Election is here. If you do not find it, please write to us
                    </p>
                </Container>
            </main>
        </PublicLayout>
    )
}

export default FAQ
