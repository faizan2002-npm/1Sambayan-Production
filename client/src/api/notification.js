import { postRequestForm } from "./request";

export const sendNotification = async (token, body = {}) => {
    try {
        const response = await postRequestForm(
            "/api/secure/notification/send-pushNoti",
            token,
            body,
            // { "Content-Type": "multipart/form-data" }
        );
        // console.log('token',token)
        // console.log('body',body)
        // console.log('response',response)
        if (response.result.status === 200) {
            return ('success');
        } else {
            return ('fail');
        }
    } catch (error) {
        console.log("Send notification error", error.message);
    }
};