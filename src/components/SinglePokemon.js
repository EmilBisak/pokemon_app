import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import './SinglePokemon.css'

class SinglePokemon extends Component {
    render() {
        return (
            <div className="wrapp single-pokemon" >
                <div className="container single-pokemon">
                    <h1>{this.props.singlePokemon.name}</h1>
                <Link to="/">Back</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        singlePokemon: state.singlePokemon
    }
}

export default connect(mapStateToProps)(SinglePokemon);