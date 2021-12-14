
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row, Col, Form, Button, FormLabel, Image } from 'react-bootstrap';
import { Input } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';
import { toast } from 'react-toastify';
import { getRequest, putRequest } from '../../api/request';
import PartyHeader from '../../components/Party/PartyHeader';

const EditParty = () => {
    const [party, setParty] = useState();
    const [featuredImage, setFeaturedImage] = useState({ image: '', defaultImage: '' });
    const GetParty = async () => {
        const partyId = localStorage.getItem("PARTY_ID");
        const response = await getRequest(
            `/api/secure/party/?partyId=${partyId}`
        );
        setParty(response.result.data.party);
        setFeaturedImage({ image: response.result.data.party.image, defaultImage: "https://sambayan-1.s3.ap-south-1.amazonaws.com/" + response.result.data.party.image })
    }
    const changeFeaturedImage = (event) => {
        setFeaturedImage({ image: event.target.files[0], defaultImage: URL.createObjectURL(event.target.files[0]) })
    }
    const updateParty = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append(
                "title",
                e.target[0].value
            );
            formData.append(
                "email",
                e.target[1].value
            );
            formData.append(
                "image",
                featuredImage.image
            );
            formData.append(
                "partyId",
                localStorage.getItem("PARTY_ID")
            );
            const token = localStorage.getItem("TOKEN");
            const response = await putRequest(
                "/api/secure/party/update",
                token,
                formData,
            );
            if (response.result.status === 200) {
                toast.success('Party Updated', {
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
    useEffect(() => {
        GetParty();
    }, [])

    return (
        <>
            {
                (party) ? <>
                    <PartyHeader />
                    <Container className="mt--7" fluid>
                        <Row className="mt-5">
                            <Col className="mb-5 mb-xl-0" xl="12">
                                <Card className="shadow">
                                    <CardBody>
                                        <Form className="form" encType="multipart/form-data" method="post" onSubmit={updateParty}>
                                            <Row>
                                                <Col lg={6} md={6} xs={12}>
                                                    <Form.Group className="mb-3">
                                                        <FormLabel>Title</FormLabel>
                                                        <Input
                                                            name="title"
                                                            type="text"
                                                            placeholder="Title"
                                                            className="form-control"
                                                            defaultValue={party.title}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6} md={6} xs={12}>
                                                    <Form.Group className="mb-3">
                                                        <FormLabel>Email</FormLabel>
                                                        <Input
                                                            name="email"
                                                            type="email"
                                                            placeholder="Email"
                                                            className="form-control"
                                                            defaultValue={party.email} />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6} md={6} xs={12}>
                                                    <Form.Group className="mb-3">
                                                        <FormLabel>Featured Image</FormLabel>
                                                        <input id="image" name="image" type="file" onChange={changeFeaturedImage} className="form-control" />
                                                        {
                                                            (featuredImage.defaultImage) ? <Image src={featuredImage.defaultImage} alt="profils pic" fluid /> : ''
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
                </> : ''
            }
        </>
    )
}

export default EditParty