import React from 'react'
import FavoriteButton from '../ProfilePage/Buttons/FavoriteButton';


function DisplayArtwork({ artwork, setShowArt}) {
    return (
        <div className="art-display-container">
            <FavoriteButton artwork={artwork} />
            <h2>{artwork?.culture}</h2>
            <button onClick={() => setShowArt(false)}>&times;</button>
            <img src={artwork?.images.web.url} alt={artwork?.title} id='fetched-image' />
            {console.log(artwork)}
        </div>
    )
}

export default DisplayArtwork;