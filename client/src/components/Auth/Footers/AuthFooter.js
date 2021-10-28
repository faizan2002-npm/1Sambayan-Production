
import {  Container, Row, Col } from "reactstrap";
import { useState, useEffect } from 'react';
import { getRequest } from "../../../api/request";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [siteSetting, setSiteSetting] = useState();
  const getSiteSetting = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/site/`,
        token
      );
      if (response.result.status === 200) {
        setSiteSetting(response.result.data.site[0]);
        setLoading(false);
      }
      console.log("Get Profile Iamge Response", response.result.data.site[0]);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  useEffect(() => {
    getSiteSetting();
  }, []);
  return (
    <>{
      (loading) ? '' : <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="12">
              <div className="copyright text-center text-muted">
              {siteSetting.copyright}
              </div>
            </Col>
            
          </Row>
        </Container>
      </footer>
      </>
    }</>
  );
};

export default Login;
