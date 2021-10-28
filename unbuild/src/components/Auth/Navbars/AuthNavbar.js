
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";
import { useState, useEffect } from 'react';
import { getRequest } from "../../../api/request";

const AdminNavbar = () => {
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
        <Navbar className="navbar-top" expand="md">
          <Container className="px4 mb-5 justify-content-center">
            <NavbarBrand to="/" tag={Link}>
              <Image
                alt="..."
                src={"https://votewatchers.co.in/views/uploads/" + siteSetting.logo}
                fluid
                className="w-50 mx-auto d-block"
              />
            </NavbarBrand>
          </Container>
        </Navbar>
      </>
    }</>
  );
};

export default AdminNavbar;
