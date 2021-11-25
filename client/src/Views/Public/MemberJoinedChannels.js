import UserLayout from '../../layouts/User/UserLayout'
import { Container, Row } from 'react-bootstrap';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { getRequest } from '../../api/request';
import { useState, useEffect } from 'react';

const MemberJoinedChannels = () => {
    const [joinedChannelData, setJoinedChannelData] = useState([]);
    const getAllPosts = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/channel/get-user-channel`,
                token
            );
            setJoinedChannelData(response.result.data.channels)
            console.log("response.result.data.channels", response.result.data.posts);
        } catch (error) {
            console.log("response.result.data.channels", error);
        }
    };
    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <UserLayout>
            <section className="py-5">
                <Container>
                    <h1 className="text-center">
                        My Approvals
                    </h1>
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col lg={6} md={6} xs={6}>
                                    <h2>
                                        Activities
                                    </h2>
                                </Col>
                                <Col lg={6} md={6} xs={6} className="text-right">
                                    <h2>
                                        Status
                                    </h2>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {
                                (joinedChannelData) ? <>
                                    {
                                        joinedChannelData.map((e, index) => (<>
                                            <Row className="mb-4">
                                                <Col lg={6} md={6} xs={6}>
                                                    <h5>
                                                        {e.title}
                                                    </h5>
                                                </Col>
                                                <Col lg={6} md={6} xs={6} className="text-right">
                                                    <h5 className="text-right" >
                                                        <span style={{
                                                            backgroundColor:
                                                                e.members[0].status === "Approved"
                                                                    ? "#00A15E"
                                                                    : e.members[0].status === "Declined"
                                                                        ? "#a60a1a"
                                                                        : "#eee",
                                                            padding: "8px 16px",
                                                            borderRadius: "5px",
                                                        }}>
                                                            {e.members[0].status}
                                                        </span>
                                                    </h5>
                                                </Col>
                                            </Row>
                                        </>))
                                    }
                                </> : <>
                                    <p className="text-center">Loading</p>
                                </>
                            }
                        </CardBody>
                    </Card>
                </Container>
            </section>
        </UserLayout>
    )
}

export default MemberJoinedChannels
