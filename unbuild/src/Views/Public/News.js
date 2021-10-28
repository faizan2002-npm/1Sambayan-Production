import React from 'react'
import { getRequest } from '../../api/request';
import PublicLayout from './../../layouts/Public/PublicLayout';
import { useState, useEffect } from 'react';
import OwlCarousel from "react-owl-carousel";
import { PostCard } from './../../components/Public/PostCard';
import { Container, Row, Col } from 'react-bootstrap';

const News = () => {
    const [postData, setPostData] = useState([]);

    const carouselOptions = {
        margin: 25,
        responsiveClass: true,
        nav: true,
        dots: false,
        autoplay: false,
        smartSpeed: 1500,
        // rows: true,
        items: 4,
        // rowsCount: 2,
        responsive: {
            0: {
                margin: 50,
                items: 2,
                // rows: 1
            },
            768: {
                margin: 50,

                items: 3,
                // rows: 3
            },
            991: {
                margin: 50,
                items: 4,
                // rows: 2
            },
            1199: {
                items: 4,
                // rows: 2
            }
        },
    };
    const getAllPosts = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/post/post-list`,
                token
            );
            setPostData(response.result.data.posts)
            console.log("response.result.data.posts", response.result.data.posts);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">
            <section className="latest_posts v2">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={10} md={10} xs={12} className="text-center">
                                <h1>News</h1>
                            </Col>
                            <Col lg={10} md={10} xs={12}>
                                {
                                    (postData) ? <>
                                        {/* <OwlCarousel id="candidates_carousel" className='owl-theme' {...carouselOptions} >
                                        {
                                            postData.map((e, index) => (
                                                <div key={`id_${e._id}_${index}`} className="card" style={{
                                                    backgroundImage: `url('${"https://votewatchers.co.in/views/uploads/" + e.image}')`
                                                }}>
                                                    <div className="card-body">

                                                        <h2>
                                                            {e.title}
                                                        </h2>
                                                        <div className="text-center">
                                                            <a to="#" className="read btn">
                                                                Read more
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </OwlCarousel> */}
                                        {
                                            postData.map((e, index) => (
                                                <PostCard key={`id_${e._id}_${index}`} heading={e.title} text={e.description} time={e.createdAt} video={"https://votewatchers.co.in/views/uploads/" + e.image} image={false} grid={true} />
                                            ))
                                        }
                                    </> : <h2>
                                        Loading
                                    </h2>
                                }
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
        </PublicLayout>
    )
}

export default News
