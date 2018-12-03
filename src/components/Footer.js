import React, { Component } from 'react';
import { connect } from "react-redux";

import { openBallStyles, closeBallStyles  } from "../shared/animationStyle";
import "./Footer.css"

class Footer extends Component {
    render() {
        return (
            <footer style={this.props.isClicked ? openBallStyles : closeBallStyles}>
                <small style={this.props.isClicked ? { display: "block" } : { display: "none" }}>Copyright &copy; Emil Bisak 2018</small>
            </footer>
        )
    }
}

const mapStateToProps = state => {
    return {
        isClicked: state.isClicked
    }
}

export default connect(mapStateToProps)(Footer);