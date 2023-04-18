import jwtFetch from "./jwt";

export const RECEIVE_ARTWORKS = 'artworks/RECEIVE_ARTWORKS'
export const RECEIVE_ARTWORK = 'artworks/RECEIVE_ARTWORK'

export const receiveArtworks = (artworks) => ({
    type: RECEIVE_ARTWORKS,
    artworks
})

export const receiveArtwork = (artwork) => ({
    type: RECEIVE_ARTWORK,
    artwork
})

export const fetchArtworks = () => async dispatch => {
    const res = await jwtFetch('https://openaccess-api.clevelandart.org/api/artworks/')
    const data = await res.json();
    return dispatch(receiveArtworks(data))
}

export const fetchArtwork = (artworkId) => async dispatch => {
    const res = await jwtFetch(`https://openaccess-api.clevelandart.org/api/artworks/${artworkId}`)
    const data = await res.json();
    return dispatch(receiveArtwork(data.artwork))
}

export default function artworksReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ARTWORKS:
            return { ...state, ...action.artworks }
        case RECEIVE_ARTWORK:
            return { ...state, [action.artwork.id]: action.artwork }
        default: return state
    }
}