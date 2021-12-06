import { useState, useEffect } from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import routes from "../../routes";
import { getRequest } from '../../api/request';

const PartyHeader = (props) => {
  const location = useLocation();
  const getPageTitle = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/party" && (location.pathname.indexOf(prop.layout + prop.path) > -1)) {
        return (
          <>
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
        </>
        );
      } else {
        return null;
      }
    });
  };
  useEffect(() => {
  }, []);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {
              getPageTitle(routes)
            }
          </div>
        </Container>
      </div>
    </>
  );
};

export default PartyHeader;
