import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import './Pokemons.css';
import { openPokemonStyle, closePokemonStyle, showBtn, hideBtn } from "../shared/animationStyle";
import { fetchSinglePokemon, fetchPokemonsByColor, showAllPokemons } from "../store/index";
import Buttons from "./Buttons";




class Pokemons extends Component {

    render() {

        const { pokemons, filtered, isClicked, min, max, fetchSinglePokemon, fetchPokemonsByColor, showAllPokemons } = this.props
        if (!pokemons) {
            return null
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




        const pokemonsJsx = filtered
            ?
            filtered.pokemon_species
                .filter((pokemon, i) => i >= min && i < max)
                .map((pokemon, i) => (
                    <Link key={pokemon.url.split("/")[6]} to={{ pathname: `/pokemon/${pokemon.name}` }}>
                        <div onClick={() => fetchSinglePokemon(pokemon.url.split("/")[6])}>
                            <h2>{pokemon.name}</h2>
                            <img src={`assets/pokemon/${pokemon.url.split("/")[6] < 10090 ? pokemon.url.split("/")[6] : 'egg'}.png`} alt="pokemon" />
                        </div>
                    </Link>
                ))
            :
            pokemons.results
                .filter((pokemon, i) => i >= min && i < max)
                .map((pokemon, i) => (
                    <Link key={pokemon.url.split("/")[6]} to={{ pathname: `/pokemon/${pokemon.name}` }}>
                        <div onClick={() => fetchSinglePokemon(pokemon.url.split("/")[6])}>
                            <h2>{pokemon.name}</h2>
                            <img src={`assets/pokemon/${pokemon.url.split("/")[6] < 10090 ? pokemon.url.split("/")[6] : 'egg'}.png`} alt="pokemon" />
                        </div>
                    </Link>
                ))


        return (
            <div className="wrapp" style={isClicked ? { minHeight: 'calc(140vh)' } : { minHeight: '0' }}>
                <div className="container">
                    <div className="filter-by-color" style={isClicked ? showBtn : hideBtn}>
                        {makeColorBtns()}
                        <div className="all-colors" onClick={showAllPokemons}></div>
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
        filtered: state.filtered,
        loading: state.loading,
        isClicked: state.isClicked,
        min: state.min,
        max: state.max
    }
}

const mapDispatchToProps = {
    fetchSinglePokemon,
    fetchPokemonsByColor,
    showAllPokemons
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);