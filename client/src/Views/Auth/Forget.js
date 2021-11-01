// reactstrap components
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { Formik, Form, Field as Input, ErrorMessage } from "formik";
import { postRequest } from "../../api/request";
import { useState } from 'react';

const ForgetPassword = (props) => {
const [PasswordResetLinkSent, setPasswordResetLinkSent] = useState(false)
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            {
              (PasswordResetLinkSent)?<>
              <p className="text-center">Password Reset Link Sent!</p>
              </>:<><Formik
              initialValues={{
                email: "",
              }}
              onSubmit={async (values, {
                setSubmitting,
                setErrors,
                resetForm /* setValues and other goodies */,
              }) => {
                // console.log(values);
                const APIresponse = {
                  email: values.email,
                };
                try {

                  const response = await postRequest(
                    "/api/pub/auth/send-mail",
                    {
                      email: values.email,
                    }
                  );

                  // console.log('PRE APIresponse', APIresponse);
                  // console.log("status APIresponse", response);
                  if (response.result.status === 200) {
                    // console.log("logged in!");
                    // console.log("status", response);
                    // localStorage.setItem(
                      // "TOKEN",
                      // response.result.data.token
                    // );
                    // if (response.result.data.user.type === "teacher") {
                    // navigate("TeacherDashboard");
                    // userLoginRedirect(response.result.data.user.role);
                    // }
                    setPasswordResetLinkSent(true)
                  }
                } catch (error) {
                  console.log("Login APi error", error);
                }
              }}
            >
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="form-control"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Reset
                  </Button>
                </div>
              </Form>
            </Formik></>
            }
            
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-center" xs="12">
            <Link
              className="text-light"
              to="/login"
            >
              <small>Back to Login</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default ForgetPassword;
