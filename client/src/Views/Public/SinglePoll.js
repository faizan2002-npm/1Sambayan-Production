import { useState, useEffect } from 'react';

import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'
import { Link } from 'react-router-dom';
import { getRequest, postWithParams } from '../../api/request';
import UserLayout from './../../layouts/User/UserLayout';
import { Container, Row, Col } from 'react-bootstrap';
import Poll from 'react-polls';
const queryString = require('query-string');


const SinglePoll = () => {
    // // const params = props.location.search.slice(5);
    const [pollData, setPollData] = useState([]);
    const [voted, setVoted] = useState(false);
    const [choices, setChoices] = useState([]);
    const parsed = queryString.parse(window.location.search);
    if (parsed._id) {

    } else {
        window.location.assign('/MemberPollsAndPositions');
    }
    const getSinglePoll = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/poll/?pollId=${parsed._id}`,
                token
            );
            console.log(response.result.data.poll);
            setPollData(response.result.data.poll)
            const volunteer = response.result.data.poll.volunteer.filter((member) => {
                if (member.userId == localStorage.getItem("USER_ID")) {
                    setVoted(true)
                }
            });
            const usrData = response.result.data.poll.choices.map((e, key) => {
                return { option: e.choice, votes: e.votes };
            });
            setChoices(usrData);
        } catch (error) {
            console.log("Get Single Poll Error", error);
        }
    };
    // Object keys may vary on the poll type (see the 'Theme options' table below)
    const customTheme = {
        textColor: 'black',
        mainColor: '#00B87B',
        backgroundColor: 'rgb(255,255,255)',
        alignment: 'center'
    }

    const vote = async (item, pollData) => {
        try {
            console.log('item', item)
            console.log('pollData', pollData)
            const buttonText = pollData.volunteer.filter((member) => {
                if (member.userId == localStorage.getItem("USER_ID")) {
                    setVoted(true)
                }
            });
            if (voted) {

            } else {
                const token = localStorage.getItem("TOKEN");
                const userId = localStorage.getItem("USER_ID");
                const response = await postWithParams(
                    `/api/secure/poll/vote-poll?pollId=${parsed._id}&userId=${userId}&choiceId=${item}`,
                    token
                );
                if (response.result.status == 200) {
                    window.location.reload();
                    setVoted(true)
                }
            }
        } catch (error) {
            console.log("Get Single Poll Error", error);
        }
    };
    const handleVote = async (voteAnswer, pollAnswers, pollNumber) => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await getRequest(
                `/api/secure/poll/choiceIdByName/?pollId=${parsed._id}&choiceName=${voteAnswer}`,
                token
            );
            console.log('response.result.choiceId',response.result.data.choiceId)
            vote(response.result.data.choiceId, pollData)
        } catch (error) {
            console.log("Get Single Poll Error", error);
        }

        const newPollAnswers = choices.map(answer => {
            if (answer.option === voteAnswer) answer.votes++;
            return answer
        })
        console.log("newPollAnswers", voteAnswer);
        setChoices(newPollAnswers);
    }
    useEffect(() => {
        getSinglePoll();
    }, []);
    return (
        <UserLayout>
            <main id="main_content">
                {
                    (pollData) ? <>
                        <section className="py-5">
                            <Container>
                                <h1 className="text-center">
                                    {pollData.name}
                                </h1>
                            </Container>
                        </section>
                        <section className="section-9 pt-0">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 col-md-10 col-12">
                                        {
                                            (voted) ? <>
                                                <Row>
                                                    {
                                                        pollData.choices.map((e, key) => (<>
                                                            <Col lg={10} md={10} xl={10} className='text-left'>
                                                                <b>{e.choice}</b>
                                                            </Col>
                                                            <Col lg={2} md={2} xl={2} className='text-right'>
                                                                {((e.votes / pollData.totalVotes) * 100).toFixed(0)}%
                                                            </Col>
                                                        </>))
                                                    }
                                                </Row>
                                            </> : <Poll question={pollData.question} answers={choices} onVote={handleVote}
                                                noStorage={voted}
                                                vote={voted} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="fgd d-flex justify-content-center">
                            <Link to="/MemberPollsAndPositions" className="btn ">
                                back
                            </Link>
                        </div>
                    </> : ''
                }
            </main>
        </UserLayout>
    )
}

export default SinglePoll
