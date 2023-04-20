import './Favorites.css'
import { useState } from 'react';
import ArtworkViewModal from './ArtworkViewModal';

export default function FavoritesIndexItem({ favorite }) {
  const [ArtworkViewModalIsOpen, setArtworkViewModalIsOpen] = useState(false);

  function toggleArtworkViewModal() {
    setArtworkViewModalIsOpen(!ArtworkViewModalIsOpen);
  }

  return (
    <>
      <button onClick={toggleArtworkViewModal}>
        <img src={favorite?.images.web.url} alt={favorite?.title} className="favorite-thumbnail" />
      </button>
      {ArtworkViewModalIsOpen && <ArtworkViewModal toggle={toggleArtworkViewModal} artwork={favorite} />}
    </>
  );
}