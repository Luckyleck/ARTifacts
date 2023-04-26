import FavoriteButton from '../ProfilePage/Buttons/FavoriteButton';
import './DisplayArtwork.css'

function DisplayArtwork({ artwork, setShowArt }) {

  function handleClick() {
    setShowArt(false)
  }

  if (!artwork) return;
  return (
    <>
      <div className="art-display-container">
        <img src={artwork?.images.web.url} alt={artwork?.title} id='fetched-image' onClick={handleClick}/>
        <div className="art-info">
          <h1>Title</h1>
          <h2>{artwork.title}</h2>
          <h1>Technique</h1>
          <h2>{artwork.technique}</h2>
          <h1>Description</h1>
          <h2>{artwork.wall_description}</h2>
          <h3>{artwork.tombstone}</h3>
        </div>
        <div className="art-display-buttons">
            <button onClick={() => setShowArt(false)} className='close-form close-display'><i className="fa-solid fa-xmark"></i></button>
            <FavoriteButton artwork={artwork} />
        </div>
      </div>
    </>
  );
}

export default DisplayArtwork;