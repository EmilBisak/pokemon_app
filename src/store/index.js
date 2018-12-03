const initialState = {
    pokemons: '',
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

        default:
            return state
    }
}

export const setPokemons = pokemons => ({
    type: 'SET_POKEMONS',
    pokemons
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
