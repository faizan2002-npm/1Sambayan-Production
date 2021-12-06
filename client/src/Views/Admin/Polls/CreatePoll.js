import React from 'react'
import { Card, CardBody, Col, Container, Row, Label, FormGroup, Input, Form } from 'reactstrap'
import Header from '../../../components/Admin/Headers/Header'
import { postRequestForm } from '../../../api/request';
import { Button, FormLabel, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';

class CreatePoll extends React.Component {

    addSliderHandler = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("TOKEN");
        try {
            const response = await postRequestForm(
                "/api/secure/poll/create",
                token,
                {
                    name: e.target[0].value,
                    question: e.target[1].value,
                    choices: [
                        (e.target[2].value) ? {"choice" : e.target[2].value}:'',
                        (e.target[3].value) ? {"choice" : e.target[3].value}:'',
                        (e.target[4].value) ? {"choice" : e.target[4].value}:'',
                        (e.target[5].value) ? {"choice" : e.target[5].value}:''
                    ]
                }
            );

            console.log("status", response);
            if (response.result.status === 200) {
                toast.success('Poll Created', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                window.location.assign('/admin/ListPolls');

            }

        } catch (error) {
            console.log("Create Position APi error", error.message);
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
                                                    <Label>Name</Label>
                                                    <Input
                                                        name="name"
                                                        type="text"
                                                        placeholder="Name"
                                                        className="form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Question</Label>
                                                    <Input
                                                        name="question"
                                                        type="text"
                                                        placeholder="Question"
                                                        className="form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={3} md={6} xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Choice 1</Label>
                                                    <Input
                                                        name="choice1"
                                                        type="text"
                                                        placeholder="Choice 1"
                                                        className="form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={3} md={6} xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Choice 2</Label>
                                                    <Input
                                                        name="choice2"
                                                        type="text"
                                                        placeholder="Choice 2"
                                                        className="form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={3} md={6} xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Choice 3</Label>
                                                    <Input
                                                        name="choice3"
                                                        type="text"
                                                        placeholder="Choice 3"
                                                        className="form-control"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={3} md={6} xs={12}>
                                                <FormGroup className="mb-3">
                                                    <Label>Choice 4</Label>
                                                    <Input
                                                        name="choice4"
                                                        type="text"
                                                        placeholder="Choice 4"
                                                        className="form-control"
                                                    />
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




export default CreatePoll;

