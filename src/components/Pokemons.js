import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import './Pokemons.css';
import { openPokemonStyle, closePokemonStyle } from "../shared/animationStyle";
import { fetchSinglePokemon } from "../store/index";
import Buttons from "./Buttons";




class Pokemons extends Component {

    render() {

        const { pokemons, isClicked, min, max, fetchSinglePokemon } = this.props
        if (!pokemons) {
            return null
        }

        console.log(pokemons);
        

        const pokemonsJsx = pokemons.results
            .filter((pokemon, i) => i >= min && i < max)
            .map((pokemon, i) => (
                <Link key={pokemon.url.split("/")[6]} to={{pathname: `/pokemon/${pokemon.name}`}}>
                    <div  onClick={() => fetchSinglePokemon(pokemon.url.split("/")[6])}>
                    <h2>{pokemon.name}</h2>
                    <img src={`assets/pokemon/${pokemon.url.split("/")[6] < 10090 ? pokemon.url.split("/")[6] : 'egg'}.png`} alt="pokemon" />
                </div>
                </Link>
                
            ))


        return (
            <div className="wrapp" style={isClicked ? { minHeight: 'calc(140vh)' } : { minHeight: '0' }}>
                <div className="container">
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
    fetchSinglePokemon
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);