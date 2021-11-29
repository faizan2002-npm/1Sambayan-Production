import { useEffect, useState } from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { getRequest } from '../../../api/request';
import { ToastContainer } from 'react-toastify';

const Footer = () => {
    const [loading, setLoading] = useState(true);
    const [siteSetting, setSiteSetting] = useState();
    const getProileImage = async () => {
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
    useEffect(() => {
        getProileImage();
    }, []);
    return (
        <>
            {
                (loading) ? <></> : <><footer id="footer">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={5} md={5} xs={12}>
                                <Link className="site-logo" to="/">
                                    <img src={"https://votewatchers.co.in/views/uploads/" + siteSetting.logo} alt="" className="img-fluid" />
                                </Link>
                                <Nav className="social" as="ul">
                                    <Nav.Item as="li">
                                        <Nav.Link href={siteSetting.Instagram} target="_BLANK">
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href={siteSetting.Facebook} target="_BLANK">
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href={siteSetting.Twitter} target="_BLANK">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link href={siteSetting.LinkedIn} target="_BLANK">
                                            <FontAwesomeIcon icon={faWhatsapp} />
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Nav className="mt-3" as="ul">
                                    <Nav.Item as="li">
                                        <Link to='/PrivacyPolicy' className="text-white nav-link">
                                            Privacy Policy
                                        </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link to='/TermsConditions' className="text-white nav-link">
                                            Terms & Condidtions
                                        </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link to='/ActRegulation' className="text-white nav-link">
                                            Act & Regulaction
                                        </Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Link to='/LegalInformation' className="text-white nav-link">
                                            Legal Information
                                        </Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col className="align-self-center" lg={7} md={7} xs={12} dangerouslySetInnerHTML={{
                                __html: siteSetting.footer,
                            }} />
                        </Row>
                    </Container>
                </footer>
                    <div className="footer_copyright">
                        <Container>
                            <Row>
                                <Col lg={12} md={12} xs={12}>
                                    <p className="text-center m-0 py-3 text-white">
                                        {
                                            siteSetting.copyright
                                        }
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="lim">
                        <a target="_BLANK" href="https://play.google.com/store/apps/details?id=com.sambayan" className="link btn">
                            Membership Form Application Here
                        </a>
                    </div>

                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </>
            }
        </>
    )
}

export default Footer
