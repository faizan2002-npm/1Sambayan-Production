import { useEffect, useState } from 'react';
import Header from '../../components/Public/Headers/Header';
import Footer from '../../components/Public/Footers/Footer';
import "../../assets/scss/Public/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useHistory } from "react-router-dom";

const UserLayout = ({ children }) => {
    const location = useLocation();
    const history = useHistory();
    if ((localStorage.getItem("TOKEN")) && (localStorage.getItem("ROLE") === "user")) {
        // console.log(localStorage.getItem("TOKEN"));
    } else if ((localStorage.getItem("TOKEN")) && (localStorage.getItem("ROLE") === "admin")) {
        history.push("/admin");
    } else if ((localStorage.getItem("TOKEN")) && (localStorage.getItem("ROLE") === "party")) {
        history.push("/party");
    }  else {
        var pathName = window.location.pathname;
        if (location.pathname.indexOf('/account') > -1) {
            history.push("/login");
        }
    }
    const adjuster = () => {
        document.getElementById("main_content").style.paddingTop = `${document.getElementById("header").offsetHeight}px`;
        document.addEventListener("DOMContentLoaded", function (event) {
            document.getElementById("main_content").style.paddingTop = `${document.getElementById("header").offsetHeight}px`;
        });
    }
    useEffect(() => {
        adjuster();
    }, [])
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default UserLayout
