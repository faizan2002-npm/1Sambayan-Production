import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Form, Input, Label, Row } from 'reactstrap'
import Header from '../../../components/Admin/Headers/Header'
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { putRequest, postRequestForm, postWithParams } from '../../../api/request';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import moment from 'moment';
import { Link } from 'react-router-dom';
const queryString = require('query-string');

// A super simple expandable component.
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

const ExpandedComponent = ({ data }) => {
    const parsed = queryString.parse(window.location.search);
    let channelId = parsed._id;
    const [defaultData, setDefaultSlideData] = useState({
        title: data.title,
        image: "https://votewatchers.co.in/views/uploads/" + data.icon,
    })
    const [featuredImage, setFeaturedImage] = useState({ image: data.image, defaultImage: defaultData.image })
    const [backgroundImage, setBackgroundImage] = useState({ backgroundImage: data.backgroundImage, defaultbackgroundImage: defaultData.backgroundImage })
    const changeFeaturedImage = (event) => {
        setFeaturedImage({ image: event.target.files[0], defaultImage: URL.createObjectURL(event.target.files[0]) })
    }
    const changeBackgroundImage = (event) => {
        setBackgroundImage({ backgroundImage: event.target.files[0], defaultbackgroundImage: URL.createObjectURL(event.target.files[0]) })
    }
    const updateSlideHandler = async (e) => {
        e.preventDefault();
        // console.log(e);
        const token = localStorage.getItem("TOKEN");
        try {
            const response = await postRequestForm(
                "/api/secure/channel/request-action",
                token,
                {
                    channelId:channelId,
                    memberId:data._id,
                    status:e.target[0].value,
                }
            );

            // console.log("status", response);
            if (response.result.status === 200) {
                toast.success('Post Updated', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
            // var fadeTarget = document.querySelector(`.rdt_Table .rdt_TableRow#row-${index}`);
        } catch (error) {
            console.log("Set Site Setting error", error.message);
        }
    }
    return (<>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <Form className="form" encType="multipart/form-data" method="post" onSubmit={updateSlideHandler}>
            <Row className="m-0 justify-content-center">
                <Col xs={12} className="my-3">
                    <h2>Edit Status of {data.firstName}</h2>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <FormGroup className="mb-3">
                        <Label>Status</Label>
                        <Input
                            id="status"
                            name="status"
                            type="select"
                            defaultValue={data.status}
                        >
                            <option defaultValue="Pending">Pending</option>
                            <option defaultValue="Approved">Approved</option>
                            <option defaultValue="Declined">Declined</option>
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
        {/* </Formik> */}
    </>)
};
const Approval = () => {
    const parsed = queryString.parse(window.location.search);
    let channelId = parsed._id;
    if (channelId) {

    } else {
        window.location.assign('/admin/ListApproval');
    }
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
            const response = await postWithParams(
                `/api/secure/channel/pending-users`,
                token,
                {
                    channelId
                }
            );

            setTableData(response.result.data.enrichPendingUsers);
            console.log("Get All Posts Response", response);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            getAllPosts();
            setTableHead([
                {
                    name: 'First Name',
                    sortable: true,
                    selector: row => row.firstName,
                },
                {
                    name: 'Email',
                    sortable: true,
                    selector: row => row.email,
                },
                {
                    name: 'phone',
                    sortable: true,
                    selector: row => row.phone,
                },
                {
                    name: 'Status',
                    sortable: true,
                    selector: row => row.status,
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

export default Approval
