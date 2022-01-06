import React from 'react'
import PublicLayout from '../../layouts/Public/PublicLayout';
import { Container, Row, Col } from 'react-bootstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {
    Button,
    FormGroup,
    InputGroup,
    Form,
    Input,
    Label
} from "reactstrap";
import PhoneInput from 'react-phone-input-2';
import { postRequest } from './../../api/request';
import { useState } from 'react';

const Contact = () => {
    const [mailled, setMailled] = useState(false)
    const contactUsHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "name",
            e.target[0].value
        );
        formData.append(
            "subject",
            e.target[1].value
        );
        formData.append(
            "email",
            e.target[2].value
        );
        formData.append(
            "phone",
            e.target[3].value
        );
        formData.append(
            "message",
            e.target[4].value
        );
        const APIresponse = {
            name: formData.get('name'),
            subject: formData.get('subject'),
            email: formData.get('email'),
            phone: formData.get('phone').replace(/-|\s/g, ""),
            message: formData.get('message'),
        };
        console.log("APIresponse", APIresponse)
        try {
            const response = await postRequest(
                "/api/pub/auth/contact-us",
                APIresponse,
            );

            console.log("status", response);
            if (response.result.status === 200) {
                setMailled(true)
            }

        } catch (error) {
            console.log("Contact Form API ERROR", error.message);
        }
    }

    return (
        <PublicLayout>
            <main id="main_content">
                <section className="contact_sec mt-5 py-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6} md={6} xs={12}>
                                <h1>Contact Us</h1>
                                <p>
                                    <b>Authorized Rep:</b> Br. Armin A. Luistro FSC
                                </p>
                                <p>
                                    <b>Email Address:</b> <a href="mailto:1SAMBAYAN.Secretariat@gmail.com">1SAMBAYAN.Secretariat@gmail.com</a>
                                </p>
                                <p>
                                    <b>Phone Number:</b> <a href="tel:+63 8721-2000">+63 8721-2000</a>
                                </p>
                                <p>
                                    <b>Mailing Address:</b> 343 Ortigas Avenue, Mandaluyong City 1550 PH
                                </p>
                                <p>
                                    <b>Office Hours:</b> 9am - 5pm (Monday through Friday)
                                </p>
                            </Col>
                            <Col lg={6} md={6} xs={12}>
                                <div className="form_box">
                                    {
                                        (mailled) ? <p>
                                            Form Submitted Successfully
                                        </p> : <AvForm className="form" encType="multipart/form-data" method="post" onValidSubmit={contactUsHandler}>
                                            <Row>
                                                <Col lg={6} md={6} xs={12}>
                                                    <FormGroup className="mb-4">
                                                        <Label>First Name</Label>

                                                        <AvField
                                                            name="firstName"
                                                            type="text"
                                                            placeholder="First Name"
                                                            className="form-control"
                                                            required
                                                        />

                                                    </FormGroup>
                                                </Col>
                                                <Col lg={6} md={6} xs={12}>
                                                    <FormGroup className="mb-4">
                                                        <Label>Subject</Label>

                                                        <AvField
                                                            name="subject"
                                                            type="text"
                                                            placeholder="Subject"
                                                            className="form-control"
                                                        // required
                                                        />

                                                    </FormGroup>
                                                </Col>
                                                <Col lg={6} md={6} xs={12}>
                                                    <FormGroup className="mb-4">
                                                        <Label>Email</Label>

                                                        <AvField
                                                            name="email"
                                                            type="email"
                                                            placeholder="Email"
                                                            className="form-control"
                                                            required
                                                        />

                                                    </FormGroup>
                                                </Col>
                                                <Col lg={6} md={6} xs={12}>
                                                    <FormGroup className="mb-4">
                                                        <Label>Phone Number</Label>

                                                        <PhoneInput
                                                            country={'ph'}
                                                            enableAreaCodes={true}
                                                            enableAreaCodeStretch
                                                            enableSearch={true}
                                                            inputProps={{
                                                                name: 'phone',
                                                                required: true,
                                                                autoFocus: true
                                                            }}
                                                            required
                                                        />

                                                    </FormGroup>
                                                </Col>
                                                <Col xl={12}>
                                                    <FormGroup className="mb-4">
                                                        <Label>Message</Label>

                                                        <AvField
                                                            name="message"
                                                            type="textarea"
                                                            placeholder="Message"
                                                            className="form-control"
                                                        // required
                                                        />

                                                    </FormGroup>
                                                </Col>
                                                <Col xl={12}>
                                                    <FormGroup className="mb-4">
                                                        <Button className="link btn-md w-100" type="submit">
                                                            Submit
                                                        </Button>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </AvForm>
                                    }

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
        </PublicLayout>
    )
}

export default Contact;
