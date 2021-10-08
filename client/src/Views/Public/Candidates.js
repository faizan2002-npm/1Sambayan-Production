import { getRequest } from '../../api/request';
import PublicLayout from '../../layouts/Public/PublicLayout'
import { PostCard } from './../../components/Public/PostCard';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Candidates = () => {
    const [candidatesData, setCandidatesData] = useState([]);
    const getAllCandidates = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/candidate/candidate-list`,
                token
            );
            setCandidatesData(response.result.data.candidates)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getAllCandidates();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">
                <section className="latest_posts v2">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={10} md={10} xs={12} className="text-center">
                                <h1>Candidates</h1>
                            </Col>
                            <Col lg={12} md={12} xs={12}>
                                <Row className="justify-content-center">
                                {
                                    candidatesData.map((e, index) => (
                                        <Col lg={4} md={4} xs={12} key={`id_${e._id}_${index}`} >
                                            <PostCard heading={e.title} image={"https://1sambayan-env.eba-5wmwf5mk.us-east-1.elasticbeanstalk.com/views/uploads/" + e.image} grid={false} row={false} />
                                        </Col>
                                    ))
                                }
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
        </PublicLayout>
    )
}

export default Candidates
