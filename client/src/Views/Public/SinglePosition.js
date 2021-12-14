import { useState, useEffect } from 'react';
import UserLayout from './../../layouts/User/UserLayout';
import { Link } from 'react-router-dom';
import { getRequest } from '../../api/request';
import { Container } from 'react-bootstrap';
import { postWithParams } from './../../api/request';
const queryString = require('query-string');


const SinglePosition = () => {
    // const params = props.location.search.slice(5);
    const [postData, setPostData] = useState();
    const parsed = queryString.parse(window.location.search);
    if (parsed._id) {

    } else {
        window.location.assign('/MemberPollsAndPositions');
    }
    const getSingleConvenors = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/position/?positionId=${parsed._id}`,
                // '/api/secure/position/?positionId='+parsed._id,
                token
            );
            console.log("data", response.result.data.position);
            setPostData(response.result.data.position)
            // console.log('Singlepost', response.result.data.post);
        } catch (error) {
            console.log("Get Singlepost Error", error);
        }
    };
    const joinChannel = async (channelId, userId, onSuccess) => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await postWithParams(
                `/api/secure/position/apply-position?positionId=${channelId}&userId=${userId}`,
                token
            );
            if (response.result.status === 200) {
                window.location.assign(`/singlePosition?_id=${channelId}`)
            }
        } catch (error) {
            console.log("response.result.data.apply-position", error);
        }
    };
    const onSuccess = () => {
        alert(
            "You have already applied for this Posiion",
            [
                {
                    text: "Ok",
                    onPress: () => getSingleConvenors(),
                },
            ],
            { cancelable: false }
        );
    };
    const onNext = (channelId, userId) => {
        // User attempts to click next when no fields have been set

        const success = () => {
            onSuccess();
        };
        return joinChannel(channelId, userId, success);
    };
    const renderButtonText = (item) => {
        let applied = false;
        if (item.members.length) {
            const buttonText = item.members.filter((member) => {
                if (member.userId == localStorage.getItem("USER_ID")) {
                    if (member?.status === "Applied") {
                        applied = true;
                    }
                    // return member?.status;
                }
            });
            // console.log("buttonText",buttonText);
            if (applied) {
                return "Applied";
            } else {
                return "Apply Now";
            }
        } else {
            return "Apply Now";
        }
        //
    };
    const disableButton = (item) => {
        let disableButton = false;
        if (item.members.length) {
            console.log("item", item.members)
            item.members.filter((member) => {
                if (member.userId === localStorage.getItem("USER_ID")) {
                    if (member.userId === localStorage.getItem("USER_ID")) {
                        // if (member?.status === "Applied") {
                            disableButton = true;
                        // }
                    }
                }
            });
            if (disableButton) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    };
    useEffect(() => {
        getSingleConvenors();
    }, []);
    return (
        <>
            {
                (postData) ? <>
                    <UserLayout>

                        <main id="main_content">
                            <section className="py-5">
                                <Container>
                                    <h1 className="text-center">
                                        {postData.name}
                                    </h1>
                                </Container>
                            </section>
                            <section className="section-9 pt-0 pb-5">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-10 col-md-10 col-12">

                                            <div className="row justify-content-center">
                                                <div className="col-lg-6 col-mg-6 col-12 text-center">
                                                    <p>
                                                        {postData.description}
                                                    </p>
                                                    <button className="btn text-white" onClick={() => onNext(postData._id, localStorage.getItem("USER_ID"))} disabled={disableButton(postData)} style={{
                                                        backgroundColor: renderButtonText(postData) === "Applied" ? "#FF5EC1" : '#FF5EC1',
                                                    }}>
                                                        {renderButtonText(postData)}
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="fgd d-flex justify-content-center pb-5">
                                <Link to="/MemberPollsAndPositions" className="btn ">
                                    back
                                </Link>
                            </div>
                        </main>
                    </UserLayout>
                </> : ''
            }
        </>
    )
}

export default SinglePosition
