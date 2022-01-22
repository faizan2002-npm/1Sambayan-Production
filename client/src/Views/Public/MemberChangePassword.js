import {
    Button,
    FormGroup,
    Label
} from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import UserLayout from '../../layouts/User/UserLayout'
import { postRequest } from '../../api/request';
import { useHistory,Link } from "react-router-dom";
import { toast } from 'react-toastify';

const MemberChangePassword = () => {
    const history = useHistory();
    const memberChangePasswordHandler = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append(
                "oldPassword",
                e.target[0].value
            );
            formData.append(
                "newPassword",
                e.target[1].value
            );
            formData.append(
                "email",
                localStorage.getItem("USER_EMAIL")
            );
            const APIresponse = {
                oldPassword: formData.get('oldPassword'),
                newPassword: formData.get('newPassword'),
                email: formData.get('email')
            };
            console.log("APIresponse", APIresponse)
            const token = localStorage.getItem("TOKEN");
            const response = await postRequest(
                "/api/pub/auth/update-password",
                // token,
                APIresponse,
            );

            console.log("status", response);
            if (response.result.status === 200) {
                toast.success('Password Updated', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                localStorage.removeItem("TOKEN");
                history.push("/");
            }

        } catch (error) {
            console.log("Set Profile APi error", error.message);
        }
    }
    return (
        <UserLayout>
            <main id="main_content">
                <section className="latest_posts  bg-white v2">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10 col-12">
                                <h1 className="text-center">Change Password</h1>
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 col-md-8 col-12">
                                        <div className="form_box">
                                            <AvForm className="form" encType="multipart/form-data" method="post" onValidSubmit={memberChangePasswordHandler}>
                                                <FormGroup>
                                                    <Label>Password</Label>
                                                    <AvField
                                                        name="oldPassword"
                                                        type="password"
                                                        placeholder="Old Password"
                                                        className="form-control"
                                                        required
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Confirm Password</Label>
                                                    <AvField
                                                        name="newPassword"
                                                        type="password"
                                                        placeholder="New Password"
                                                        className="form-control"
                                                        required
                                                    />
                                                </FormGroup>
                                                <div className="text-center">
                                                    <Button className="mt-4 btn-default" color="primary" type="submit">
                                                        Change Password
                                                    </Button>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4" >
                            <div className="col text-center">
                                <Link to="/account" className="btn ">
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </UserLayout>
    )
}

export default MemberChangePassword
