import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Form, Input, Label, Row } from 'reactstrap'
import Header from '../../../components/Admin/Headers/Header'
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { getRequest, postRequestForm, putRequest } from '../../../api/request';
import { Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import moment from 'moment';
// A super simple expandable component.
const ExpandedComponent = ({ data }) => {
    const [defaultData, setDefaultSlideData] = useState({
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        fbLink: data.fbLink,
        profession: data.profession,
        profileImage: "https://votewatchers.co.in/views/uploads/" + data.profileImage,
        country: data.country,
        city: data.city,
        province: data.province,
        region: data.region,
    })
    const [profileImage, setProfileImage] = useState({ image: data.profileImage, defaultImage: defaultData.profileImage })
    const changeProfileImage = (event) => {
        setProfileImage({ image: event.target.files[0], defaultImage: URL.createObjectURL(event.target.files[0]) })
    }
    const updateSlideHandler = async (e) => {
        e.preventDefault();
        console.log(e);
        const formData = new FormData();
        formData.append(
            "firstName",
            e.target[0].value
        );
        formData.append(
            "middleName",
            e.target[1].value
        );
        formData.append(
            "lastName",
            e.target[2].value
        );
        formData.append(
            "email",
            e.target[3].value
        );
        formData.append(
            "phone",
            e.target[4].value
        );
        formData.append(
            "profession",
            e.target[5].value
        );
        formData.append(
            "barangay",
            e.target[6].value
        );
        formData.append("country", e.target[7].value);
        formData.append("city", e.target[8].value);
        formData.append("province", e.target[9].value);
        formData.append("region", e.target[10].value);


        formData.append(
            "image",
            profileImage.image
        );
        formData.append(
            "userId",
            data._id
        );
        console.log('formData', formData)
        try {
            const token = localStorage.getItem("TOKEN");

            const response = await putRequest(
                "/api/secure/user/edit-profile",
                token,
                formData,
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
    return (<>
        <Row className="m-0">
            <Form className="form" encType="multipart/form-data" method="post" onSubmit={updateSlideHandler}>
                <Row className="m-0">
                    <Col xs={12} className="my-3">
                        <h2>Edit Post {data.firstName}</h2>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>First Name</Label>
                            <Input
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                className="form-control"
                                defaultValue={data.firstName}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>Middle Name</Label>
                            <Input
                                name="middleName"
                                type="text"
                                placeholder="Middle Name"
                                className="form-control"
                                defaultValue={data.middleName}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>Last Name</Label>
                            <Input
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                className="form-control"
                                defaultValue={data.lastName}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>Email</Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="form-control"
                                defaultValue={data.email}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>Phone</Label>
                            <Input
                                name="phone"
                                type="text"
                                placeholder="Phone"
                                className="form-control"
                                defaultValue={data.phone}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>Profession</Label>
                            <Input
                                name="profession"
                                type="text"
                                placeholder="Profession"
                                className="form-control"
                                defaultValue={data.profession}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>Barangay</Label>
                            <Input
                                name="barangay"
                                type="text"
                                placeholder="Barangay"
                                className="form-control"
                                defaultValue={data.barangay}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>Country</Label>
                            <Input
                                name="country"
                                type="text"
                                placeholder="Country"
                                className="form-control"
                                defaultValue={data.country}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>City</Label>
                            <Input
                                name="city"
                                type="text"
                                placeholder="City"
                                className="form-control"
                                defaultValue={data.city}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>Province</Label>
                            <Input
                                name="province"
                                type="text"
                                placeholder="Province"
                                className="form-control"
                                defaultValue={data.province}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>Region</Label>
                            <Input
                                name="region"
                                type="text"
                                placeholder="Region"
                                className="form-control"
                                defaultValue={data.region}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <FormGroup className="mb-3">
                            <Label>Featured Image</Label>
                            <input id="image" name="image" type="file" onChange={changeProfileImage} className="form-control" />
                            {
                                (profileImage.defaultImage) ? <Image src={profileImage.defaultImage} alt="profils pic" fluid /> : ''
                            }
                        </FormGroup>
                    </Col>
                    <Col className="text-center mt-3 mb-4" xs={12}>
                        <Button type="submit" color="success" outline>
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Row>
    </>)
};

const ListMembers = () => {
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
                `/api/secure/user/get-all-users`,
                token
            );

            setTableData(response.result.data.users);
            console.log("Get All Posts Response", response);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const deleteSinglePost = async (userId, row, index, column, id) => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("id request to delete the post", id);
            // var params = props.location.search.slice(5);
            const response = await postRequestForm(
                `/api/secure/user/delete-user`,
                token, { userId }
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

export default ListMembers
