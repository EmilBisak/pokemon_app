import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { clicked, fetchPokemons } from "../store/index";
import './Header.css';
import { openBallStyles, closeBallStyles } from "../shared/animationStyle"

class Header extends Component {
    render() {
        const { isClicked, clicked, fetchPokemons, pokemons } = this.props

        return (
            <header className="App-header" style={isClicked ? openBallStyles : closeBallStyles}>
                <Link to="/" onClick={pokemons.length !== 949 ? fetchPokemons : null} replace>
                    <h1
                        style={
                            isClicked
                                ? { transform: 'translateX(96%)' }
                                : { transform: 'translateX(-50%)' }}>
                        Pokemon App
                    </h1>
                </Link>
                <div
                    onClick={clicked}
                    className="logo"
                    style={
                        isClicked
                            ? { animation: 'none' }
                            : { animation: 'shadow-pulse 1.4s infinite' }}>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        isClicked: state.isClicked,
        pokemons: state.pokemons,
    }
}

const mapDispatchToProps = {
    clicked,
    fetchPokemons
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);