const initialState = {
    pokemons: '',
    filtered: null,
    singlePokemon: '',
    loading: true,
    isClicked: false,
    pokemonsPerPage: 30,
    min: 0,
    max: 30
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POKEMONS':
            return { ...state, pokemons: action.pokemons }

        case 'SET_POKEMONS_BY_COLOR':
            return { ...state, filtered: action.filtered, min: 0, max: 30 }

        case 'SHOW_ALL_POKEMON':
            return { ...state, filtered: null, min: 0, max: 30 }

        case 'SET_SINGLE_POKEMON':
            return { ...state, singlePokemon: action.pokemon }

        case 'FETCH_START':
            return { ...state, loading: true }

        case 'FETCH_SUCCESS':
            return { ...state, loading: false }

        case 'FETCH_FAIL':
            return { ...state, loading: true }

        case 'CLICKED':
            return { ...state, isClicked: !state.isClicked }

        case 'CHANGE_PAGE':
            return { ...state, min: action.min, max: action.max }

        case 'PREVIOUS_PAGE':
            return { ...state, min: state.min - 30, max: state.max - 30 }

        case 'NEXT_PAGE':
            return { ...state, min: state.min + 30, max: state.max + 30 }

        default:
            return state
    }
}

export const setPokemons = pokemons => ({
    type: 'SET_POKEMONS',
    pokemons,
    filtered: pokemons
})

export const setPokemonsByColor = filtered => ({
    type: 'SET_POKEMONS_BY_COLOR',
    filtered
})

export const showAllPokemons = filtered => ({
    type: 'SHOW_ALL_POKEMON',
})

export const setSinglePokemon = pokemon => ({
    type: 'SET_SINGLE_POKEMON',
    pokemon
})

export const fetchStart = () => ({
    type: 'FETCH_START'
})

export const fetchSuccess = () => ({
    type: 'FETCH_SUCCESS'
})

export const fetchFail = () => ({
    type: 'FETCH_FAIL'
})

export const clicked = () => ({
    type: 'CLICKED'
})

export const changePage = (min, max) => ({
    type: 'CHANGE_PAGE',
    min,
    max
})

export const previousPage = () => ({
    type: 'PREVIOUS_PAGE'
})

export const nextPage = () => ({
    type: 'NEXT_PAGE'
})

export const fetchPokemons = () => dispatch => {
    dispatch(fetchStart());
    return fetch("https://pokeapi.co/api/v2/pokemon/")
        .then(res => res.json())
        .then(json => {
            dispatch(fetchSuccess())
            dispatch(setPokemons(json))
        })
        .catch(e => dispatch(fetchFail(e)))
}

export const fetchSinglePokemon = (id) => dispatch => {
    dispatch(fetchStart());
    return fetch(`https://cors-anywhere.herokuapp.com/https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(json => {
            dispatch(fetchSuccess())
            dispatch(setSinglePokemon(json))
        })
        .catch(e => dispatch(fetchFail(e)))
}

export const fetchPokemonsByColor = (id) => dispatch => {
    dispatch(fetchStart());
    return fetch(`https://cors-anywhere.herokuapp.com/https://pokeapi.co/api/v2/pokemon-color/${id}/`)
        .then(res => res.json())
        .then(json => {
            dispatch(fetchSuccess())
            dispatch(setPokemonsByColor(json))

        })
        .catch(e => dispatch(fetchFail(e)))
}
