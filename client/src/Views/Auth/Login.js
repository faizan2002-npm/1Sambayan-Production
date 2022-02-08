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
import { useHistory } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

import { postRequestForm } from "../../api/request";
import { Link } from "react-router-dom";
const Login = () => {
  const history = useHistory();

  function userLoginRedirect(role) {
    if (role === "admin") {
      history.push("/admin");
    } else if (role === "party") {
      history.push("/party");
    } else {
      history.push("/account");
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is Required";
    }
    if (!values.password) {
      errors.password = "password is Required";
    }

    return errors;
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    const APIresponse = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      const response = await postRequestForm(
        "/api/pub/auth/login",
        "",
        APIresponse
      );

      // localStorage.setItem(
      //   "TOKEN",
      //   response.result.data.token
      // );
      // console.log('TOKEN', response.result .data.token);
      console.log("status", response);
      if (response?.result?.status === 200) {
        if (response.result.data.user.role === "party") {
          localStorage.setItem("TOKEN", response.result.data.token);
          localStorage.setItem("ROLE", response.result.data.user.role);
          localStorage.setItem("PARTY_ID", response.result.data.user._id);
          localStorage.setItem("PARTY_NAME", response.result.data.user.title);
        } else {
          localStorage.setItem("TOKEN", response.result.data.token);
          localStorage.setItem("ROLE", response.result.data.user.role);
          localStorage.setItem(
            "USER_FIRSTNAME",
            response.result.data.user.firstName
          );
          localStorage.setItem(
            "USER_LASTNAME",
            response.result.data.user.lastName
          );
          localStorage.setItem("USER_EMAIL", response.result.data.user.email);
          localStorage.setItem("USER_ID", response.result.data.user._id);
          localStorage.setItem("PARTY_ID", response.result.data.user.partyId);
        }

        // if (response.result.data.user.type === "teacher") {
        // navigate("TeacherDashboard");
        userLoginRedirect(response.result.data.user.role);
        // }
      } else {
        alert(`ERROR: ${response.error.response.data}`);
      }
    } catch (error) {
      console.log("Login APi error", error);
    }
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <AvForm
              className="form login_form"
              method="post"
              onValidSubmit={loginHandler}
            >
              {/* <FormGroup className="mb-3"> */}
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <AvField
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="form-control w-100 m-0"
                  required
                />
              </InputGroup>
              {/* </FormGroup> */}
              {/* <FormGroup> */}
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <AvField
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="form-control w-100 m-0"
                  required
                />
              </InputGroup>
              {/* </FormGroup> */}
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </AvForm>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-center" xs="12">
            <Link className="text-light" to="/resetPassword">
              <small>Forgot password?</small>
            </Link>
          </Col>
          <Col className="text-center mt-2" xs="12">
            <Link className="text-light" to="/">
              <small>Back to 1Sambayan</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
