import React from 'react'
import { getRequest } from '../../api/request';
import PublicLayout from '../../layouts/Public/PublicLayout'
import { PostCard } from './../../components/Public/PostCard';
import { useState, useEffect } from 'react';

const Comunities = () => {
    const [comunitiesData, setComunitiesData] = useState([]);
    const getAllComunities = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/community/community-list`,
                token
            );
            setComunitiesData(response.result.data.communities)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getAllComunities();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">
                <section className="latest_posts v2">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10 col-12">
                                <h1>Chapters</h1>
                                {
                                    comunitiesData.map((e, index) => (
                                        <PostCard key={`id_${e._id}_${index}`} heading={e.title} text={e.description} time={e.createdAt} video={false} image={"https://1sambayan-env.eba-5wmwf5mk.us-east-1.elasticbeanstalk.com/views/uploads/" + e.image} grid={true} />
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    )
}

export default Comunities
