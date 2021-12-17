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
import { CardTitle } from 'reactstrap';

const ExpandedComponent = ({ data }) => {
    const [defaultData, setDefaultSlideData] = useState({
        title: data.title,
        image: "https://sambayan-1.s3.ap-south-1.amazonaws.com/" + data.image,
    })
    const [userData, setUserData] = useState({})
    const updateSlideHandler = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("TOKEN");
        try {
            const response = await putRequest(
                "/api/secure/position/update",
                token,
                {
                    name: e.target[0].value,
                    description: e.target[1].value,
                    positionId: data._id
                }
            );

            console.log("status", response);
            if (response.result.status === 200) {
                toast.success('Position Updated', {
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
    }
    const getUserDataById = async () => {
        const usrData = await Promise.all(
            data.members.map(async (e, key) => {
                try {
                    const token = localStorage.getItem("TOKEN");
                    const response = await getRequest(
                        `/api/secure/user/profile-by-ID/?userId=${e.userId}`,
                        token
                    );
                    return response.result.data.user;
                    // usrData.push(response.result.data.user);
                    // setUserData(usrData);
                } catch (error) {
                    console.log("Get Member Profile error", error);
                }
            }));
        setUserData(usrData);
        // console.log("usrData",usrData) 
    }
    useEffect(() => {
        getUserDataById()
    }, [])
    return (<>
        <Form className="form" encType="multipart/form-data" method="post" onSubmit={updateSlideHandler}>
            <Row className="m-0">
                <Col xs={12} className="my-3">
                    <h2>Edit Position {data.name}</h2>
                </Col>
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
                        <Label>Description</Label>
                        <Input
                            name="description"
                            type="textarea"
                            placeholder="Description"
                            className="form-control"
                            defaultValue={data.description}
                        />
                    </FormGroup>
                </Col>
                <Col xs={12}>
                    <FormGroup className="mb-3">
                        <Label>Applied {data.members.length}</Label>
                        <Row>
                            {
                                // (userData.length>0) ? console.log("usrData state",userData):''
                                (userData.length > 0) ? userData.map((e, key) => (<Col key={key} className="mb-3" xs={12}>
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <Row>
                                                        <Col lg={6} md={6} xs={12}>
                                                            <h4>
                                                                <b>
                                                                    Name
                                                                </b>
                                                            </h4>
                                                            <CardTitle
                                                                tag="h5"
                                                                className="text-uppercase text-muted mb-0"
                                                            >
                                                                {e.firstName}  {e.lastName}
                                                            </CardTitle>
                                                        </Col>
                                                        <Col lg={6} md={6} xs={12}>
                                                            <h4>
                                                                <b>
                                                                    Email
                                                                </b>
                                                            </h4>
                                                            <CardTitle
                                                                tag="h5"
                                                                className="text-uppercase text-muted mb-0"
                                                            >
                                                                {e.email}
                                                            </CardTitle>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>)) : ''
                            }
                        </Row>
                    </FormGroup>
                </Col>
                <Col className="text-center mt-5" xs={12}>
                    <Button type="submit" color="success" outline>
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
        {/* </Formik> */}
    </>)
};

const ListPosition = () => {
    const [pending, setPending] = React.useState(true);
    const [tableHead, setTableHead] = useState();
    const [tableData, setTableData] = useState();
    const getAllPosts = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/position/position-list`,
                token
            );

            setTableData(response.result.data.positions);
            // console.log("Get All Posts Response", response.result.data.posts);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const deleteSinglePost = async (positionId, row, index, column, id) => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("id request to delete the post", id);
            // var params = props.location.search.slice(5);
            const response = await postRequestForm(
                `/api/secure/position/delete-position`,
                token, { positionId }
            );
            // console.log(response);
            if (response.result.status === 200) {
                toast.success('Party Deleted', {
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
        } catch (error) {
            console.log("Get Site Setting Error", error);
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
                    cell: (row, index, column, id) => <Button className="del_btn" size='lg' variant="danger" onClick={() => deleteSinglePost(row._id, row, index, column, id)}><FontAwesomeIcon icon={faTrash} /></Button>
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

export default ListPosition
