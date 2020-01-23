import React, { Component } from "react";
import { connect } from "react-redux";

import './Pokemons.css';
import { openPokemonStyle, closePokemonStyle, showBtn, hideBtn } from "../shared/animationStyle";
import { changePage, previousPage, nextPage } from "../store/index";


class Buttons extends Component {
    state = {
        isWindowTabletSize: false
    }

    componentDidMount() {
        window.addEventListener("resize", this.checkIsWindowTabletSize)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkIsWindowTabletSize)
    }

    checkIsWindowTabletSize = () => {
        this.setState({isWindowTabletSize : window.innerWidth < 600})
    }

    render() {
        const { pokemons, isClicked, pokemonsPerPage, min, max, changePage, previousPage, nextPage } = this.props
        const numsOfPages = Math.ceil(pokemons.length / pokemonsPerPage);

        const makeButtons = (isWindowTabletSize) => {
            const buttonsJsx = [];
            for (let index = 1; index < numsOfPages + 1; index++) {
                let nextMin = (index - 1) * pokemonsPerPage;
                let nextMax = index * pokemonsPerPage;
                let otherPage = nextMin !== min;
                let currentPage = nextMin === min;

                buttonsJsx
                    .push(
                        <span
                            className={
                                isWindowTabletSize && otherPage
                                    ? "pagination-btns hide"
                                    : "pagination-btns"}
                            key={nextMin}
                            onClick={() => changePage(nextMin, nextMax)}
                            style={
                                currentPage
                                    ? { backgroundColor: "#C32025", color: "rgb(215, 215, 215)" }
                                    : { backgroundColor: "#fff" }}>
                            {index}
                        </span>)

            }
            return buttonsJsx;
        }

        const showBtns = (isWindowTabletSize) => {
            let btns = {};
            if (min < 300) {
                btns = {
                    numberBtns: makeButtons(isWindowTabletSize).filter((btn, i) => i <= 9),
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
                    numberBtns: makeButtons(isWindowTabletSize).filter((btn, i) => i > 9 && i < 19),
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
                    numberBtns: makeButtons(isWindowTabletSize).filter((btn, i) => i >= 19 && i < 29),
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
                    numberBtns: makeButtons(isWindowTabletSize).filter((btn, i) => i >= 29),
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
                <span
                    className="pagination-btns change-ten-pages"
                    onClick={() => changePage(showBtns(this.state.isWindowTabletSize).previousTenPagesMin, showBtns(this.state.isWindowTabletSize).previousTenPagesMax)}
                    style={!showBtns(this.state.isWindowTabletSize).previousText ? hideBtn : showBtn}>&#171;{showBtns(this.state.isWindowTabletSize).previousText}
                </span>

                <span
                    className="pagination-btns"
                    onClick={previousPage}
                    style={!min ? hideBtn : showBtn}>&#171;
                </span>

                {showBtns(this.state.isWindowTabletSize).numberBtns}

                <span
                    className="pagination-btns"
                    onClick={nextPage}
                    style={max >= pokemons.length
                        ? hideBtn
                        : showBtn}>&#187;
                </span>

                <span
                    className="pagination-btns change-ten-pages"
                    onClick={() => changePage(showBtns(this.state.isWindowTabletSize).nextTenPagesMin, showBtns(this.state.isWindowTabletSize).nextTenPagesMax)}
                    style={!showBtns(this.state.isWindowTabletSize).nextText || pokemons.length < 300 ? hideBtn : showBtn}>{showBtns(this.state.isWindowTabletSize).nextText}&#187;
                </span>
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
    changePage,
    previousPage,
    nextPage
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);