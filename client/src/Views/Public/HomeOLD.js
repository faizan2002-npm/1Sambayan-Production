
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PublicLayout from '../../layouts/Public/PublicLayout'
import { Container, Row, Col } from "react-bootstrap";
import { Posts } from './Posts/Posts';

export class HomeOLD extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <PublicLayout>
                <main id="main_content">
                    <Posts {...this.props} />
                </main>
            </PublicLayout>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("STATEE", state);
    return {};
};
const mapDispatchToProps = {}


export default connect(mapStateToProps, mapDispatchToProps)(HomeOLD)
