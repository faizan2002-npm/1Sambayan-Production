import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Form, Input, Label, Row } from 'reactstrap'
import Header from '../../../components/Admin/Headers/Header'
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { getRequest, postRequestForm, putRequest } from '../../../api/request';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import moment from 'moment';
import Poll from 'react-polls';
import { LeafPoll, Result } from 'react-leaf-polls'

const ExpandedComponent = ({ data }) => {
    const updateSlideHandler = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("TOKEN");
        try {
            const response = await putRequest(
                "/api/secure/poll/update",
                token,
                {
                    name: e.target[0].value,
                    question: e.target[1].value,
                    choices: [
                        (e.target[2].value) ? { "choice": e.target[2].value } : data.choices[0].choice,
                        (e.target[3].value) ? { "choice": e.target[3].value } : data.choices[1].choice,
                        (e.target[4].value) ? { "choice": e.target[4].value } : data.choices[2].choice,
                        (e.target[5].value) ? { "choice": e.target[5].value } : data.choices[3].choice,
                    ],
                    pollId: data._id
                }
            );

            console.log("status", response);
            if (response.result.status === 200) {
                toast.success('Poll Updated', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                // window.location.assign('/admin/ListPolls');

            }

        } catch (error) {
            console.log("Save Poll APi error", error.message);
        }
    }
    function vote(item, results) {
        // Here you probably want to manage
        // and return the modified data to the server.
    }
    return (<>
        <Form className="form" encType="multipart/form-data" method="post" onSubmit={updateSlideHandler}>
            <Card className="shadow-none b-0">
                <CardBody>
                    <Row>
                        <Col xs={12}>
                            <FormGroup className="mb-3">
                                <Label>Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    className="form-control"
                                    defaultValue={data.name}
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
                                    defaultValue={data.question}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <FormGroup className="mb-3">
                                <Label style={{
                                    display:'flex',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                    alignSelf:'center'
                                }}>Choice 1
                                <b>
                                {((data.choices[0].votes / data.totalVotes) * 100).toFixed(0)}%
                                </b>
                                </Label>
                                <Input
                                    name="choice1"
                                    type="text"
                                    placeholder="Choice 1"
                                    className="form-control"
                                    defaultValue={data.choices[0].choice}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <FormGroup className="mb-3">
                                <Label style={{
                                    display:'flex',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                    alignSelf:'center'
                                }}>Choice 2
                                <b>
                                {((data.choices[1].votes / data.totalVotes) * 100).toFixed(0)}%
                                </b>
                                </Label>
                                <Input
                                    name="choice2"
                                    type="text"
                                    placeholder="Choice 2"
                                    className="form-control"
                                    defaultValue={data.choices[1].choice}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <FormGroup className="mb-3">
                                <Label style={{
                                    display:'flex',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                    alignSelf:'center'
                                }}>Choice 3
                                <b>
                                {((data.choices[2].votes / data.totalVotes) * 100).toFixed(0)}%
                                </b>
                                </Label>
                                <Input
                                    name="choice3"
                                    type="text"
                                    placeholder="Choice 3"
                                    className="form-control"
                                    defaultValue={data.choices[2].choice}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <FormGroup className="mb-3">
                                <Label style={{
                                    display:'flex',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                    alignSelf:'center'
                                }}>Choice 4
                                <b>
                                {((data.choices[3].votes / data.totalVotes) * 100).toFixed(0)}%
                                </b>
                                </Label>
                                <Input
                                    name="choice4"
                                    type="text"
                                    placeholder="Choice 4"
                                    className="form-control"
                                    defaultValue={data.choices[3].choice}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup className="mb-3" style={{
                                    textAlign:'center'
                                }}>
                                <b>Result</b>
                                <Row>
                                    <Col lg={10} md={10} xl={10} className='text-left'>
                                    <b>{data.choices[0].choice}</b>
                                    </Col>
                                    <Col lg={2} md={2} xl={2} className='text-right'>
                                    {((data.choices[0].votes / data.totalVotes) * 100).toFixed(0)}%
                                    </Col>
                                    <Col lg={10} md={10} xl={10} className='text-left'>
                                    <b>{data.choices[1].choice}</b>
                                    </Col>
                                    <Col lg={2} md={2} xl={2} className='text-right'>
                                    {((data.choices[1].votes / data.totalVotes) * 100).toFixed(0)}%
                                    </Col>
                                    <Col lg={10} md={10} xl={10} className='text-left'>
                                    <b>{data.choices[2].choice}</b>
                                    </Col>
                                    <Col lg={2} md={2} xl={2} className='text-right'>
                                    {((data.choices[2].votes / data.totalVotes) * 100).toFixed(0)}%
                                    </Col>
                                    <Col lg={10} md={10} xl={10} className='text-left'>
                                    <b>{data.choices[3].choice}</b>
                                    </Col>
                                    <Col lg={2} md={2} xl={2} className='text-right'>
                                    {((data.choices[3].votes / data.totalVotes) * 100).toFixed(0)}%
                                    </Col>
                                </Row>
                                {/* <pre>{JSON.stringify(data.choices, null, 2)}</pre> */}
                            </FormGroup>
                        </Col>
                        <Col className="text-center mt-5" xs={12}>
                            <Button type="submit" color="success">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Form>
        {/* </Formik> */}
    </>)
};

