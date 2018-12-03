import React, { Component } from 'react';
import { connect } from "react-redux";

import { clicked } from "../store/index";
import './Header.css';
import { openBallStyles, closeBallStyles } from "../shared/animationStyle"

class Header extends Component {
    render() {
        const { isClicked, clicked } = this.props
        return (
            <header className="App-header" style={isClicked ? openBallStyles : closeBallStyles}>
                <h1 style={isClicked ? { transform: 'translateX(50%)' } : { transform: 'translateX(-50%)' }}>Pokemon App</h1>
                <div onClick={clicked} className="logo" style={isClicked ? { animation: 'none' } : { animation: 'shadow-pulse 1.4s infinite' }}></div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        isClicked: state.isClicked
    }
  }

  const mapDispatchToProps = {
    clicked
  };

export default connect(mapStateToProps, mapDispatchToProps)(Header);