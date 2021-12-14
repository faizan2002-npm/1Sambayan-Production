import React, { useState, useEffect } from 'react'
import UserLayout from './../../layouts/User/UserLayout';
import { Link } from 'react-router-dom';
import { getRequest } from '../../api/request';
import { Container, Card } from 'react-bootstrap';
import { CardBody } from 'reactstrap';
export const MemberPollsAndPositions = () => {
    const [pollsData, setPollsData] = useState([]);
    const [positionsData, setPositionsData] = useState([]);
    const getPolls = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/poll/poll-list`,
                token
            );
            setPollsData(response.result.data.polls)
            // console.log("response.result.data.channels list", response.result.data.channels);
        } catch (error) {
            console.log("response.result.data.polls list", error);
        }
    };
    const getPositions = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/position/position-list`,
                token
            );
            setPositionsData(response.result.data.positions)
            // console.log("response.result.data.channels list", response.result.data.channels);
        } catch (error) {
            console.log("response.result.data.positions list", error);
        }
    };
    useEffect(() => {
        getPolls();
        getPositions();
    }, []);
    return (
        <UserLayout>
            <main id="main_content">
                <section className="py-5">
                    <Container>
                        <h1 className="text-center">
                            Polls
                        </h1>
                        {
                            (pollsData) ?
                                pollsData.map((e, index) => (<>
                                    <Card className="mb-4">
                                        <CardBody>
                                            <Link to={`/singlePoll?_id=${e._id}`}>
                                                <h2>
                                                    {e.name}
                                                </h2>
                                            </Link>
                                        </CardBody>
                                    </Card>
                                </>))
                                : <>
                                    <p className="text-center">Not Available</p>
                                </>
                        }
                    </Container>
                </section>
                <section className="py-5">
                    <Container>
                        <h1 className="text-center">
                            Positions
                        </h1>
                        {
                            (positionsData) ?
                                positionsData.map((e, index) => (<>
                                    <Card className="mb-4">
                                        <CardBody>
                                            <Link to={`/singlePosition?_id=${e._id}`}>
                                                <h2>
                                                    {e.name}
                                                </h2>
                                            </Link>
                                        </CardBody>
                                    </Card>
                                </>))
                                : <>
                                    <p className="text-center">Not Available</p>
                                </>
                        }
                    </Container>
                </section>
                <section className="py-5">
                    <Container>
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
