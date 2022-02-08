
import React from "react";
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import siteSettings from "../../Constants/Admin/siteSettings";
import routes from '../../routes';
import "../../assets/plugins/nucleo/css/nucleo.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "../../assets/scss/argon-dashboard-react.scss"
import "../../assets/scss/custom.scss"
import PartyFooter from './../../components/Party/PartyFooter';
import PartySidebar from './../../components/Party/PartySidebar';
import PartyNavbar from './../../components/Party/PartyNavbar';


const PartyLayout = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);
  if(localStorage.getItem("TOKEN")){
    if(localStorage.getItem("ROLE") === "user"){
      history.push("/account");
    }if(localStorage.getItem("ROLE") === "admin"){
      history.push("/admin");
    }if(localStorage.getItem("ROLE") === "party"){

    }
  }else{
    history.push("/");
  }
  
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/party") {
        if (prop.subMenu) {
          return prop.subMenu.map((prop, key) => {
            return (
              <Route exact path={prop.layout + prop.path} component={prop.component} key={key} />
            );
          });
        }
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };


  return (
    <>
      <PartySidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/",
          imgSrc: siteSettings.SiteSettings[0].SITE_LOGO,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <PartyNavbar
          {...props}
          brandText={siteSettings.SiteSettings[0].SITE_TITLE}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="/party" to="/party/index" />
        </Switch>
        <Container fluid>
          <PartyFooter />
        </Container>
      </div>
    </>
  );
};

export default PartyLayout;
