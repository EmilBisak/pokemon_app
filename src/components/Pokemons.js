import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import './Pokemons.css';
import { openPokemonStyle, closePokemonStyle, showBtn, hideBtn } from "../shared/animationStyle";
import { fetchSinglePokemon, fetchPokemons, fetchPokemonsByColor, searchByName } from "../store/index";
import Buttons from "./Buttons";




class Pokemons extends Component {

    render() {

        const { pokemons, loading, isClicked, min, max, fetchSinglePokemon, fetchPokemons, fetchPokemonsByColor, searchByName } = this.props

        if (!pokemons || loading) {
            return <div className="wrapp single-pokemon" style={isClicked ? { minHeight: 'calc(60vh)' } : { minHeight: '0' }}>
                <div className="container single-pokemon" style={isClicked ? openPokemonStyle : closePokemonStyle}>
                    <img src="assets/icons/loading.gif" alt="loading" />
                    <h4>Loading...</h4>
                </div>
            </div>
        }

        const makeColorBtns = () => {
            const pokemonColors = [null, "black", "blue", "brown", "gray", "green", "pink", "purple", "red", "white", "yellow"]
            let colorBtnsJsx = []

            pokemonColors.forEach((color, i) => {
                if (color) {
                    colorBtnsJsx.push(<span key={color} className="color-btns" style={{ background: `${color}` }} onClick={() => fetchPokemonsByColor(i)}></span>)
                }
            })

            return colorBtnsJsx;
        }




        const pokemonsJsx = pokemons
            .filter((pokemon, i) => i >= min && i < max)
            .map((pokemon, i) => (
                <Link key={pokemon.url.split("/")[6]} to={{ pathname: `/pokemon/${pokemon.name}` }}>
                    <div className="pokemon-wrapper" onClick={() => fetchSinglePokemon(pokemon.url.split("/")[6])}>
                        <h2>{pokemon.name}</h2>
                        <img src={`assets/pokemon/${pokemon.url.split("/")[6] < 10090 ? pokemon.url.split("/")[6] : 'egg'}.png`} alt="pokemon" />
                    </div>
                </Link>
            ))


        return (
            <div className="wrapp" style={isClicked ? { minHeight: 'calc(140vh)' } : { minHeight: '0' }}>
                <div className="container">
                    <input
                        type="text"
                        placeholder="Search pokemon by name"
                        className="search-input"
                        onChange={(e) => searchByName(e.target.value)}
                        style={isClicked ? showBtn : hideBtn}
                    />
                    <div className="filter">
                        <div className="filter-by-color clearfix" style={isClicked ? showBtn : hideBtn}>
                        <h4>Filter Pokemons by color</h4>
                            {makeColorBtns()}
                            <div className="all-colors" onClick={fetchPokemons}></div>
                        </div>
                    </div>
                    <div className="pokemon-holder" style={isClicked ? openPokemonStyle : closePokemonStyle}>
                        {pokemonsJsx}
                    </div>
                    <Buttons />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pokemons: state.pokemons,
        loading: state.loading,
        isClicked: state.isClicked,
        min: state.min,
        max: state.max
    }
}

const mapDispatchToProps = {
    fetchSinglePokemon,
    fetchPokemonsByColor,
    fetchPokemons,
    searchByName
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);