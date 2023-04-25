import FavoriteButton from '../ProfilePage/Buttons/FavoriteButton';

export default function ArtworkDisplayModal({ artwork, toggle }) {
  return (
    <div className="art-display-container">
      <button onClick={() => toggle(false)}>&times;</button>
      <FavoriteButton artwork={artwork} />
      <h2>{artwork?.culture}</h2>
      <img src={artwork?.images.web.url} alt={artwork?.title} id='fetched-image' />
    </div>
  );
}