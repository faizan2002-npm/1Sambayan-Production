
import React from 'react';
import { Container, Row, Col, Form, Button, FormLabel, Image } from 'react-bootstrap';
import { Input } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';
import { getRequest, putRequest } from '../../../api/request';
import Header from '../../../components/Admin/Headers/Header';
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player'

// const location = useLocation();
class SiteSettingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteTitle: this.props.siteTitle,
            siteURL: this.props.siteURL,
            siteSlogan: this.props.siteSlogan,
            siteEmail: this.props.siteEmail,
            sitePhone: this.props.sitePhone,
            igUrl: this.props.igUrl,
            fbUrl: this.props.fbUrl,
            twUrl: this.props.twUrl,
            waUrl: this.props.waUrl,
            street: this.props.street,
            city: this.props.city,
            zip: this.props.zip,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            aboutSite: this.props.aboutSite,
            copyright: this.props.copyright,
            siteLogo: null,
            defaultSiteLogo: null,
            siteVideo: null,
            defaultSiteVideo: null,
            donateURL:this.props.donateURL,
        }
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) { this.setState({ value: event.target.value }); }
    fetchUserDetails = async () => {
        //console.log(user_id);
        const token = localStorage.getItem("TOKEN");
        const response = await getRequest(
            `/api/secure/site/`,
            token
        );
        console.log("Get Site Setting", response);
        this.setState({
            siteTitle: response.result.data.site[0].name,
            siteURL: response.result.data.site[0].url,
            sitePhone: response.result.data.site[0].phone,
            siteSlogan: response.result.data.site[0].slogan,
            siteEmail: response.result.data.site[0].email,
            igUrl: response.result.data.site[0].Instagram,
            fbUrl: response.result.data.site[0].Facebook,
            twUrl: response.result.data.site[0].Twitter,
            waUrl: response.result.data.site[0].LinkedIn,
            city: response.result.data.site[0].city,
            street: response.result.data.site[0].street,
            latitude: response.result.data.site[0].latitude,
            longitude: response.result.data.site[0].longitude,
            zip: response.result.data.site[0].zip,
            aboutSite: response.result.data.site[0].footer,
            copyright: response.result.data.site[0].copyright,
            siteLogo: "https://votewatchers.co.in/views/uploads/" + response.result.data.site[0].logo,
            siteVideo: "https://votewatchers.co.in/views/uploads/" + response.result.data.site[0].video,
            donateURL: response.result.data.site[0].donateURL,
        });

    }

    changeSiteLogo = (event) => {
        this.setState({ siteLogo: event.target.files[0], defaultSiteLogo: URL.createObjectURL(event.target.files[0]) });
    }
    changeSiteVideo = (event) => {
        this.setState({ siteVideo: event.target.files[0], defaultSiteVideo: URL.createObjectURL(event.target.files[0]) });
    }

    UpdateProfileHandler = async (e) => {
        e.preventDefault();
        // console.log("this.state",this.state);
        const formData = new FormData();
        formData.append(
            "name",
            e.target[0].value
        );
        formData.append(
            "url",
            e.target[1].value
        );
        formData.append(
            "slogan",
            e.target[2].value
        );
        formData.append(
            "email",
            e.target[5].value
        );
        formData.append(
            "phone",
            e.target[6].value
        );
        formData.append(
            "Instagram",
            e.target[7].value
        );
        formData.append(
            "Facebook",
            e.target[8].value
        );
        formData.append(
            "Twitter",
            e.target[9].value
        );
        formData.append(
            "LinkedIn",
            e.target[10].value
        );
        formData.append(
            "city",
            e.target[12].value
        );
        formData.append(
            "street",
            e.target[11].value
        );
        formData.append(
            "latitude",
            e.target[14].value
        );
        formData.append(
            "longitude",
            e.target[15].value
        );
        formData.append(
            "zip",
            e.target[13].value
        );
        formData.append(
            "footer",
            e.target[16].value
        );
        formData.append(
            "copyright",
            e.target[17].value
        );
        formData.append(
            "donateURL",
            e.target[18].value
        );
        formData.append(
            "logo",
            this.state.siteLogo
        );
        formData.append(
            "video",
            this.state.siteVideo
        );
        // console.log("APIresponse", APIresponse);
        const token = localStorage.getItem("TOKEN");

        try {
            const response = await putRequest(
                "/api/secure/site/update-site",
                token,
                formData,
                // { "Content-Type": "multipart/form-data" }
            );

            console.log("status", response);
            if (response.result.status === 200) {
                toast.success('Settings Updated', {
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

        if (this.state.siteLogo) {
            // var imagestr = this.state.admin_pic;
            // console.log(this.state.admin_pic);
            var siteLogo = this.state.siteLogo;
        } else {
            siteLogo = "https://avatars.githubusercontent.com/u/46397286?s=48&v=4";
        }

        if (this.state.siteVideo) {
            // var imagestr = this.state.admin_pic;
            // console.log(this.state.admin_pic);
            var siteVideo = this.state.siteVideo;
        } else {
            siteLogo = "https://avatars.githubusercontent.com/u/46397286?s=48&v=4";
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
                                                <Form.Group>
                                                    <FormLabel>Site Title</FormLabel>
                                                    <Input type="text" name="siteTitle" id="siteTitle" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.siteTitle} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <Form.Group>
                                                    <FormLabel>Site URL</FormLabel>
                                                    <Input type="text" name="siteURL" id="siteURL" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.siteURL} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <Form.Group>
                                                    <FormLabel>Site Slogan</FormLabel>
                                                    <Input type="text" name="siteSlogan" id="siteSlogan" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.siteSlogan} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <FormLabel>Profile Pic</FormLabel>
                                                    <Form.Control type="file" name="siteLogo" onChange={this.changeSiteLogo} />
                                                    {
                                                        (this.state.defaultSiteLogo) ? <Image src={this.state.defaultSiteLogo} alt="profils pic" fluid /> : <Image src={siteLogo} alt="profils pic" fluid />
                                                    }

                                                </Form.Group>
                                            </Col>
                                            <Col lg={12} md={12} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <FormLabel>Site Video</FormLabel>
                                                    <Form.Control type="file" name="siteLogo" onChange={this.changeSiteVideo} />
                                                    {
                                                        (this.state.defaultSiteVideo) ?
                                                            <ReactPlayer controls={true}  width='100%'
                                                            height='100%' url={this.state.defaultSiteVideo} /> : <ReactPlayer controls={true}  width='100%'
                                                            height='100%' url={this.state.siteVideo} />
                                                    }

                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Contact Email address</FormLabel>
                                                    <Input type="email" name="siteEmail" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.siteEmail} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Contact Phone number</FormLabel>
                                                    <Input type="tel" name="sitePhone" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.sitePhone} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Instagram URL</FormLabel>
                                                    <Input type="url" name="igUrl" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.igUrl} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Facebook URL</FormLabel>
                                                    <Input type="url" name="fbUrl" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.fbUrl} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Twitter URL</FormLabel>
                                                    <Input type="url" name="twUrl" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.twUrl} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Whatapp URL</FormLabel>
                                                    <Input type="url" name="waUrl" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.waUrl} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Address</FormLabel>
                                                    <Input type="text" name="street" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.street} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >City</FormLabel>
                                                    <Input type="text" name="city" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.city} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={4} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Zip</FormLabel>
                                                    <Input type="text" name="zip" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.zip} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Latitude</FormLabel>
                                                    <Input type="text" name="latitude" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.latitude} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Longitude</FormLabel>
                                                    <Input type="text" name="longitude" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.longitude} />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={12}>
                                                <Form.Group>
                                                    <FormLabel >About us content</FormLabel>
                                                    <Input type="textarea" name="aboutSite" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.aboutSite} />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Site Copyright</FormLabel>
                                                    <Input type="text" name="copyright" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.copyright} />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group>
                                                    <FormLabel >Donte Button URL</FormLabel>
                                                    <Input type="text" name="donateURL" placeholder="" className="form-control"
                                                        onChange={this.handleChange}
                                                        defaultValue={this.state.donateURL} />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
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




export default SiteSettingPage;