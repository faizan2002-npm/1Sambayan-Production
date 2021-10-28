import React, { useState, useEffect } from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, FormGroup, Label, CardHeader, CardBody, ListGroupItem } from 'reactstrap';
import classnames from 'classnames';
// import SortableList from "../../../components/Admin/SortableList";
import Header from '../../../components/Admin/Headers/Header';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
// import { v4 as uuidv4 } from 'uuid';
import { Form, Formik, Field as Input } from 'formik';
import { putRequest, getRequest } from './../../../api/request';
import { toast } from 'react-toastify';
import Events from './../../Public/Events';

const HomeSetting = () => {
    const [latestPostsSection, setLatestPostsSection] = useState();
    const getHomeSetting = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/site/pages?name=Home Page`,
                token
            );
            setLatestPostsSection({
                latestPostsSectionHeading: response.result.data.pages[0].sections[0].heading,
                latestPostsSectionButton: response.result.data.pages[0].sections[0].button,
                eventUpdatesSectionHeading: response.result.data.pages[0].sections[1].heading,
                eventUpdatesSectionButton: response.result.data.pages[0].sections[1].button,
                communitiesSectionHeading: response.result.data.pages[0].sections[2].heading,
                communitiesSectionButton: response.result.data.pages[0].sections[2].button,
                candidateSectionHeading: response.result.data.pages[0].sections[3].heading,
                candidateSectionButton: response.result.data.pages[0].sections[3].button,
                partiesSectionHeading: response.result.data.pages[0].sections[4].heading,
                partiesSectionButton: response.result.data.pages[0].sections[4].button,
                registerationSectionHeading: response.result.data.pages[0].sections[5].heading,
            });
            console.log("Get Home Setting Response", response);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };

    useEffect(() => {
        getHomeSetting();
    }, []);
    return (
        <>

            <Header />
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow">
                            <CardBody>
                                <Formik
                                    enableReinitialize={true} initialValues={latestPostsSection}
                                    onSubmit={async (values) => {
                                        // console.log(values);
                                        const token = localStorage.getItem("TOKEN");
                                        // console.log(token);
                                        const APIresponse = {
                                            name: 'Home Page',
                                            sections: [
                                                {
                                                    heading: values.latestPostsSectionHeading,
                                                    button: values.latestPostsSectionButton,
                                                },
                                                {
                                                    heading: values.eventUpdatesSectionHeading,
                                                    button: values.eventUpdatesSectionButton,
                                                },
                                                {
                                                    heading: values.communitiesSectionHeading,
                                                    button: values.communitiesSectionButton,
                                                },
                                                {
                                                    heading: values.candidateSectionHeading,
                                                    button: values.candidateSectionButton,
                                                },
                                                {
                                                    heading: values.partiesSectionHeading,
                                                    button: values.partiesSectionButton,
                                                },
                                                {
                                                    heading: values.registerationSectionHeading,
                                                },
                                            ],
                                            pageId:'615f8e48bd4e636fe79704cc'
                                        };
                                        console.log('Pre Post APIresponse',APIresponse);
                                        try {
                                            const response = await putRequest(
                                                "/api/secure/site/update-page",
                                                token,
                                                APIresponse
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
                                            console.log("Set Site Setting error", error.message);
                                        }
                                    }}
                                >
                                    <Form>
                                        <Row>
                                            <Col xs={12}>
                                                <h2>Posts Section</h2>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Edit title for the Post Section</Label>
                                                    <Input type="text" name="latestPostsSectionHeading" id="latestPostsSectionHeading" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Link to the header option</Label>
                                                    <Input type="text" name="latestPostsSectionButton" id="latestPostsSectionButton" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} className="mt-5">
                                                <h2>Events Section</h2>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Edit title for the Event Section</Label>
                                                    <Input type="text" name="eventUpdatesSectionHeading" id="eventUpdatesSectionHeading" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Link to the header option</Label>
                                                    <Input type="text" name="eventUpdatesSectionButton" id="eventUpdatesSectionButton" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} className="mt-5">
                                                <h2>Chapters Section</h2>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Edit title for the Chapters Section</Label>
                                                    <Input type="text" name="communitiesSectionHeading" id="communitiesSectionHeading" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Link to the header option</Label>
                                                    <Input type="text" name="communitiesSectionButton" id="communitiesSectionButton" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} className="mt-5">
                                                <h2>Candidates Section</h2>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Edit title for the Candidates Section</Label>
                                                    <Input type="text" name="candidateSectionHeading" id="candidateSectionHeading" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Link to the header option</Label>
                                                    <Input type="text" name="candidateSectionButton" id="candidateSectionButton" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} className="mt-5">
                                                <h2>Member Organizations Section</h2>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Edit title for the Member Organizations Section</Label>
                                                    <Input type="text" name="partiesSectionHeading" id="partiesSectionHeading" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Link to the header option</Label>
                                                    <Input type="text" name="partiesSectionButton" id="partiesSectionButton" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} className="mt-5">
                                                <h2>Registeration Section</h2>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label>Edit title for the Registeration Section</Label>
                                                    <Input type="text" name="registerationSectionHeading" id="registerationSectionHeading" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="text-center mt-5" xs={12}>
                                                <Button type="submit" color="success" outline>
                                                    Save
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HomeSetting;
