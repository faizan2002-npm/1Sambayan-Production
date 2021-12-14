import React from 'react'
import { Card, Row, Col, Image } from 'react-bootstrap'
import moment from 'moment';
import { Link } from 'react-router-dom';

export const PostCard = ({ heading, text, time, video, image, grid = true, row = true, CPTtype, link, readMore = false }) => {
    var count = 250;
    return (
        <>
            <Card>
                <Card.Body>
                    {
                        (row) ? (grid) ? <Row className="justify-content-center">
                            {
                                (video) ? <>
                                    <Col lg={5} md={12} xs={12}>
                                        {
                                            (link) ? <Link to={link}>
                                                <Image src={video} alt="" fluid />
                                            </Link> : <>
                                                <Image src={video} alt="" fluid />
                                            </>
                                        }
                                    </Col>
                                </> : (image) ? <>
                                    <Col lg={2} md={5} xs={12}>
                                        <Image src={image} alt="" fluid />
                                    </Col>
                                </> : ''
                            }
                            {
                                (video) ? <>
                                    <Col lg={7} md={12} xs={12} className="justify-content-around d-flex flex-column align-items-start">

                                        {
                                            (link) ? <>
                                                <Link to={link}>
                                                    {
                                                        (heading) ? <h2>
                                                            {heading.slice(0, 45) + (heading.length > 45 ? "..." : "")}
                                                        </h2> : ''
                                                    }
                                                </Link>
                                            </> : <>
                                                {
                                                    (heading) ? <h2>
                                                        {heading.slice(0, 45) + (heading.length > 45 ? "..." : "")}
                                                    </h2> : ''
                                                }
                                            </>
                                        }
                                        {
                                            (text) ? <p>
                                                {text.slice(0, count) + (text.length > count ? "..." : "")}
                                            </p> : ''
                                        }
                                        {
                                            (time) ? <h5>
                                                {moment(time).format("dddd, MMMM Do YYYY")}
                                            </h5> : ''
                                        }
                                        {
                                            (readMore) ?
                                                <Link className="d-inline btn text-left px-2" to={link}>
                                                    Read more
                                                </Link> : ''
                                        }
                                    </Col>
                                </> : (image) ? <>
                                    <Col lg={5} md={12} xs={12} className="justify-content-around d-flex flex-column">
                                        {
                                            (heading) ? <h2>
                                                {heading}
                                            </h2> : ''
                                        }
                                        {
                                            (text) ? <p>
                                                {text}
                                            </p> : ''
                                        }
                                        {
                                            (time) ? <h5>
                                                {moment(time).format("dddd, MMMM Do YYYY")}
                                            </h5> : ''
                                        }
                                    </Col>
                                </> : ''
                            }
                        </Row> : (image) ? <>
                            <Row className="justify-content-center">
                                <Col lg={2} md={5} xs={12}>
                                    {
                                        (link) ? <Link to={link}>
                                            <Image src={image} alt="" fluid />
                                        </Link> : <>
                                            <Image src={image} alt="" fluid />
                                        </>
                                    }
                                </Col>
                                <Col lg={5} md={12} xs={12} className="justify-content-around d-flex flex-column">
                                    {
                                        (link) ? <>
                                            <Link to={link}>
                                                {
                                                    (heading) ? <h2>
                                                        {heading}
                                                    </h2> : ''
                                                }
                                            </Link>
                                        </> : <>
                                            {
                                                (heading) ? <h2>
                                                    {heading}
                                                </h2> : ''
                                            }
                                        </>
                                    }
                                    {
                                        (text) ? <p>
                                            {text}
                                        </p> : ''
                                    }
                                    {
                                        (time) ? <h5>
                                            {moment(time).format("dddd, MMMM Do YYYY")}
                                        </h5> : ''
                                    }
                                </Col>
                            </Row>
                        </> : '' : <>
                            <Image src={image} alt="" fluid className="w-100 mb-4" />
                            {
                                (heading) ? <h2>
                                    {heading}
                                </h2> : ''
                            }
                            {
                                (text) ? <p>
                                    {text}
                                </p> : ''
                            }
                            {
                                (time) ? <h5>
                                    {moment(time).format("dddd, MMMM Do YYYY")}
                                </h5> : ''
                            }
                        </>
                    }
                </Card.Body>
            </Card>
        </>
    )
}
