import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import images from "../../../Constants/Admin/images";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getRequest } from "../../../api/request";

const AdminNavbar = (props) => {
  const history = useHistory();
  const [profileImage, setProfileImage] = useState();
  const getProileImage = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/user/profile`,
        token
      );

      setProfileImage(response.result.data.user.profileImage);
      // console.log("Get Profile Iamge Response", response.result.data.user.profileImage);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  useEffect(() => {
    getProileImage();
  }, []);
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={"https://votewatchers.co.in/views/uploads/" + profileImage}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      Admin
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome Admin!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/EditProfile" tag={Link} >
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem to="#pablo" onClick={() => {
                  localStorage.removeItem("TOKEN");
                  history.push("/login");
                }}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
