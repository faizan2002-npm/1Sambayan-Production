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

const SelectionProcessSetting = () => {
    const [latestPostsSection, setLatestPostsSection] = useState();
    const getHomeSetting = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/site/pages?name=Selection Process`,
                token
            );
            setLatestPostsSection({
                bannerHeading: response.result.data.pages[0].sections[0].heading,
                afterBannerHeading: response.result.data.pages[0].sections[1].heading,
                leftSideContent: response.result.data.pages[0].sections[2].sectionContentBox,
                rightSideContent: response.result.data.pages[0].sections[3].sectionContentBox,
            });
            console.log("Get About Setting Response", response.result.data.pages[0]);
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
                                            name: 'Selection Process',
                                            sections: [
                                                {
                                                    heading: values.bannerHeading,
                                                },
                                                {
                                                    heading: values.afterBannerHeading,
                                                },
                                                {
                                                    sectionContentBox: values.leftSideContent,
                                                },
                                                {
                                                    sectionContentBox: values.rightSideContent,
                                                },
                                            ]
                                        };
                                        // // // console.log('Pre Post APIresponse',APIresponse);
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
                                                <h2>Content for banner Heading</h2>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Input type="text" name="bannerHeading" id="bannerHeading" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12} className="mt-5">
                                                <h2>Content Below the banner</h2>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Input type="text" name="afterBannerHeading" id="afterBannerHeading" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <h2>Content for the left section of the page</h2>
                                                <FormGroup>
                                                    <Input as="textarea" name="leftSideContent" id="leftSideContent" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6} md={6} xs={12}>
                                                <h2>Content for the right section of the page</h2>
                                                <FormGroup>
                                                    <Input as="textarea" name="rightSideContent" id="rightSideContent" className="form-control" />
                                                </FormGroup>
                                            </Col>
                                            <Col className="text-center mt-5" xs={12}>
                                                <Button type="submit" color="success" >
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

export default SelectionProcessSetting;
