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
        const { isClicked, singlePokemon } = this.props;
        const { isClickedMove, isClickedStat } = this.state;

        if (!singlePokemon) {
            return <div className="wrapp single-pokemon" style={isClicked ? { minHeight: 'calc(60vh)' } : { minHeight: '0' }}>
                <div className="container single-pokemon" style={isClicked ? openPokemonStyle : closePokemonStyle}>
                    <Link to="/"><h1>Select pokemon</h1></Link>
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

        const typeJsx = singlePokemon.types.map((type, i) => {
            return <img key={type.type.name + i} title={type.type.name} src={`assets/types/${type.type.name}.png`} alt="type" className="pokemon-types" />
        })

        const statsJsx = singlePokemon.stats.map(stat => {
            return <p key={stat.stat.name}><span>{stat.stat.name}: {stat.base_stat}</span></p>
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
                        <h2 datatype="isClickedStat" onClick={this.showHide}>Stats</h2>
                        <div className="pokemon-stats-holder" style={isClickedStat ? { ...showPokemonDetails, gridTemplateColumns: '1fr 1fr' } : hidePokemonDetails}>
                            <p>Height : {singlePokemon.height}</p>
                            <p>Weight : {singlePokemon.weight}</p>
                            {isClickedStat ? statsJsx : null}
                        </div>
                    </div>
                    <h2 datatype="isClickedMove" onClick={this.showHide}>moves</h2>
                    <div className="pokemon-moves-holder" style={isClickedMove ? showPokemonDetails : hidePokemonDetails}>
                        {isClickedMove ? movesJsx : null}
                    </div>
                    <Link to="/"><h3>Back</h3></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isClicked: state.isClicked,
        singlePokemon: state.singlePokemon
    }
}

export default connect(mapStateToProps)(SinglePokemon);