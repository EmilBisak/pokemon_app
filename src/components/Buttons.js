import React, { Component } from "react";
import { connect } from "react-redux";

import './Pokemons.css';
import { openPokemonStyle, closePokemonStyle } from "../shared/animationStyle";
import { changePage } from "../store/index";


class Buttons extends Component {

    render() {
        const { pokemons, isClicked, pokemonsPerPage, min, max, changePage } = this.props
        const numsOfPages = Math.ceil(pokemons.results.length / pokemonsPerPage);

        const makeButtons = () => {
            const buttonsJsx = [];
            for (let index = 1; index < numsOfPages; index++) {
                let nextMin = (index - 1) * pokemonsPerPage;
                let nextMax = index * pokemonsPerPage;
                buttonsJsx.push(<span className="pagination-btns" key={nextMin} onClick={() => changePage(nextMin, nextMax)} style={nextMin === min ? { backgroundColor: "#ffb6b6" } : { backgroundColor: "#fff" }}>{index}</span>)

            }
            return buttonsJsx;
        }

        const showBtns = () => {
            let btns = {};
            if (min < 300) {
                btns = {
                    numberBtns: makeButtons().filter((btn, i) => i <= 9),
                    nextTenPagesMin: 300,
                    nextTenPagesMax: 330,
                    previousTenPagesMin: min,
                    previousTenPagesMax: max,
                    nextText: "11-19 ",
                    previousText: ""
                }
                return btns
            } else if (min >= 300 && min < 570) {
                btns = {
                    numberBtns: makeButtons().filter((btn, i) => i > 9 && i < 19),
                    nextTenPagesMin: 570,
                    nextTenPagesMax: 600,
                    previousTenPagesMin: 0,
                    previousTenPagesMax: 30,
                    nextText: "20-29 ",
                    previousText: " 1-10"
                }
                return btns
            } else if (min >= 570 && min < 870) {
                btns = {
                    numberBtns: makeButtons().filter((btn, i) => i >= 19 && i < 29),
                    nextTenPagesMin: 870,
                    nextTenPagesMax: 900,
                    previousTenPagesMin: 300,
                    previousTenPagesMax: 330,
                    nextText: "30-31 ",
                    previousText: " 11-19"
                }
                return btns
            } else {
                btns = {
                    numberBtns: makeButtons().filter((btn, i) => i >= 29),
                    nextTenPagesMin: 900,
                    nextTenPagesMax: 930,
                    previousTenPagesMin: 570,
                    previousTenPagesMax: 600,
                    nextText: "",
                    previousText: " 20-29"
                }
                return btns
            }
        }

        return (
            <div className="buttons-holder" style={isClicked ? openPokemonStyle : closePokemonStyle}>
                <span className="pagination-btns" onClick={() => changePage(showBtns().previousTenPagesMin, showBtns().previousTenPagesMax)} style={!showBtns().previousText ? { display: "none" } : { display: "inline-block" }}>&#171;{showBtns().previousText}</span>
                {showBtns().numberBtns}
                <span className="pagination-btns" onClick={() => changePage(showBtns().nextTenPagesMin, showBtns().nextTenPagesMax)} style={!showBtns().nextText ? { display: "none" } : { display: "inline-block" }}>{showBtns().nextText}&#187;</span>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isClicked: state.isClicked,
        pokemons: state.pokemons,
        pokemonsPerPage: state.pokemonsPerPage,
        min: state.min,
        max: state.max
    }
}

const mapDispatchToProps = {
    changePage
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);