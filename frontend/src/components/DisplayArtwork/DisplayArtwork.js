import FavoriteButton from '../ProfilePage/Buttons/FavoriteButton';
import './DisplayArtwork.css';

function DisplayArtwork({ artwork, setShowArt, setRandomArtwork, artworks }) {

  function handleClick() {
    setShowArt(false);
    setRandomArtwork('');
  }

  return (
    <div className='art-display-container'>
      <img src={artwork?.images.web.url} alt={artwork?.title} id='fetched-image' />
      <div className='art-info'>
        <h1>Title</h1>
        <h2>{artwork.title}</h2>
        <h1>Technique</h1>
        <h2>{artwork.technique}</h2>
        {artwork.wall_description && (
          <>
            <h1>Description</h1>
            <h2>{artwork.wall_description}</h2>
          </>
        )}
        <h3>{artwork.tombstone}</h3>
      </div>
      <div className='art-display-buttons'>
          <button onClick={handleClick} className='close-form close-display'>
            <i className='fa-solid fa-xmark'></i>
          </button>
          <FavoriteButton artwork={artwork} />
      </div>

      {artworks.length > 1 &&
      <button
        onClick={() => setRandomArtwork(artworks[Math.floor(Math.random() * artworks.length)])}
        className='next-button'
      >
      <i className="fa-solid fa-angles-right" id='next-artwork-left'></i>
      <p>Next</p>
      </button>}

    </div>
  );
}

export default DisplayArtwork;