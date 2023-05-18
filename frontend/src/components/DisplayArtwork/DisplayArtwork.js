import { useLocation } from 'react-router-dom';
import FavoriteButton from '../ProfilePage/Buttons/FavoriteButton';
import './DisplayArtwork.css';

function DisplayArtwork({ artwork, setShowArt, setRandomArtwork, artworks }) {
  const location = useLocation();
  const { pathname } = location;
  const shouldDisplayNextButton = (pathname === '/explore');

  function handleClick() {
    setShowArt(false);
    setRandomArtwork('');
  }

  function handleNextClick() {
    setRandomArtwork(artworks[Math.floor(Math.random() * artworks.length)])
  }

  return (
    <div className='art-display-container'>
      <div className='s-image-container'>
        <img src={artwork?.images.web.url} alt={artwork?.title} id='fetched-image' />
      </div>
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
        {shouldDisplayNextButton && (
          <button onClick={handleNextClick} className='next-button'>
            <i className="fa-solid fa-angles-right" id='next-artwork-left'></i>
          </button>
        )}
        <FavoriteButton artwork={artwork} />
      </div>
    </div>
  );
}

export default DisplayArtwork;