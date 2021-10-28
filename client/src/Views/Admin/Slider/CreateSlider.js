import React from 'react'
import { Card, CardBody, Col, Container, Row, Label, FormGroup, Input, Form } from 'reactstrap'
import Header from '../../../components/Admin/Headers/Header'
import EditorField from '../../../components/Admin/EditorFormik.d.tsx';
import { postRequestForm } from '../../../api/request';
import { Button, FormLabel, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';

class CreateSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            buttonURL: '',
            image: null,
            backgroundImage: null,
            defaultImage: null,
            defaultbackgroundImage: null,
        }
    }

    changeFeaturedImage = (event) => {
        this.setState({ image: event.target.files[0] ,defaultImage: URL.createObjectURL(event.target.files[0]) });
    }

    changeBackgroundImage = (event) => {
        this.setState({ backgroundImage: event.target.files[0] ,defaultbackgroundImage: URL.createObjectURL(event.target.files[0]) });
    }

    addSliderHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "title",
            e.target[0].value
        );
        formData.append(
            "description",
            e.target[1].value
        );
        formData.append(
            "buttonURL",
            e.target[2].value
        );
        formData.append(
            "image",
            this.state.image
        );
        formData.append(
            "backgroundImage",
            this.state.backgroundImage
        );
        // console.log("formData", formData);
        const featuredImage = {
            image: formData.get('image')
        };
        const backgroundImage = {
            backgroundImage: formData.get('backgroundImage')
        };
        const APIresponse = {
            props: {
                title: formData.get('title'),
                description: formData.get('description'),
            },
            ...featuredImage,
            ...backgroundImage
        };
        console.log("Add Slider APIresponse", APIresponse);
        const token = localStorage.getItem("TOKEN");

        try {
            const response = await postRequestForm(
                "/api/secure/site/create-header",
                token,
                formData,
                // { "Content-Type": "multipart/form-data" }
            );

            console.log("status", response);
            if (response.result.status === 200) {
                toast.success('Slide Created', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                window.location.assign('/admin/ListSlider');
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
                                            <Col xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Content</Label>
                                                    <Input
                                                        name="description"
                                                        type="textarea"
                                                        placeholder="Content"
                                                        className="form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Button URL</Label>
                                                    <Input
                                                        name="buttonURL"
                                                        type="text"
                                                        placeholder="Button URL"
                                                        className="form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Featured Image</Label>
                                                    <input id="image" name="image" type="file" onChange={this.changeFeaturedImage} className="form-control" />
                                                    {
                                                        (this.state.defaultImage) ? <Image src={this.state.defaultImage} alt="profils pic" fluid /> : ''
                                                    }
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Featured Background Image</Label>
                                                    <input id="backgroundImage" name="backgroundImage" type="file" onChange={this.changeBackgroundImage} className="form-control" />
                                                    {
                                                        (this.state.defaultbackgroundImage) ? <Image src={this.state.defaultbackgroundImage} alt="profils pic" fluid /> : ''
                                                    }
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




export default CreateSlider;

