import images from "../../Constants/Admin/images";
import React, { useState } from "react";
import UserLayout from '../../layouts/User/UserLayout';
import { useHistory } from "react-router-dom";
import ImageUploader from "react-images-upload";

const Account = () => {
    const [pictures, setPictures] = useState([]);

    const onDrop = picture => {
        setPictures([...pictures, picture]);
    };
    const history = useHistory();
    return (
        <UserLayout>
            <section className="section-1">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="img_cover">
                                        {/* <img src={images.Profile} className=" img-fluid w-30" alt="..." />
                                        <a to="#" class="Shape">
                                            <img src={images.EditShape} class="img-fluid" alt="" />
                                        </a> */}
                                        <ImageUploader
                                            withPreview={true}
                                            
                                            withIcon={false}
                                            withLabel={false}
                                            singleImage={true}
                                            onChange={onDrop}
                                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                            maxFileSize={5242880}
                                        />
                                    </div>
                                    <h4>
                                        {`${localStorage.getItem("USER_FIRSTNAME")} ${localStorage.getItem("USER_LASTNAME")}`}
                                    </h4>
                                    <p className="p_1">
                                        Email: {`${localStorage.getItem("USER_EMAIL")}`}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row my-3 gh d-flex justify-content-center">
                        <div className="col-lg-4 col-md-4 col-12">
                            <button className="btn w-100" onClick={() => {
                                history.push("/MemberJoinedChannels");
                            }}>
                                <div className="d-flex">
                                    <div className="back text-white">
                                        <i class="fal fa-file-signature"></i>
                                    </div>
                                    <p className="p_3">
                                        My Joined Events
                                    </p>
                                </div>
                            </button>
                            <hr className="mb-1 mt-3" />
                        </div>
                    </div>
                    <div className="row my-3  d-flex justify-content-center">
                        <div className="col-lg-4 col-md-4 col-12">
                            <button className="btn w-100" onClick={() => {
                                history.push("/MemberChannels");
                            }}>
                                <div className="d-flex">
                                    <div className="back text-white">
                                        <i class="fal fa-tv"></i>
                                    </div>
                                    <p className="p_3">
                                        My Channels
                                    </p>
                                </div>
                            </button>
                            <hr className="mb-1 mt-3" />
                        </div>
                    </div>
                    <div className="row my-3  d-flex justify-content-center">
                        <div className="col-lg-4 col-md-4 col-12">
                            <button className="btn w-100" onClick={() => {
                                history.push("/MemberEditProfile");
                            }}>
                                <div className="d-flex">
                                    <div className="back text-white">
                                        <i class="fal fa-pen"></i>
                                    </div>
                                    <p className="p_3">
                                        Edit Profile
                                    </p>
                                </div>
                            </button>
                            <hr className="mb-1 mt-3" />
                        </div>
                    </div>
                    <div className="row my-3  d-flex justify-content-center">
                        <div className="col-lg-4 col-md-4 col-12">
                            <button className="btn w-100" onClick={() => {
                                history.push("/MemberChangePassword");
                            }}>
                                <div className="d-flex">
                                    <div className="back text-white">
                                        <i class="fal fa-key"></i>
                                    </div>
                                    <p className="p_3">
                                        Change Password
                                    </p>
                                </div>
                            </button>
                            <hr className="mb-1 mt-3" />
                        </div>
                    </div>
                    <div className="row my-3 hk d-flex justify-content-center">
                        <div className="col-lg-4 col-md-4 col-12">
                            <button className="btn w-100" onClick={() => {
                                localStorage.removeItem("TOKEN");
                                history.push("/login");
                            }}>
                                <div className="d-flex">
                                    <div className="back text-white">
                                        <i class="fal fa-sign-out"></i>
                                    </div>
                                    <p className="p_3">
                                        Logout
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    )
}

export default Account;
