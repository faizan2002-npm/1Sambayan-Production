import images from "../../Constants/Admin/images";
import React, { useState, useEffect } from "react";
import UserLayout from '../../layouts/User/UserLayout';
import { useHistory } from "react-router-dom";
import ImageUploader from "react-images-upload";
import ImageUploading from 'react-images-uploading';
import { getRequest, putRequest } from "../../api/request";
import { toast } from 'react-toastify';

const Account = () => {
    const [profileImage, setProfileImage] = useState();
    const [images, setImages] = React.useState([]);
    const [pictures, setPictures] = useState(['https://votewatchers.co.in/views/uploads/logo.png']);

    const onDrop = picture => {
        setPictures([...pictures, picture]);
        console.log("picture", picture)
    };
    const getProfileImage = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/user/profile`,
                token
            );
            console.log("response.result.data.user", response.result.data.user.profileImage);
            if (response.result.data.user.profileImage) {
                setImages([{
                    data_url: "https://votewatchers.co.in/views/uploads/" + response.result.data.user.profileImage
                }])
            } else {
                setImages();
            }
        } catch (error) {
            console.log("Get Member Profile error", error);
        }
    }
    const history = useHistory();
    const maxNumber = 69;

    const onChange = async (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        // const profileImageData = {
        //     image: imageList[addUpdateIndex].file
        // }
        try {
            const formData = new FormData();
            formData.append(
                "image",
                imageList[addUpdateIndex].file
            );
            formData.append(
                "userId",
                localStorage.getItem("USER_ID")
            );
            const token = localStorage.getItem("TOKEN");
            const response = await putRequest(
                `/api/secure/user/edit-profile`,
                token,
                formData,
            );
            //  console.log("response",response);
            // if(response.result.data.user.profileImage){
            if (response.result.status === 200) {
                toast.success('Image Updated', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setImages();
            }
        } catch (error) {
            console.log("Get Member Profile Saving error", error);
        }
    };
    useEffect(() => {
        getProfileImage();
    }, [])
    return (
        <UserLayout>
            <main id="main_content">
                <section className="section-1">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-3 col-md-4 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="img_cover">
                                            <ImageUploading
                                                multiple
                                                value={images}
                                                onChange={onChange}
                                                maxNumber={maxNumber}
                                                dataURLKey="data_url"
                                                multiple={false}
                                                maxNumber={1}
                                            >
                                                {({
                                                    imageList,
                                                    onImageUpload,
                                                    onImageUpdate,
                                                    isDragging,
                                                    dragProps,
                                                }) => (
                                                    // write your building UI
                                                    <div className="upload__image-wrapper">
                                                        <button
                                                            style={isDragging ? { color: 'red' } : undefined}
                                                            onClick={onImageUpload}
                                                            {...dragProps}
                                                        >
                                                            <i class="fal fa-plus"></i>
                                                        </button>
                                                        {(imageList) ? imageList.map((image, index) => (
                                                            <div key={index} className="image-item">
                                                                <img src={image['data_url']} alt="" />
                                                                <div className="image-item__btn-wrapper">
                                                                    <button onClick={() => onImageUpdate(index)}>
                                                                        <i class="fal fa-pencil-alt"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )) : ''}
                                                    </div>
                                                )}
                                            </ImageUploading>
                                            {/* <ImageUploader
                                            withPreview={true}
                                            singleImage={true}
                                            buttonText=""
                                            withIcon={false}
                                            withLabel={false}
                                            singleImage={true}
                                            onChange={onDrop}
                                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                            maxFileSize={5242880}
                                            defaultImages={pictures}
                                        /> */}
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
                                    localStorage.clear();
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
            </main>
        </UserLayout>
    )
}

export default Account;
