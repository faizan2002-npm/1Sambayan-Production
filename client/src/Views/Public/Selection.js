import { useState, useEffect } from 'react';
import { Image, Container, Row, Col } from "react-bootstrap";
import { getRequest } from "../../api/request";
import img from "../../Constants/Admin/images";
import PublicLayout from "../../layouts/Public/PublicLayout";

const Selection = () => {
    const [banner, setBanner] = useState()
    const [afterBanner, setAfterBanner] = useState();
    const [leftSideContent, setLeftSideContent] = useState()
    const [rightSideContent, setRightSideContent] = useState();
    const getPageData = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/site/pages?name=Selection Process`,
                token
            );
            setBanner(response.result.data.pages[0].sections[0]);
            setAfterBanner(response.result.data.pages[0].sections[1]);
            setLeftSideContent(response.result.data.pages[0].sections[2]);
            setRightSideContent(response.result.data.pages[0].sections[3]);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getPageData();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">
                {
                    (banner) ? <section className="home_banner">
                        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <Image src={img.Image} className="d-block w-100" fluid />
                                    <div className="carousel-caption">
                                        <Container>
                                            <Row className="justify-content-center">
                                                <Col lg={10} md={10} xs={12} className="text-center">
                                                    <h1>
                                                        SELECTION PROCESS
                                                    </h1>
                                                    <h4>
                                                        FINDING / THE ONE
                                                    </h4>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : ""
                }
                {
                    (afterBanner && leftSideContent && rightSideContent) ? <section className="section-3">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={10} md={10} xs={12}>
                                    <div dangerouslySetInnerHTML={{
                                        __html: afterBanner.heading,
                                    }} ></div>
                                    <Row className="justify-content-center my-5">
                                        <Col lg={6} md={6} xs={12} dangerouslySetInnerHTML={{
                                            __html: leftSideContent.sectionContentBox,
                                        }} />
                                        <Col lg={6} md={6} xs={12} dangerouslySetInnerHTML={{
                                            __html: rightSideContent.sectionContentBox,
                                        }} />
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </section> : ''
                }
            </main>
        </PublicLayout >
    )
}
export default Selection;
