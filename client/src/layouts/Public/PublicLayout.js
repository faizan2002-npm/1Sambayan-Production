import React,{useEffect} from 'react'
import Header from '../../components/Public/Headers/Header';
import Footer from '../../components/Public/Footers/Footer';
import "../../assets/scss/Public/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-phone-input-2/lib/style.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

export const PublicLayout = (props) => {
    const adjuster = () => {
        document.getElementById("main_content").style.paddingTop = `${document.getElementById("header").offsetHeight}px`;
        document.addEventListener("DOMContentLoaded", function (event) {
            document.getElementById("main_content").style.paddingTop = `${document.getElementById("header").offsetHeight}px`;
        });
        window.addEventListener('resize', function (event) {
            document.getElementById("main_content").style.paddingTop = `${document.getElementById("header").offsetHeight}px`;
        }, true);
    }
    useEffect(() => {
        adjuster();
    }, [])
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    )
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PublicLayout)
