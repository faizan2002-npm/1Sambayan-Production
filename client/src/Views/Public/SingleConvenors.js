import React from 'react'
import { useState, useEffect } from 'react';
import PublicLayout from './../../layouts/Public/PublicLayout';
import { Link } from 'react-router-dom';
import { getRequest } from '../../api/request';
const queryString = require('query-string');

const SingleConvenors = (props) => {
    // const params = props.location.search.slice(5);
    const [convenorData, setConvenorData] = useState([]);
    const parsed = queryString.parse(window.location.search);
    if (parsed._id) {

    } else {
        window.location.assign('/convenors');
    }
    const getSingleConvenors = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/convenor/?postId=${parsed._id}`,
                token
            );
            setConvenorData(response.result.data.convenor)
            console.log('SingleConvenor',response.result.data.convenor);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    useEffect(() => {
        getSingleConvenors();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">
                <section className="section-9">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10 col-12">
                                {
                                    (convenorData) ? <> <p>
                                        <b>THE CONVENORS</b> lorem ipsum sit dolor nobis exceperibus et audit fugit que repudig
                                        nimusci iur moluptate
                                        maximinum que quate optatur? Quia as aut assim quia verume nonsequam iusam volupti con eos
                                        sum quam,
                                        comnis ut odigeni hicienis exped qui volorro molectum aut expernam re nit quo magnis mod
                                        quodiost que nem
                                        id maiore, offici volupid erspicto corerfera cupti omnihil in remquas sed endit voloris
                                        maiorecerro coresciet
                                    </p>
                                        <div className="row my-10 justify-content-center">
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <img src={"https://1sambayan-env.eba-5wmwf5mk.us-east-1.elasticbeanstalk.com/views/uploads/" + convenorData.image} className="img-fluid w-100" alt="" />
                                            </div>
                                            <div className="col-lg-6 col-mg-6 col-12">
                                                <h3>
                                                    {convenorData.title}
                                                </h3>
                                                <h5>
                                                    {convenorData.desigination}
                                                </h5>
                                                <p>
                                                    {convenorData.description}
                                                </p>
                                            </div>
                                        </div></> : ''
                                }

                            </div>
                        </div>
                    </div>
                </section>
                <div className="fgd d-flex justify-content-center">
                    <Link to="/convenors" className="btn ">
                        back
                    </Link>
                </div>
            </main>
        </PublicLayout>
    )
}

export default SingleConvenors
