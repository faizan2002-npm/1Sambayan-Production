import React from 'react'
import { getRequest } from '../../api/request';
import PublicLayout from './../../layouts/Public/PublicLayout';
import { useState, useEffect } from 'react';
import OwlCarousel from "react-owl-carousel";

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
                <section className="section-7">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10 col-12">
                                {
                                    (postData) ? <OwlCarousel id="candidates_carousel" className='owl-theme' {...carouselOptions} >
                                        {
                                            postData.map((e, index) => (
                                                <div key={`id_${e._id}_${index}`} className="card" style={{
                                                    backgroundImage: `url('${"https://1sambayan-env.eba-5wmwf5mk.us-east-1.elasticbeanstalk.com/views/uploads/" + e.image}')`
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
                                    </OwlCarousel> : <h2>
                                        Loading
                                    </h2>
                                }

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    )
}

export default News
