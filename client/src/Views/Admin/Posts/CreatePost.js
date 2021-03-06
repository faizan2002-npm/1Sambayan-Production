import React from 'react'
import { Card, CardBody, Col, Container, Row, Label, FormGroup, Input, Form } from 'reactstrap'
import Header from '../../../components/Admin/Headers/Header'
import { postRequestForm } from '../../../api/request';
import { Button, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { sendNotification } from './../../../api/notification';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            image: null,
            // video: null,
            defaultImage: null,
            isApproved:true,
            isAdmin:true
            // defaultVideo: null,
        }
    }

    changeFeaturedImage = (event) => {
        this.setState({ image: event.target.files[0], defaultImage: URL.createObjectURL(event.target.files[0]) });
    }

    // changeVideo = (event) => {
    //     this.setState({ video: event.target.files[0], defaultVideo: URL.createObjectURL(event.target.files[0]) });
    // }

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
            "image",
            this.state.image
        );
        formData.append(
            "backgroundImage",
            this.state.backgroundImage
        );
        formData.append(
            "isApproved",
            this.state.isApproved
        );
        formData.append(
            "isAdmin",
            this.state.isAdmin
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
                "/api/secure/post/create",
                token,
                formData,
                // { "Content-Type": "multipart/form-data" }
            );

            console.log("status", response);
            if (response.result.status === 200) {
                // const sendNoti = sendNotification(token,{notificationTitle:'New Post Added',notificationBody:'New post added by client please check'});
                // if(sendNoti == 'success'){
                    
                // }
                toast.success('Post Created', {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    window.location.assign('/admin/ListPost');
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
                                                    {/* <EditorField
                                                        name="description"
                                                        init={{
                                                            plugins: 'autolink link image lists print preview',
                                                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                                        }}
                                                    /> */}

                                                    <Input
                                                        name="description"
                                                        type="textarea"
                                                        placeholder="Content"
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
                                            {/* <Col lg={6} md={6} xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Featured Video</Label>
                                                    <input id="backgroundImage" name="backgroundImage" type="file" onChange={this.changeVideo} className="form-control" />
                                                    {
                                                        (this.state.defaultVideo) ? <Image src={this.state.defaultVideo} alt="profils pic" fluid /> : ''
                                                    }
                                                </FormGroup>
                                            </Col> */}
                                            <Col className="text-center mt-5" xs={12}>
                                                <Button type="submit" color="success" >
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




export default CreatePost;

