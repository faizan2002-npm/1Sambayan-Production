import React from 'react'
import PublicLayout from '../../layouts/Public/PublicLayout';
import images from "../../Constants/Admin/images";

const Account = () => {
    return (
        <PublicLayout>
            <section className="section-1">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="img_cover">
                                        <img src={images.Profile} className=" img-fluid w-30" alt="..."/>
                                        <a to="#" class ="Shape">
                                        <img src={images.EditShape} class ="img-fluid" alt=""/>
                                        </a>
                                    </div>
                                    <h4>
                                        Ganu Patson
                                    </h4>
                                    <p className="p_1">
                                        Email: ganu.patson@gmail.com
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row row_2">
                        <div className="col-lg-8 col-md-8 col-12">
                            <p className="p_2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                                viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                    </div>
                    <div className="row my-3 gh d-flex justify-content-center">
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="d-flex">
                                <div className="back">
                                    <img src={images.ReferShape} alt="" className="img-fluid "/>
                                </div>
                                <p className="p_3">
                                    Refer your friends
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="row my-3  d-flex justify-content-center">
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="d-flex">
                                <div className="back">
                                <img src={images.ReferShape} alt="" className="img-fluid "/>
                                </div>
                                <p className="p_3">
                                    Refer your friends
                                </p>
                            </div>

                        </div>

                    </div>
                    <div className="row my-3 hk d-flex justify-content-center">
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="d-flex">
                                <div className="back">
                                <img src={images.ReferShape} alt="" className="img-fluid "/>
                                </div>
                                <p className="p_3">
                                    Refer your friends
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}

export default Account;
