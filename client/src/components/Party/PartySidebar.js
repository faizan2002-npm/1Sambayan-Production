
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import {  useEffect } from 'react';
import { getRequest } from "../../api/request";
import { useHistory } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import images from "../../Constants/Admin/images";
import {
  Dropdown
} from "react-bootstrap";
var ps;

const PartySidebar = (props) => {
  const history = useHistory();
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
      // console.log("Get Profile Iamge Response", response.result.data.site[0]);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const [profileImage, setProfileImage] = useState();
  const getProileImage = async () => {
    try {
      const partyId = localStorage.getItem("PARTY_ID");
      console.log('partyId',partyId)
      const response = await getRequest(
        `/api/secure/party/?partyId=${partyId}`
      );

      setProfileImage(response.result.data.party.image);
      console.log("Get Profile Iamge Response", response.result.data);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes, type) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/party" && prop.type === type) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
  };
  const nestedLinks = (routes, type) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/party" && prop.type === type && prop.subMenu) {
        return (
          <>
            <Dropdown className="nav-item" as="li" key={key}>
              <Dropdown.Toggle as="a" className="nav-link d-block" id="dropdown-basic">
                <i className={prop.icon} />
                {prop.name}
              </Dropdown.Toggle>
              <Dropdown.Menu as="ul">
                {prop.subMenu.map((prop, key) => {
                  return (
                    <NavItem key={key}>
                      <Dropdown.Item
                        to={prop.layout + prop.path}
                        as={NavLinkRRD}
                      // onClick={closeCollapse}
                      // activeClassName="active"
                      >
                        <i className={prop.icon} />
                        {prop.name}
                      </Dropdown.Item>
                    </NavItem>
                  );
                })
                }
              </Dropdown.Menu>
            </Dropdown>
          </>
        );
      }
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }
  useEffect(() => {
    getSiteSetting();
    getProileImage();
  }, []);

  return (
    <>{
      (loading) ? '' : <>
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {siteSetting.logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={"https://sambayan-1.s3.ap-south-1.amazonaws.com/" + siteSetting.logo}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={"https://sambayan-1.s3.ap-south-1.amazonaws.com/" + profileImage}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
                <DropdownItem to="/party/EditParty" tag={Link} >
                <i className="ni ni-single-02" />
                  <span>Edit Party</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem to="#pablo" onClick={() => {
                  localStorage.clear();
                  history.push("/");
                }}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>

          <Nav navbar>{createLinks(routes, 'portal')}</Nav>
          <hr className="my-3" />
          <h6 className="navbar-heading text-muted">Users</h6>
          <Nav className="post_type_navbar" navbar>{nestedLinks(routes, 'party_user')}</Nav>


        </Collapse>
      </Container>
    </Navbar>
      </>
    }</>
  );
};

PartySidebar.defaultProps = {
  routes: [{}],
};

PartySidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a to="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default PartySidebar;
