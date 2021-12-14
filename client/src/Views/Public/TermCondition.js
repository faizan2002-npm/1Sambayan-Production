import React, { useState, useEffect } from 'react';
import { getRequest } from "../../api/request";
import { Container } from 'react-bootstrap'
import PublicLayout from './../../layouts/Public/PublicLayout';

const TermCondition = () => {
    const [content, setContent] = useState()
    const getContent = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/site/pages?name=Terms Conditions`,
                token
            );
            setContent(response.result.data.pages[0].contentBox);
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };

    useEffect(() => {
        getContent();
    }, []);
    return (
        <PublicLayout>
        <main id="main_content">
            {
                (content) ? <Container className="my-5" dangerouslySetInnerHTML={{
                    __html: content,
                }} /> : ''
            }
            </main>
        </PublicLayout>
    )
}

export default TermCondition
