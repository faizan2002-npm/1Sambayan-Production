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
import * as _ from 'underscore'
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
const ExpandedComponent = ({ data }) => {
    const [defaultData, setDefaultSlideData] = useState({
        title: data.title,
        image: "https://sambayan-1.s3.ap-south-1.amazonaws.com/" + data.icon,
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
        const formData = new FormData();
        formData.append(
            "title",
            e.target[0].value
        );
        formData.append(
            "icon",
            featuredImage.image
        );
        formData.append(
            "status",
            e.target[2].value
        );
        formData.append(
            "channelId",
            data._id
        );
        const token = localStorage.getItem("TOKEN");
        try {
            const response = await putRequest(
                "/api/secure/channel/update",
                token,
                formData
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
            <Row className="m-0">
                <Col xs={12} className="my-3">
                    <h2>Edit Post {data.title}</h2>
                </Col>
                <Col xs={12}>
                    <FormGroup className="mb-3">
                        <Label>Title</Label>
                        <Input
                            name="title"
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            defaultValue={data.title}
                        />
                    </FormGroup>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <FormGroup className="mb-3">
                        <Label>Featured Image</Label>
                        <input id="image" name="image" type="file" onChange={changeFeaturedImage} className="form-control" />
                        {
                            (featuredImage.defaultImage) ? <Image src={featuredImage.defaultImage} alt="profils pic" fluid /> : ''
                        }
                    </FormGroup>
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
                            {/* {data.status == "Active" ? <> */}
                                <option selected defaultValue="Active">Active</option>
                            {/* </> : <> */}
                                <option selected defaultValue="InActive">InActive</option>
                            {/* </>} */}
                        </Input>
                    </FormGroup>
                </Col>
                <Col className="text-center mt-5" xs={12}>
                    <Button type="submit" color="success" >
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
        {/* </Formik> */}
    </>)
};

const ListChannels = () => {
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
                `/api/secure/channel/channel-list`,
                token
            );

            setTableData(response.result.data.channels);
            console.log("Get All Posts Response", response);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const deleteSinglePost = async (channelId, row, index, column, id) => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("id request to delete the post", id);
            // var params = props.location.search.slice(5);
            const response = await postRequestForm(
                `/api/secure/channel/delete-channel`,
                token, { channelId }
            );
            // console.log(response);
            if (response.result.status === 200) {
                toast.success('Candidate Deleted', {
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
                    selector: row => row.title,
                },
                {
                    name: 'Date',
                    sortable: true,
                    selector: row => moment(row.createdAt).format("dddd, MMMM Do YYYY"),
                },
                {
                    name: 'Status',
                    sortable: true,
                    selector: row => row.status,
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
                                    data={_.sortBy(tableData, 'total').reverse()}
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

export default ListChannels
