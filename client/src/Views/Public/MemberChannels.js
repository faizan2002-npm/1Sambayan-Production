import UserLayout from '../../layouts/User/UserLayout'
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { Container, Row, Image } from 'react-bootstrap';
import { getRequest } from '../../api/request';
import { useState, useEffect } from 'react';
import { postWithParams } from './../../api/request';
import { Link } from 'react-router-dom';

const MemberChannels = () => {
    const [channelData, setChannelData] = useState([]);
    const getAllPosts = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/channel/channel-list`,
                token
            );
            setChannelData(response.result.data.channels)
            // console.log("response.result.data.channels list", response.result.data.channels);
        } catch (error) {
            console.log("response.result.data.channels list", error);
        }
    };
    const joinChannel = async (channelId, userId, onSuccess) => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await postWithParams(
                `/api/secure/channel/join-channel?channelId=${channelId}&senderId=${userId}`,
                token
            );
            if (response.result.status === 200) {
                window.location.assign('/MemberChannels')
            }
        } catch (error) {
            console.log("response.result.data.channels", error);
        }
    };
    const onSuccess = () => {
        alert(
            "Your request has been submitted successfully!",
            "You will be notified soon with response email",
            [
                {
                    text: "Ok",
                    onPress: () => getAllPosts(),
                },
            ],
            { cancelable: false }
        );
    };
    const onNext = (channelId, userId) => {
        // User attempts to click next when no fields have been set

        const success = () => {
            this.onSuccess();
        };
        return joinChannel(channelId, userId, success);
    };
    const renderButtonText = (item) => {
        let pending = false;
        let joined = false;
        let declined = false;
        // console.log("localStorage.getItem('USER_ID')",localStorage.getItem("USER_ID"))
        const buttonText = item.members.filter((member) => {
            if (member.userId == localStorage.getItem("USER_ID")) {
                if (member?.status === "Pending") {
                    pending = true;
                } else if (member?.status === "Approved") {
                    joined = true;
                } else if (member?.status === "Approved") {
                    declined = true;
                }
                // return member?.status;
            }
        });
        // console.log("buttonText",buttonText);
        if (pending) {
            return "Pending";
        } else if (joined) {
            return "Joined";
        } else if (declined) {
            return "Declined";
        } else {
            return "Join";
        }
    };
    const disableButton = (item) => {
        let disableButton = false;
        item.members.filter((member) => {
            if (member.userId === localStorage.getItem("USER_ID")) {
                if (member.userId === localStorage.getItem("USER_ID")) {
                    if (member?.status === "Pending") {
                        disableButton = true;
                    } else if (member?.status === "Approved") {
                        disableButton = true;
                    } else if (member?.status === "Declined") {
                        disableButton = false;
                    }
                }
            }
        });

        if (disableButton) {
            return true;
        } else {
            return false;
        }
    };
    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <UserLayout>
        <main id="main_content">
            <section className="py-5">
                <Container>
                    <h1 className="text-center">
                        My Channels
                    </h1>
                    {
                        (channelData) ?
                            channelData.map((e, index) => (<>
                                <Card className="mb-4">
                                    <CardBody>
                                        <Row>
                                            <Col lg={6} md={9} xs={9} className="align-self-center">
                                                <Row>
                                                    <Col lg={3} md={3} xs={4} className="align-self-center">
                                                        <Image src={"https://votewatchers.co.in/views/uploads/" + e.icon} fluid style={{
                                                            width: "55px",
                                                            height: "55px",
                                                            objectFit: "cover",
                                                            borderRadius: "50%",
                                                            boxShadow: "0px 0px 6px 1px #00000061",

                                                        }} />
                                                    </Col>
                                                    <Col lg={9} md={9} xs={8} className="align-self-center">
                                                        <h2>
                                                            {e.title}
                                                        </h2>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={6} md={3} xs={3} className="text-right align-self-center">
                                                <button className="btn text-white" onClick={() => onNext(e._id, localStorage.getItem("USER_ID"))} disabled={disableButton(e)} style={{
                                                    backgroundColor: renderButtonText(e) === "Joined" ? "#FF5EC1" : '#FF5EC1',
                                                }}>
                                                    {renderButtonText(e)}
                                                </button>
                                                {/* {renderButtonText(e)} */}
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </>))
                            : <>
                                <p className="text-center">Loading</p>
                            </>
                    }
                    <div className="row mt-4" >
                        <div className="col text-center">
                            <Link to="/account" className="btn ">
                                Back
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
            </main>
        </UserLayout>
    )
}

export default MemberChannels
