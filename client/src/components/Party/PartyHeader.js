import React, { useState, useEffect } from "react";
import moment from "moment";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import routes from "../../routes";
import { getRequest } from "../../api/request";

const PartyHeader = (props) => {
  const [allPosts, setAllPosts] = useState();
  const [todayPosts, setTodayPosts] = useState();
  const [approvedPosts, setApprovedPosts] = useState();
  const [notApprovedPosts, setNotApprovedPosts] = useState();
  const location = useLocation();
  const getAllPosts = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/post//list-by-party/${localStorage.getItem("PARTY_ID")}`,
        token
      );
      // PARTY_ID
      setAllPosts(response?.result?.data?.posts?.length);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getTodayPosts = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/post/today-post/${localStorage.getItem("PARTY_ID")}`,
        token
      );
      setTodayPosts(response?.result?.data?.posts?.length);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getApprovedPosts = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/post/approved-by-party/${localStorage.getItem(
          "PARTY_ID"
        )}`,
        token
      );
      setApprovedPosts(response?.result?.data?.posts?.length);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getNotApprovedPosts = async () => {
    try {
      const token = localStorage.getItem("TOKEN");
      const response = await getRequest(
        `/api/secure/post/unapproved-by-party/${localStorage.getItem(
          "PARTY_ID"
        )}`,
        token
      );
      setNotApprovedPosts(response?.result?.data?.posts?.length);
    } catch (error) {
      console.log("Get Site Setting Error", error);
    }
  };
  const getPageTitle = (routes) => {
    return routes.map((prop, key) => {
      if (
        prop.layout === "/party" &&
        location.pathname.indexOf(prop.layout + prop.path) > -1
      ) {
        if (prop.name === "Dashboard") {
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
                          All Posts
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {allPosts}
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
                          Today's Posts
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {todayPosts}
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
                          Approved Posts
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {approvedPosts}
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
                          Not Approved Posts
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {notApprovedPosts}
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
              {prop.subMenu ? (
                prop.subMenu.map((prop, key) => {
                  if (location.pathname.indexOf(prop.layout + prop.path) > -1) {
                    return (
                      <Row key={key}>
                        <Col xl="12">
                          <h1 className="display-4 text-center text-white">
                            {prop.name}
                          </h1>
                        </Col>
                      </Row>
                    );
                  }
                })
              ) : (
                <Row key={key}>
                  <Col xl="12">
                    <h1 className="display-4 text-center text-white">
                      {prop.name}
                    </h1>
                  </Col>
                </Row>
              )}
            </React.Fragment>
          );
        }
      } else {
        return null;
      }
    });
  };
  // const getPageTitle = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (
  //       prop.layout === "/party" &&
  //       location.pathname.indexOf(prop.layout + prop.path) > -1
  //     ) {
  //       return (
  //         <>
  //           {prop.subMenu ? (
  //             prop.subMenu.map((prop, key) => {
  //               if (location.pathname.indexOf(prop.layout + prop.path) > -1) {
  //                 return (
  //                   <Row key={key}>
  //                     <Col xl="12">
  //                       <h1 className="display-4 text-center text-white">
  //                         {prop.name}
  //                       </h1>
  //                     </Col>
  //                   </Row>
  //                 );
  //               }
  //             })
  //           ) : (
  //             <Row key={key}>
  //               <Col xl="12">
  //                 <h1 className="display-4 text-center text-white">
  //                   {prop.name}
  //                 </h1>
  //               </Col>
  //             </Row>
  //           )}
  //         </>
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  useEffect(() => {
    getAllPosts();
    getTodayPosts();
    getApprovedPosts();
    getNotApprovedPosts();
  }, []);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">{getPageTitle(routes)}</div>
        </Container>
      </div>
    </>
  );
};

export default PartyHeader;
