import React from 'react'


function DisplayArtwork({ artwork, setShowArt}) {
    return (
        <div className="art-display-container">
            <FavoriteButton artwork={randomArtwork} />
            <h2>{randomArtwork?.culture}</h2>
            <button onClick={() => setShowArt(false)}>&times;</button>
            <img src={randomArtwork?.images.web.url} alt={randomArtwork?.title} id='fetched-image' />
            {console.log(randomArtwork)}
        </div>
    )
}

export default DisplayArtwork;