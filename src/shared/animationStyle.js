export const openBallStyles = {
    transition: "all 1s",
    minHeight: "15vh",
}

export const closeBallStyles = {
    transition: "all 1s",
    minHeight: "calc(50vh - 10px)",
}

export const openPokemonStyle = {
    visibility: 'visible',
    opacity: '1',
    transition: 'visibility 0s linear 0s, opacity 300ms',
    margin: '60px auto',
}

export const closePokemonStyle = {
    visibility: 'hidden',
    opacity: '0',
    transition: 'visibility 0s linear 500ms, opacity 300ms',
    margin: '0',
    padding: '0',
    height: '0'
}

export const showPokemonDetails = {
    padding: '20px',
    margin: '0 20px',
}

export const hidePokemonDetails = {
    border: 'none',
    padding: '0',
    margin: '0',
}

export const showBtn = {
    display: "inline-block"
}

export const hideBtn = {
    display: "none"
}