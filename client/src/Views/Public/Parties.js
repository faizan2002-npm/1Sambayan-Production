import { Container, Row, Col } from 'react-bootstrap';
import { getRequest } from '../../api/request';
import PublicLayout from '../../layouts/Public/PublicLayout'
import { PostCard } from './../../components/Public/PostCard';
import { useState, useEffect } from 'react';

const Parties = () => {
    const [partiesData, setPartiesData] = useState([]);
    const getAllParties = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/party/party-list`,
                token
            );
            setPartiesData(response.result.data.parties)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getAllParties();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">
                <section className="latest_posts v2">
                <Container>
                        <Row className="justify-content-center">
                            <Col lg={10} md={10} xs={12} className="text-center">
                                <h1>Member Organizations</h1>
                            </Col>
                            <Col lg={12} md={12} xs={12}>
                                <Row className="justify-content-center">
                                {
                                    partiesData.map((e, index) => (
                                        <Col lg={4} md={4} xs={12} key={`id_${e._id}_${index}`} >
                                            <PostCard heading={e.title} image={"https://sambayan-1.s3.ap-south-1.amazonaws.com/" + e.image} grid={false} row={false} />
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

export default Parties
