import { useState, useEffect } from 'react';
import PublicLayout from '../../layouts/Public/PublicLayout';
import { Link } from 'react-router-dom';
import { getRequest } from '../../api/request';
const queryString = require('query-string');


const SinglePost = () => {
    // const params = props.location.search.slice(5);
    const [postData, setPostData] = useState([]);
    const parsed = queryString.parse(window.location.search);
    if (parsed._id) {

    } else {
        window.location.assign('/news');
    }
    const getSingleConvenors = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/post/single/?postId=${parsed._id}`,
                token
            );
            setPostData(response.result.data.post)
            // console.log('Singlepost', response.result.data.post);
        } catch (error) {
            console.log("Get Singlepost Error", error);
        }
    };
    useEffect(() => {
        getSingleConvenors();
    }, []);
    return (
        <>
            {
                (postData) ? <>
                    <PublicLayout title={(postData.title) ? postData.title.substring(0, 50) : postData.title} description={(postData.description) ? postData.description.substring(0, 150) : postData.description} image={"https://sambayan-1.s3.ap-south-1.amazonaws.com/" + postData.image} url={`https://1sambayan.org/singlePost?_id=${parsed._id}`}>

                        <main id="main_content">
                            <section className="section-9">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-10 col-md-10 col-12">

                                            <div className="row my-10 justify-content-center">
                                                <div className="col-lg-6 col-md-6 col-12">
                                                    <img src={"https://sambayan-1.s3.ap-south-1.amazonaws.com/" + postData.image} className="img-fluid w-100" alt="" />
                                                </div>
                                                <div className="col-lg-6 col-mg-6 col-12">
                                                    <h3>
                                                        {postData.title}
                                                    </h3>
                                                    <p>
                                                        {postData.description}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="fgd d-flex justify-content-center">
                                <Link to="/posts" className="btn ">
                                    back
                                </Link>
                            </div>
                        </main>
                    </PublicLayout>
                </> : ''
            }
        </>
    )
}

export default SinglePost