const ListPoll = () => {
    const handleRowClick = () => {
        console.log('row.createdAt', this.row.title);
    }
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [tableHead, setTableHead] = useState();
    const [tableData, setTableData] = useState();
    const getAllPosts = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/poll/poll-list`,
                token
            );

            setTableData(response.result.data.polls);
            // console.log("Get All Posts Response", response.result.data.posts);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const deletePoll = async (pollId, row, index, column, id) => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("id request to delete the post", id);
            // var params = props.location.search.slice(5);
            const response = await postRequestForm(
                `/api/secure/poll/delete-poll`,
                token, { pollId }
            );
            // console.log(response);
            if (response.result.status === 200) {
                toast.success('Poll Deleted', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                var fadeTarget = document.querySelector(`.rdt_Table .rdt_TableRow#row-${index}`);
                var fadeEffect = setInterval(function () {
                    if (!fadeTarget.style.opacity) {
                        fadeTarget.style.opacity = 1;
                    }
                    if (fadeTarget.style.opacity > 0) {
                        fadeTarget.style.opacity -= 0.1;
                    } else {
                        if (fadeTarget.style.opacity == 0) {
                            fadeTarget.style.display = 'none';
                            clearInterval(fadeEffect);
                        }
                    }
                }, 5);
            }
            // setTableData(response.result.data.posts);
            // console.log("Get All Posts Response", response.result.data.posts);
        } catch (error) {
            console.log("Deleting Poll Error: ", error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            getAllPosts();
            setTableHead([
                {
                    name: 'Title',
                    sortable: true,
                    selector: row => row.name,
                },
                {
                    name: 'Date',
                    sortable: true,
                    selector: row => moment(row.createdAt).format("dddd, MMMM Do YYYY"),
                },
                {
                    name: '',
                    button: true,
                    right: true,
                    grow: 1,
                    minWidth: '50px',
                    sortable: false,
                    cell: (row, index, column, id) => <Button className="del_btn" size='lg' variant="danger" onClick={() => deletePoll(row._id, row, index, column, id)}><FontAwesomeIcon icon={faTrash} /></Button>
                },
            ]);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                        <Card className="shadow-none b-0">
                            <CardBody className="p-0">
                                <DataTable
                                    columns={tableHead}
                                    data={tableData}
                                    expandableRows
                                    style={{
                                        borderRadius: "5px"
                                    }}
                                    // theme="dark"
                                    pagination
                                    expandableRowsComponent={ExpandedComponent}
                                    progressPending={pending}
                                    expandableIcon={
                                        {
                                            collapsed: <FontAwesomeIcon icon={faPencilAlt} />,
                                            expanded: <FontAwesomeIcon icon={faPencilAlt} />,
                                        }
                                    }
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ListPoll
