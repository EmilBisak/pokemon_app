import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";

import './App.css';
import { fetchPokemons } from "./store/index";
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

const root = document.querySelector('#root');


class App extends Component {

  componentDidMount() {
    this.props.fetchPokemons();
  }

  render() {
    this.props.isClicked ? root.style.overflow = 'unset' : root.style.overflow = 'hidden';
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isClicked: state.isClicked
  }
}

const mapDispatchToProps = {
  fetchPokemons
};

export default
  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(App))

