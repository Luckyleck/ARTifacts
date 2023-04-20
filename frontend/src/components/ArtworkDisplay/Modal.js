import FavoriteButton from '../ProfilePage/Buttons/FavoriteButton';

export default function ArtworkDisplayModal({ artwork, setModalShouldBeOpen }) {
  return (
    <div className="art-display-container">
      <FavoriteButton artwork={artwork} />
      <h2>{artwork?.culture}</h2>
      <button onClick={() => setModalShouldBeOpen(false)}>&times;</button>
      <img src={artwork?.images.web.url} alt={artwork?.title} id='fetched-image' />
    </div>
  );
}