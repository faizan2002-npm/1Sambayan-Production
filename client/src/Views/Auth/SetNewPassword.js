// reactstrap components
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

const queryString = require('query-string');
const SetNewPassword = (props) => {
  const [PasswordReseted, setPasswordReseted] = useState(false);
  const parsed = queryString.parse(window.location.search);
  if (parsed.token) {

  } else {
    window.location.assign('/login');
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            {
              (PasswordReseted) ? <>
                <p className="text-center">Password Reset Link Sent!</p>
              </> : <><Formik
                initialValues={{
                  password: "",
                }}
                onSubmit={async (values, {
                  setSubmitting,
                  setErrors,
                  resetForm /* setValues and other goodies */,
                }) => {
                  // console.log(values);
                  try {

                    const response = await postRequest(
                      `/api/pub/auth/reset-password?resetPasswordToken=${parsed.token}`,
                      {
                        password: values.password,
                      }
                    );

                    console.log('PRE APIresponse', values.password);
                    console.log("status APIresponse", response);
                    if (response.result.status === 200) {
                      window.location.assign('/login');
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
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="New Password"
                        type="password"
                        name="password"
                        className="form-control"
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="mt-2" color="primary" type="submit">
                      Reset
                    </Button>
                  </div>
                </Form>
              </Formik></>
            }

          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default SetNewPassword;
