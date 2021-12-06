import React from 'react'
import { Card, CardBody, Col, Container, Row, Label, FormGroup, Input, Form } from 'reactstrap'
import Header from '../../../components/Admin/Headers/Header'
import { postRequestForm } from '../../../api/request';
import { Button, FormLabel, Image } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

class CreateChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            // description: '',
            image: null,
            // video: null,
            defaultImage: null,
            // defaultVideo: null,
        }
    }

    changeFeaturedImage = (event) => {
        this.setState({ image: event.target.files[0], defaultImage: URL.createObjectURL(event.target.files[0]) });
    }
    addSliderHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "title",
            e.target[0].value
        );
        formData.append(
            "icon",
            this.state.image
        );
        formData.append(
            "status",
            e.target[2].value
        );
        // console.log("formData", {
        //     title:formData.get('title'),
        //     icon:formData.get('icon'),
        //     status:formData.get('status'),
        // });
        const token = localStorage.getItem("TOKEN");

        try {
            const response = await postRequestForm(
                "/api/secure/channel/create",
                token,
                formData,
            );

            console.log("status", response);
            if (response.result.status === 200) {
                toast.success('Candidate Created', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                window.location.assign('/admin/ListChannels');
            }

        } catch (error) {
            console.log("Set Profile APi error", error.message);
        }

    }

    render() {
        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row className="mt-5">
                        <Col className="mb-5 mb-xl-0" xl="12">
                            <Card className="shadow">
                                <CardBody>
                                    <Form className="form" encType="multipart/form-data" method="post" onSubmit={this.addSliderHandler}>
                                        <Row>
                                            <Col xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Title</Label>
                                                    <Input
                                                        name="title"
                                                        type="text"
                                                        placeholder="Name"
                                                        className="form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Featured Icon</Label>
                                                    <input id="image" name="image" type="file" onChange={this.changeFeaturedImage} className="form-control" />
                                                    {
                                                        (this.state.defaultImage) ? <Image src={this.state.defaultImage} alt="profils pic" fluid /> : ''
                                                    }
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Status</Label>
                                                    <Input
                                                        id="status"
                                                        name="status"
                                                        type="select"
                                                    >
                                                        <option selected defaultValue="Active">Active</option>
                                                        <option defaultValue="InActive">InActive</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col className="text-center mt-5" xs={12}>
                                                <Button type="submit" color="success" outline>
                                                    Save
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}




export default CreateChannel;

