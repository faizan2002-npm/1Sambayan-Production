import React, { useState, useEffect } from 'react';
import { getRequest } from "../../api/request";
import { Container } from 'react-bootstrap'
import PublicLayout from './../../layouts/Public/PublicLayout';

const ActRegulations = () => {
    const [content, setContent] = useState()
    const getContent = async () => {
        try {
            const token = localStorage.getItem("TOKEN");
            // console.log("token", token);
            // var params = props.location.search.slice(5);
            const response = await getRequest(
                `/api/secure/site/pages?name=Act Regulation`,
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
            {
                (content) ? <Container className="my-5" dangerouslySetInnerHTML={{
                    __html: content,
                }} /> : ''
            }
        </PublicLayout>
    )
}

export default ActRegulations
