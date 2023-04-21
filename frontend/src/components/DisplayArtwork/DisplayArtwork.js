import FavoriteButton from '../ProfilePage/Buttons/FavoriteButton';
// import DisplayArtInfo from '../DisplayArtInfo/DisplayArtInfo';
import './DisplayArtwork.css'

function DisplayArtwork({ artwork, setShowArt }) {

    // const [showInfo, setShowInfo] = useState(false)

    function handleClick() {
        setShowArt(false)
        // setShowInfo(true)
    }

    return (
        <>
            <div className="art-display-container">
                <img src={artwork?.images.web.url} alt={artwork?.title} id='fetched-image' onClick={handleClick}/>
                <div className="art-info">
                    <h2>Title</h2>
                    <h1>{artwork.title}</h1>
                    <h2>Technique</h2>
                    <h2>{artwork.technique}</h2>
                    <h2>Description</h2>
                    <h2>{artwork.wall_description}</h2>
                    <h3>{artwork.tombstone}</h3>
                </div>
                <div className="art-display-buttons">
                    <button onClick={() => setShowArt(false)} id="x-button">&times;</button>
                    <FavoriteButton artwork={artwork} className="favorite-button" />
                </div>
            </div>
            {/* {showInfo && <DisplayArtInfo artwork={artwork} setShowInfo={setShowInfo} setShowArt={setShowArt} />} */}
        </>
    )
}

export default DisplayArtwork;