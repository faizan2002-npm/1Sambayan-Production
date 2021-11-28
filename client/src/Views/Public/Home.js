import img from "../../Constants/Admin/images";
import { useState, useEffect } from 'react';
import { Carousel, Image, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { PostCard } from "../../components/Public/PostCard";
import OwlCarousel from "react-owl-carousel";
import PublicLayout from './../../layouts/Public/PublicLayout';
import { getRequest, postRequest } from "../../api/request";
import ReactPlayer from 'react-player'
import { useHistory } from "react-router-dom";
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';

import PhoneInput from 'react-phone-input-2';
import {
    Button,
    FormGroup,
    InputGroup,
    Form,
    Input,
    Label
} from "reactstrap";

const Home = () => {
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [value, setValue] = useState([]);
    const [slides, setSlides] = useState([]);
    const [bigVideo, setBigVideo] = useState({
        _id: 1,
        video: 'https://ritzplumbing.com/wp-content/uploads/2021/05/palm-trees.mp4',
        rigisterBtnText: 'REGISTER NOW',
        rigisterBtnUrl: '/',
    });
    const [latestPosts, setLatestPosts] = useState([
        {
            _id: 1,
            video: "https://ritzplumbing.com/wp-content/uploads/2021/05/palm-trees.mp4",
            heading: "25 Years of Excellenc...",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
            time: "09:47",
        },
        {
            _id: 2,
            video: "https://ritzplumbing.com/wp-content/uploads/2021/05/palm-trees.mp4",
            heading: "Community Challenges...",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
            time: "09:47",
        },
        {
            _id: 3,
            video: "https://ritzplumbing.com/wp-content/uploads/2021/05/palm-trees.mp4",
            heading: "Protest Continues...",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
            time: "09:47",
        },
    ])
    const [latestPostsSection, setLatestPostsSection] = useState({
        _id: 1,
        heading: 'LATEST POSTS',
        rigisterBtnText: 'VIEW ALL',
        rigisterBtnUrl: '/',
    });
    const [eventUpdates, setEventUpdates] = useState([
        {
            _id: 1,
            video: "https://ritzplumbing.com/wp-content/uploads/2021/05/palm-trees.mp4",
            heading: "25 Years of Excellenc...",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
            time: "09:47",
        },
        {
            _id: 2,
            video: "https://ritzplumbing.com/wp-content/uploads/2021/05/palm-trees.mp4",
            heading: "Community Challenges...",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
            time: "09:47",
        },
        {
            _id: 3,
            video: "https://ritzplumbing.com/wp-content/uploads/2021/05/palm-trees.mp4",
            heading: "Protest Continues...",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
            time: "09:47",
        },
    ])
    const [eventUpdatesSection, setEventUpdatesSection] = useState({
        _id: 1,
        heading: 'EVENTS UPDATES',
        rigisterBtnText: 'VIEW ALL',
        rigisterBtnUrl: '/',
    });
    const [communities, setCommunities] = useState([
        {
            _id: 1,
            image: img.Placeholder,
            heading: "Gabriel Iglesias",
            text: "Hi there! I’m delighted to announce our...",
            time: "09:47",
        },
        {
            _id: 2,
            image: img.Placeholder,
            heading: "Jacob David",
            text: "Hi there! I’m delighted to announce our...",
            time: "09:47",
        },
        {
            _id: 3,
            image: img.Placeholder,
            heading: "Andrew Garfield",
            text: "Hi there! I’m delighted to announce our...",
            time: "09:47",
        },
        {
            _id: 3,
            image: img.Placeholder,
            heading: "Logan Jackman",
            text: "Hi there! I’m delighted to announce our...",
            time: "09:47",
        },
    ])
    const [communitiesSection, setCommunitiesSection] = useState({
        _id: 1,
        heading: 'COMMUNITIES',
        rigisterBtnText: 'VIEW ALL',
        rigisterBtnUrl: '/',
    });
    const [candidates, setCandidates] = useState([
        {
            _id: 1,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 2,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 3,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 3,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 4,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 5,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 6,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 7,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
    ])
    const [candidatesSection, setCandidatesSection] = useState({
        _id: 1,
        heading: 'CANDIDATES',
    });
    const [parties, setParties] = useState([
        {
            _id: 1,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 2,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 3,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 3,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 4,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 5,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 6,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
        {
            _id: 7,
            image: img.Placeholder,
            text: "Gabriel Iglesias",
        },
    ])
    const [partiesSection, setPartiesSection] = useState({
        _id: 1,
        heading: 'PARTIES',
    });
    const [registerationSection, setRegisterationSection] = useState({
        _id: 1,
        heading: 'REGISTRATION',
    });
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const carouselOptions = {
        margin: 100,
        responsiveClass: true,
        nav: false,
        dots: true,
        loop: true,
        rewindNav: false,
        autoplay: false,
        freeDrag: true,
        smartSpeed: 1500,
        autoplayTimeout: 1000,
        items: 4,
        autoplayHoverPause: true,
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
    const getPageVideo = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/site/`,
                token
            );
            setBigVideo(response.result.data.site[0]);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getAllSlides = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/site/header-list`,
                token
            );
            setSlides(response.result.data.headers)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getLatestPosts = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/post/post-list`,
                token
            );
            setLatestPosts(response.result.data.posts)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getEventUpdates = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/event/event-list`,
                token
            );
            setEventUpdates(response.result.data.events)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getCommunities = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/community/community-list`,
                token
            );
            setCommunities(response.result.data.communities)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getCandidates = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/candidate/candidate-list`,
                token
            );
            setCandidates(response.result.data.candidates)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getParties = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/party/party-list`,
                token
            );
            setParties(response.result.data.parties)
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getLatestPostsSection = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/site/pages?name=Home Page`,
                token
            );
            setLatestPostsSection(response.result.data.pages[0].sections[0]);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getEventUpdatesSection = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/site/pages?name=Home Page`,
                token
            );
            setEventUpdatesSection(response.result.data.pages[0].sections[1]);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getCommunitiesSection = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/site/pages?name=Home Page`,
                token
            );
            setCommunitiesSection(response.result.data.pages[0].sections[2]);
            // console.log("getCommunitiesSection", response.result.data.pages[0].sections[2]);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getCandidatesSection = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/site/pages?name=Home Page`,
                token
            );
            setCandidatesSection(response.result.data.pages[0].sections[3]);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getPartiesSection = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/site/pages?name=Home Page`,
                token
            );
            setPartiesSection(response.result.data.pages[0].sections[4]);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getRegisterationSection = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/site/pages?name=Home Page`,
                token
            );
            setRegisterationSection(response.result.data.pages[0].sections[5]);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const signUpHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log("e.target", e.target[0].value);
        formData.append(
            "firstName",
            e.target[0].value
        );
        formData.append(
            "middleName",
            e.target[1].value
        );
        formData.append(
            "lastName",
            e.target[2].value
        );
        formData.append(
            "email",
            e.target[3].value
        );
        formData.append(
            "phone",
            e.target[4].value
        );
        formData.append(
            "age",
            e.target[5].value
        );
        formData.append(
            "address",
            e.target[6].value
        );
        formData.append(
            "fbLink",
            e.target[7].value
        );
        formData.append(
            "profession",
            e.target[8].value
        );
        formData.append(
            "partyId",
            e.target[9].value
        );
        formData.append(
            "password",
            e.target[10].value
        );
        formData.append(
            "confirm_password",
            e.target[11].value
        );
        const APIresponse = {
            firstName: formData.get('firstName'),
            middleName: formData.get('middleName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone').replace(/-|\s/g, ""),
            age: formData.get('age'),
            address: formData.get('address'),
            fbLink: formData.get('fbLink'),
            profession: formData.get('profession'),
            partyId: formData.get('partyId'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password'),
        };
        console.log("APIresponse", APIresponse)
        // Display the key/value pairs
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        try {
            const response = await postRequest(
                "/api/pub/auth/register",
                APIresponse,
            );

            console.log("status", response);
            if (response.result.status === 200) {
                localStorage.setItem(
                    "TOKEN",
                    response.result.data.token
                );
                localStorage.setItem(
                    "ROLE",
                    response.result.data.user.role
                );
                localStorage.setItem(
                    "USER_FIRSTNAME",
                    response.result.data.user.firstName
                );
                localStorage.setItem(
                    "USER_LASTNAME",
                    response.result.data.user.lastName
                );
                localStorage.setItem(
                    "USER_EMAIL",
                    response.result.data.user.email
                );
                localStorage.setItem(
                    "USER_ID",
                    response.result.data.user._id
                );
            }

        } catch (error) {
            console.log("Set Profile APi error", error.message);
        }
    }
    useEffect(() => {
        getAllSlides();
        getPageVideo();
        getLatestPosts();
        getLatestPostsSection();
        getEventUpdates();
        getEventUpdatesSection();
        getCommunities();
        getCommunitiesSection();
        getCandidates();
        getCandidatesSection();
        getParties();
        getPartiesSection();
        getRegisterationSection();
    }, []);
    return (
        <PublicLayout>
            <main id="main_content">
                <section className="home_banner">
                    <Carousel activeIndex={index} onSelect={handleSelect} controls={false} fade={true}>
                        {
                            slides.map((e, index) => {
                                // console.log("slides", e);
                                return (
                                    <Carousel.Item key={`id_${e._id}_${index}`}>
                                        <Image src={"https://votewatchers.co.in/views/uploads/" + e.backgroundImage} className="d-block w-100" alt="" fluid />
                                        {
                                            (e.image) ? <>
                                                <Carousel.Caption>
                                                    <Container>
                                                        <Row className="justify-content-center">
                                                            <Col lg={10} md={10} xs={12}>
                                                                <Image src={"https://votewatchers.co.in/views/uploads/" + e.image} alt="" fluid />
                                                                <a class="btn btn-default" href={e.buttonURL}>Click to know more</a>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Carousel.Caption>
                                            </> : <>
                                                <Carousel.Caption>
                                                    <h2>{e.description}</h2>
                                                    <p>{e.title}</p>
                                                </Carousel.Caption>
                                            </>
                                        }
                                    </Carousel.Item>
                                );
                            })
                        }
                    </Carousel>
                </section>
                <section className="bigVideo">
                    <Container>
                        <div className="video_cover">
                            {
                                (bigVideo.video) ? <ReactPlayer
                                    playing={true}
                                    light={false}
                                    muted={true}
                                    loop={true}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "20px"
                                    }} width='100%'
                                    height='100%' url={"https://votewatchers.co.in/views/uploads/" + bigVideo.video} /> : ''
                            }


                            {/* <div className="button_cover">
                                <Row>
                                    <Col xs={12} className="w-100 d-flex justify-content-center">
                                        <Link to={bigVideo.rigisterBtnUrl} className="btn btn-default">{bigVideo.rigisterBtnText}</Link>
                                    </Col>
                                </Row>
                            </div> */}
                        </div>
                    </Container>
                </section>
                <section className="latest_posts">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={10} md={10} xs={12}>
                                <h1>{latestPostsSection.heading}</h1>
                                {
                                    latestPosts.map((e, index) => (
                                        <PostCard link={`/singlePost?_id=${e._id}`} key={`id_${e._id}_${index}`} heading={e.title} text={e.description} time={e.createdAt} video={"https://votewatchers.co.in/views/uploads/" + e.image} image={false} grid={true} />
                                    ))
                                }
                                <Row>
                                    <Col xs={12} className="d-flex justify-content-lg-end justify-content-center">
                                        <Link to={latestPostsSection.button} className="btn btn-default">View All</Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="latest_posts bg-white">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={10} md={10} xs={12}>
                                <h1>{eventUpdatesSection.heading}</h1>
                                {
                                    eventUpdates.map((e, index) => (
                                        <PostCard link={`/singleEvent?_id=${e._id}`} key={`id_${e._id}_${index}`} heading={e.title} text={e.description} time={e.createdAt} video={"https://votewatchers.co.in/views/uploads/" + e.image} image={false} grid={true} />
                                    ))
                                }
                                <Row>
                                    <Col xs={12} className="d-flex justify-content-lg-end justify-content-center">
                                        <Link to={eventUpdatesSection.button} className="btn btn-default">View All</Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="latest_posts v2">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={10} md={10} xs={12}>
                                <h1>{communitiesSection.heading}</h1>
                                {
                                    communities.map((e, index) => (
                                        <PostCard key={`id_${e._id}_${index}`} heading={e.title} text={e.description} time={e.createdAt} video={false} image={"https://votewatchers.co.in/views/uploads/" + e.image} grid={true} />
                                    ))
                                }
                                <Row>
                                    <Col xs={12} className="d-flex justify-content-lg-end justify-content-center">
                                        <Link to={communitiesSection.button} className="btn btn-default">View All</Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="latest_posts bg-white">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={10} md={10} xs={12}>
                                <h1>{candidatesSection.heading}</h1>
                                <OwlCarousel className='owl-theme owl-carousel'
                                    // onDragged={startPosition.current}
                                    // startPosition={startPosition.current}
                                    margin={100}
                                    responsiveClass={true}
                                    nav={false}
                                    dots={true}
                                    loop={false}
                                    rewind={false}
                                    autoplay={true}
                                    freeDrag={true}
                                    responsive={carouselOptions.responsive}
                                    autoplayTimeout={5000}
                                    items={4}
                                    autoplayHoverPause={true}
                                >
                                    {
                                        candidates.map((e, index) => (
                                            <PostCard key={`id_${e._id}_${index}`} text={e.title} image={"https://votewatchers.co.in/views/uploads/" + e.image} grid={false} row={false} />
                                        ))
                                    }
                                </OwlCarousel>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="latest_posts">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={10} md={10} xs={12}>
                                <h1>{partiesSection.heading}</h1>

                                <OwlCarousel
                                    className='owl-theme owl-carousel'
                                    margin={100}
                                    responsiveClass={true}
                                    nav={false}
                                    dots={true}
                                    loop={false}
                                    rewind={false}
                                    autoplay={true}
                                    freeDrag={true}
                                    responsive={carouselOptions.responsive}
                                    // smartSpeed={1500}
                                    // autoplayTimeout={1000}
                                    items={4}
                                    autoplayHoverPause={true}>

                                    {
                                        parties.map((e, index) => (
                                            <PostCard key={`id_${e._id}_${index}`} text={e.title} image={"https://votewatchers.co.in/views/uploads/" + e.image} grid={false} row={false} />
                                        ))
                                    }
                                </OwlCarousel>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {
                    (localStorage.getItem("TOKEN")) ? <>
                        <section className="latest_posts  bg-white v2">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 col-md-10 col-12 text-center">
                                        <button className="btn btn-default" onClick={() => {
                                            history.push("/account");
                                        }}>Account</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </> : <>
                        <section className="latest_posts  bg-white v2">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 col-md-10 col-12">
                                        <h1>{registerationSection.heading}</h1>
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6 col-md-8 col-12">
                                                <div className="form_box">

                                                    <AvForm className="form" encType="multipart/form-data" method="post" onValidSubmit={signUpHandler}>
                                                        <FormGroup className="mb-4">
                                                            <Label>First Name</Label>
                                                            
                                                                <AvField
                                                                    name="firstName"
                                                                    type="text"
                                                                    placeholder="First Name"
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            
                                                        </FormGroup>
                                                        <FormGroup className="mb-4">
                                                            <Label>Middle Name</Label>
                                                            
                                                                <AvField
                                                                    name="middleName"
                                                                    type="text"
                                                                    placeholder="Middle Name"
                                                                    className="form-control"
                                                                />
                                                            
                                                        </FormGroup>
                                                        <FormGroup className="mb-4">
                                                            <Label>Last Name</Label>
                                                            
                                                                <AvField
                                                                    name="lastName"
                                                                    type="text"
                                                                    placeholder="Last Name"
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            
                                                        </FormGroup>
                                                        <FormGroup className="mb-4">
                                                            <Label>Email</Label>
                                                            
                                                                <AvField
                                                                    name="email"
                                                                    type="email"
                                                                    placeholder="Email"
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            
                                                        </FormGroup>
                                                        <FormGroup className="mb-4">
                                                            <Label>Phone Number</Label>
                                                            
                                                                <PhoneInput
                                                                    country={'ph'}
                                                                    enableAreaCodes={true}
                                                                    enableAreaCodeStretch
                                                                    enableSearch={true}
                                                                    inputProps={{
                                                                        name: 'phone',
                                                                        required: true,
                                                                        autoFocus: true
                                                                    }}
                                                                    required
                                                                />
                                                            
                                                        </FormGroup>
                                                        <FormGroup className="mb-4">
                                                            <Label>Age</Label>
                                                            
                                                                <AvField
                                                                    id="age"
                                                                    name="age"
                                                                    type="select"
                                                                    placeholder="Select Age"
                                                                    required
                                                                >
                                                                    <option>15</option>
                                                                    <option>16</option>
                                                                    <option>17</option>
                                                                    <option>18</option>
                                                                    <option>19</option>
                                                                    <option>20</option>
                                                                    <option>21</option>
                                                                    <option>22</option>
                                                                    <option>23</option>
                                                                </AvField>
                                                            
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Address</Label>
                                                            
                                                                <AvField
                                                                    name="address"
                                                                    type="text"
                                                                    placeholder="Address"
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Facebook Link</Label>
                                                            
                                                                <AvField
                                                                    name="fbLink"
                                                                    type="url"
                                                                    placeholder="Facebook Link"
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            
                                                        </FormGroup>
                                                        <FormGroup className="mb-4">
                                                            <Label>Professional / Field of Experties</Label>
                                                            
                                                                <AvField
                                                                    id="profession"
                                                                    name="profession"
                                                                    type="select"
                                                                    placeholder="Professional / Field of Experties"
                                                                    placeholder="Select Field"
                                                                    required
                                                                >
                                                                    <option>Self Employed</option>
                                                                    <option>Government</option>
                                                                </AvField>
                                                            
                                                        </FormGroup>
                                                        <FormGroup className="mb-4">
                                                            <Label>Select Member Organization</Label>
                                                            
                                                                <AvField
                                                                    id="partyId"
                                                                    name="partyId"
                                                                    type="select"
                                                                    placeholder="Select Party"
                                                                    required
                                                                >
                                                                    {
                                                                        parties.map((e, index) => (
                                                                            <option key={index} value={e._id}>{e.title}</option>
                                                                        ))
                                                                    }
                                                                </AvField>
                                                            
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Password</Label>
                                                            
                                                                <AvField
                                                                    name="password"
                                                                    type="password"
                                                                    placeholder="Password"
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Confirm Password</Label>
                                                            
                                                                <AvField
                                                                    name="confirm_password"
                                                                    type="password"
                                                                    placeholder="Confirm Password"
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            
                                                        </FormGroup>
                                                        <div className="text-center">
                                                            <Button className="mt-4" color="primary" type="submit">
                                                                Sign in
                                                            </Button>
                                                        </div>
                                                    </AvForm>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                }
            </main>
        </PublicLayout>
    )
}

export default Home;



// josephzambri@hotmail.com	
// joseph2021!!