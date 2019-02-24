import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import './SinglePokemon.css'
import { showPokemonDetails, hidePokemonDetails, openPokemonStyle, closePokemonStyle } from '../shared/animationStyle'

class SinglePokemon extends Component {

    state = {
        isClickedStat: false,
        isClickedMove: false,
        toggle: false,
        imgUrl: 1,
    }

    showHide = (e) => {
        let element = e.nativeEvent.path[0].getAttribute('datatype');

        switch (element) {
            case 'isClickedStat':
                this.setState({ [element]: !this.state.isClickedStat })
                break;
            case 'isClickedMove':
                this.setState({ [element]: !this.state.isClickedMove })
                break;

            default:
                console.log(this.state);

        }


    }
    render() {
        const { isClicked, singlePokemon, loading } = this.props;
        const { isClickedMove } = this.state;

        if (!singlePokemon || loading) {
            return <div className="wrapp single-pokemon" style={isClicked ? { minHeight: 'calc(60vh)' } : { minHeight: '0' }}>
                <div className="container single-pokemon" style={isClicked ? openPokemonStyle : closePokemonStyle}>
                    <img src="assets/icons/loading.gif" alt="loading" />
                    <h4>Loading...</h4>
                    <Link to="/"><h2>Select pokemon</h2></Link>
                </div>
            </div>
        }

        const grabPokemonImages = () => {
            let images = [];
            for (let img in singlePokemon.sprites) {
                if (singlePokemon.sprites.hasOwnProperty(img)) {
                    if (img === "front_default" || img === "back_default")
                        images.push(singlePokemon.sprites[img]);
                }
            }
            images = images.filter(img => img !== null);
            return images

        }

        let pokemonImages = grabPokemonImages();

        const changeImgBc = () => {
            this.setState({ imgUrl: 0 })
        }
        const changeImgFr = () => {
            pokemonImages.length > 0 ? this.setState({ imgUrl: 1 }) : this.setState({ imgUrl: 0 })
        }

        const matchPercentage = (stat) => {
            let max = 0;
            switch (stat.stat.name) {
                case "speed":
                    max = 160;
                    break;

                case "special-defense":
                    max = 230;
                    break;

                case "special-attack":
                    max = 173;
                    break;

                case "defense":
                    max = 230;
                    break;

                case "attack":
                    max = 181;
                    break;

                case "hp":
                    max = 255;
                    break;

                default:
                    max = 0;
                    break;
            }

            let perc = stat.base_stat / max * 100;

            return [perc, max]
        }


        const typeJsx = singlePokemon.types.map((type, i) => {
            return <img key={type.type.name + i} title={type.type.name} src={`assets/types/${type.type.name}.png`} alt="type" className="pokemon-types" />
        })

        const statsJsx = singlePokemon.stats.map(stat => {
            return (
                <div key={stat.stat.name} className="stat-wrapper">
                    <div className="stat-holder">
                        <span>{stat.stat.name}:</span>
                        <div className="progress">
                            <div className="progress-bar" style={{ width: `${matchPercentage(stat)[0]}%` }}>
                                <span className="stat-min-max">0</span>
                                <span>{stat.base_stat}</span>
                                <span></span>
                            </div>
                            <span className="stat-min-max">{matchPercentage(stat)[1]}</span>
                        </div>
                    </div>
                </div>
            )
        })

        const movesJsx = singlePokemon.moves.map(move => {
            let moveName = move.move.name
            return <small key={moveName}>{moveName}, </small>
        })


        return (
            <div className="wrapp single-pokemon" style={isClicked ? { minHeight: 'calc(60vh)' } : { minHeight: '0' }}>
                <div className="container single-pokemon" style={isClicked ? openPokemonStyle : closePokemonStyle}>
                    <h1>{singlePokemon.name}</h1>
                    <div className="pokemon-image-holder">
                        <img src={pokemonImages.length > 1 ? pokemonImages[this.state.imgUrl] : pokemonImages} onMouseOver={changeImgBc} onMouseOut={changeImgFr} alt="sprite" />
                        <div>
                            <h4>Type</h4>
                            {typeJsx}
                        </div>
                    </div>
                    <div className="pokemon-stats">
                        <div className="pokemon-stats-holder">
                            <div className="stat-wrapper">
                                <div className="stat-holder">
                                    <span>height:</span>
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: `${singlePokemon.height / 145 * 100}%` }}>
                                            <span className="stat-min-max">0</span>
                                            <span>{singlePokemon.height}</span>
                                            <span></span>
                                        </div>
                                        <span className="stat-min-max">145</span>
                                    </div>
                                </div>
                            </div>
                            <div className="stat-wrapper">
                                <div className="stat-holder">
                                    <span>weight:</span>
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: `${singlePokemon.weight / 9999 * 100}%` }}>
                                            <span className="stat-min-max">0</span>
                                            <span>{singlePokemon.weight}</span>
                                            <span></span>
                                        </div>
                                        <span className="stat-min-max">9999</span>
                                    </div>
                                </div>
                            </div>
                            {statsJsx}
                        </div>
                    </div>
                    <h2 datatype="isClickedMove" onClick={this.showHide}>
                        moves
                        <img
                            src={isClickedMove ? 'assets/icons/expand-arrow.png' : 'assets/icons/expand-button.png'}
                            alt='eye'
                            onClick={this.showHide}
                            datatype="isClickedMove" />
                    </h2>
                    <div className="pokemon-moves-holder" style={isClickedMove ? showPokemonDetails : hidePokemonDetails}>
                        {isClickedMove ? movesJsx : null}
                    </div>
                    <Link to="/"><h3 className="back-btn">Back</h3></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isClicked: state.isClicked,
        singlePokemon: state.singlePokemon,
        loading: state.loading
    }
}

export default connect(mapStateToProps)(SinglePokemon);

