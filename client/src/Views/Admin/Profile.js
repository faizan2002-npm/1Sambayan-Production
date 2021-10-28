import React from 'react';
import { Container, Row, Col, Form, Button, FormLabel, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getRequest, putRequest } from '../../api/request';
import { Input } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';
import Header from "../../components/Admin/Headers/Header";
import { toast } from 'react-toastify';

// const location = useLocation();
class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin_firstName: this.props.user_id,
            admin_lastName: this.props.username,
            admin_email: this.props.email,
            admin_phone: this.props.admin_phone,
            admin_pic: null,
            default_pic: null,
            // admin_firstName: "",
            // admin_lastName: "",
            // admin_email: "",
            // admin_phone: "",
            // admin_pic: null,
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) { this.setState({ value: event.target.value }); }
    fetchUserDetails = async () => {
        //console.log(user_id);
        const token = localStorage.getItem("TOKEN");
        const response = await getRequest(
            `/api/secure/user/profile`,
            token
        );
        // console.log("Get ProfileData", response);
        this.setState({
            admin_firstName: response.result.data.user.firstName,
            admin_lastName: response.result.data.user.lastName,
            admin_email: response.result.data.user.email,
            admin_phone: response.result.data.user.phone,
            admin_pic: "https://votewatchers.co.in/views/uploads/" + response.result.data.user.profileImage,
        });
    }

    changeProfileImage = (event) => {
        this.setState({ admin_pic: event.target.files[0], default_pic: URL.createObjectURL(event.target.files[0]) });
    }

    UpdateProfileHandler = async (e) => {
        e.preventDefault();
        // console.log("this.state",this.state);
        const formData = new FormData();
        formData.append(
            "firstName",
            e.target[0].value
        );
        formData.append(
            "lastName",
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
            "image",
            this.state.admin_pic
        );
        console.log("formData.get('image')", formData.get('image'));
        //         for (var key of formData.entries()) 
        // {
        //     console.log(key[0] + ', ' + key[1])
        // }
        const prifielImage = {
            image: formData.get('image')
        };
        const APIresponse = {
            props: {
                firstName: e.target[0].value,
                lastName: e.target[1].value,
                email: e.target[2].value,
                phone: e.target[3].value,
            },
            ...prifielImage,
        };
        console.log("APIresponse", APIresponse);
        const token = localStorage.getItem("TOKEN");

        try {
            const response = await putRequest(
                "/api/secure/user/edit-profile",
                token,
                formData,
                // { "Content-Type": "multipart/form-data" }
            );

            console.log("status", response);
            if (response.result.status === 200) {
                toast.success('Profile Updated', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }

        } catch (error) {
            console.log("Set Profile APi error", error.message);
        }

    }


    componentDidMount() {
        this.fetchUserDetails();
    }

    render() {

        if (this.state.admin_pic) {
            // var imagestr = this.state.admin_pic;
            // console.log(this.state.admin_pic);
            var profilePic = this.state.admin_pic;
        } else {
            profilePic = "https://avatars.githubusercontent.com/u/46397286?s=48&v=4";
        }

        return (
            <>
                <Header />
                <Container className="mt--7" fluid>
                    <Row className="mt-5">
                        <Col className="mb-5 mb-xl-0" xl="12">
                            <Card className="shadow">
                                <CardBody>
                                    <Form className="form" encType="multipart/form-data" method="post" onChange={this.handleChange} onSubmit={this.UpdateProfileHandler}>
                                        <Row>
                                            <Col lg={6} md={6} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <FormLabel>First Name</FormLabel>
                                                    <Input
                                                        name="admin_firstName"
                                                        type="text"
                                                        placeholder="Name"
                                                        className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.admin_firstName}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <FormLabel>Last Name</FormLabel>
                                                    <Input
                                                        name="admin_lastName"
                                                        type="text"
                                                        placeholder="Name"
                                                        className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.admin_lastName} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <FormLabel>Email</FormLabel>
                                                    <Input
                                                        name="admin_email"
                                                        type="email"
                                                        placeholder="Email Address"
                                                        className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.admin_email} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <Input
                                                        name="admin_phone"
                                                        type="tel"
                                                        placeholder="Phone Number"
                                                        className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.admin_phone} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <FormLabel>Profile Pic</FormLabel>
                                                    <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage} />
                                                    {
                                                        (this.state.default_pic) ? <Image src={this.state.default_pic} alt="profils pic" fluid /> : <Image src={profilePic} alt="profils pic" fluid />
                                                    }

                                                </Form.Group>
                                            </Col>
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




export default EditProfile;