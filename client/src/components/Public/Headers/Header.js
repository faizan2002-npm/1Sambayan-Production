import { useEffect, useState } from 'react'
import { Navbar, Container, Nav, Image, NavDropdown, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from '../../../routes';
import { getRequest } from '../../../api/request';
import { Dropdown, NavItem } from 'reactstrap';

const Header = () => {
    const [collapseOpen, setCollapseOpen] = useState();
    // toggles collapse between opened and closed (true/false)
    const toggleCollapse = () => {
        setCollapseOpen((data) => !data);
    };
    // closes the collapse
    const closeCollapse = () => {
        setCollapseOpen(false);
    };
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
        } catch (error) {
            console.log("Get Site Setting Error", error);
        }
    };
    const getRoutes = (routes) => {
        routes.sort((a, b) => (a.order > b.order) ? 1 : -1)
        return routes.map((prop, key) => {
            if (prop.layout === "" && prop.show === 'yes') {
                if (prop.name === 'Home') {
                    return (
                        <Nav.Item as="li" key={key}>
                            <Link className="nav-link" to={prop.layout + prop.path}>{prop.name}</Link>
                        </Nav.Item>
                    );
                } else {
                    return (
                        <Nav.Item as="li" key={key}>
                            <Link className="nav-link" to={prop.layout + prop.path}>{prop.name}</Link>
                        </Nav.Item>
                    );
                }
            } else {
                return null;
            }
        });
    };
    useEffect(() => {
        getSiteSetting();
    }, []);
    return (
        <>
            {
                <>
                    <header id="header">
                        <Container fluid>
                            <Navbar as="nav" variant="dark" expand="lg">
                                <Link className="navbar-brand" to="/">
                                    {
                                        (loading) ? '' : <Image src={"https://sambayan-1.s3.ap-south-1.amazonaws.com/" + siteSetting.logo} alt="" fluid />
                                    }
                                </Link>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <div className="navbar-collapse-header d-md-none mb-3">
                                        <Row>
                                            {
                                                (loading) ? '' : <>{
                                                    siteSetting.logo ? (
                                                        <Col className="collapse-brand" xs="6">
                                                            <Link to='/'>
                                                                <img alt='' src={"https://sambayan-1.s3.ap-south-1.amazonaws.com/" + siteSetting.logo} />
                                                            </Link>
                                                        </Col>
                                                    ) : null
                                                }</>
                                            }
                                            <Col className="collapse-close" xs="6">
                                                <Navbar.Toggle aria-controls="basic-navbar-nav">

                                                    <span />
                                                    <span />
                                                </Navbar.Toggle>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Nav className="ml-auto" as="ul" id="primary_main_menu">
                                        <NavDropdown as="li" title="1Sambalita " id="basic-nav-dropdown-1">
                                            <Link className="nav-link" to="/news">Posts</Link>
                                            {/* <Link className="nav-link" to="/events">Events</Link> */}
                                            <Link className="nav-link" to="/chapters">Chapters</Link>
                                            <Link className="nav-link" to="/candidates">Candidates</Link>
                                            <Link className="nav-link" to="/parties">Member Organizations</Link>
                                            <Link className="nav-link" to="/convenors">Conveners</Link>
                                            <Link className="nav-link" to="/contact">Contact Us</Link>
                                            <Link className="nav-link" to="/1Sambalita">1SAMBAYAN</Link>
                                            <Link className="nav-link" to="/FAQ">FAQs</Link>
                                        </NavDropdown>
                                        <Nav.Item as="li">
                                            <Link className="nav-link" to='/about'>About</Link>
                                        </Nav.Item>
                                        {/* <NavDropdown as="li" title="About" id="basic-nav-dropdown-1">
                                            <Link className="nav-link" to="/about">About Us</Link>
                                            <Link className="nav-link" to="/convenors">List Convenors</Link>
                                            <Link className="nav-link" to="/chapters">Chapters</Link>
                                        </NavDropdown> */}
                                        {
                                            // getRoutes(routes)
                                        }
                                        {/* <NavDropdown as="li" title="More" id="basic-nav-dropdown">
                                            <Link className="nav-link" to="/participate">How to Participate</Link>
                                            <Link className="nav-link" to="/selectionProcess">Selection Process</Link>
                                        </NavDropdown> */}
                                        {
                                            (loading) ? '' : <>{
                                                <Nav.Item className="btn" as="li" >
                                                    <Nav.Link href={siteSetting.donateURL} target="_BLANK">Donate</Nav.Link>
                                                </Nav.Item>
                                            }</>
                                        }
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Container>
                    </header>
                </>
            }
        </>
    )
}

export default Header
