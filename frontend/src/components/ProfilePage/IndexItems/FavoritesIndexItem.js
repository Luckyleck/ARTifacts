import './Favorites.css'
import { useState } from 'react';
import DisplayArtwork from '../../DisplayArtwork/DisplayArtwork';

export default function FavoritesIndexItem({ favorite }) {
  const [ArtworkViewModalIsOpen, setArtworkViewModalIsOpen] = useState(false);

  function toggleArtworkViewModal() {
    setArtworkViewModalIsOpen(!ArtworkViewModalIsOpen);
  }

  return (
    <>
      <button onClick={toggleArtworkViewModal} className="grid-item">
        <img src={favorite?.images.web.url} alt={favorite?.title} className="favorite-thumbnail" />
      </button>
      {ArtworkViewModalIsOpen && <DisplayArtwork toggle={toggleArtworkViewModal} artwork={favorite} />}
    </>
  );
}