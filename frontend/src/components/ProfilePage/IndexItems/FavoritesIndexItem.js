import './Favorites.css'
import { useState } from 'react';
import ArtworkDisplayModal from '../../ArtworkDisplay/Modal';

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
      {ArtworkViewModalIsOpen && <ArtworkDisplayModal toggle={toggleArtworkViewModal} artwork={favorite} />}
    </>
  );
}