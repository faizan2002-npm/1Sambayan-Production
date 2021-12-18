import React,{ useState, useEffect } from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import routes from "../../../routes";
import { getRequest } from '../../../api/request';

const Header = (props) => {
  const [latestPosts, setLatestPosts] = useState(0)
  const [latestEvents, setLatestEvents] = useState([])
  const [latestCandidates, setLatestCandidates] = useState([])
  const [latestParties, setLatestParties] = useState([])
  const location = useLocation();
  const getLatestPosts = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/post/post-list`,
        token
      );
      setLatestPosts(response.result.data.posts.length)
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getLatestEvents = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/event/event-list`,
        token
      );
      setLatestEvents(response.result.data.events.length)
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getLatestCandidates = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/candidate/candidate-list`,
        token
      );
      setLatestCandidates(response.result.data.candidates.length)
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getLatestParties = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/party/party-list`,
        token
      );
      setLatestParties(response.result.data.parties.length)
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getPageTitle = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin" && (location.pathname.indexOf(prop.layout + prop.path) > -1)) {
        if (prop.name === 'Dashboard') {
          return (
            <Row key={key}>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Posts
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {latestPosts}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Events
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {latestEvents}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Candidates
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {latestCandidates}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Parties
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {latestParties}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          );
        } else {
          return (
            <React.Fragment key={key}>
              {
                (prop.subMenu) ? prop.subMenu.map((prop, key) => {
                  if ((location.pathname.indexOf(prop.layout + prop.path) > -1)) {
                    return (
                      <Row key={key}>
                        <Col xl="12">
                          <h1 className="display-4 text-center text-white">{prop.name}</h1>
                        </Col>
                      </Row>
                    );
                  }
                }) : <Row key={key}>
                  <Col xl="12">
                    <h1 className="display-4 text-center text-white">{prop.name}</h1>
                  </Col>
                </Row>
              }
            </React.Fragment>
          );
        }
      } else {
        return null;
      }
    });
  };
  useEffect(() => {
    getLatestPosts();
    getLatestEvents();
    getLatestCandidates();
    getLatestParties();
  }, []);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            {
              getPageTitle(routes)
            }
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
