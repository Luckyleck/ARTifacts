import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/users';
// import FavoritesIndexItem from '../IndexItems/FavoritesIndexItem';
import { useState } from 'react';
import DisplayArtwork from '../../DisplayArtwork/DisplayArtwork';

export default function FavoritesIndex() {
  const { userId } = useParams();
  const user = useSelector(getUser(userId));

  const [artworkViewModalIsOpen, setArtworkViewModalIsOpen] = useState(false);
  const [favorite, setFavorite] = useState();

  function toggleArtworkViewModal() {
    setArtworkViewModalIsOpen(!artworkViewModalIsOpen);
  }

  return (
    <div className="grid-container">
        {user?.favorites.map((favorite) => (
          <button
            key={favorite.id}
            onClick={() => {
              setFavorite(favorite);
              setArtworkViewModalIsOpen(!artworkViewModalIsOpen);
            }}
            className="grid-item"
          >
            <img src={favorite?.images.web.url} alt={favorite?.title} className="favorite-thumbnail" />
          </button>
        ))}
      {artworkViewModalIsOpen && (
        <DisplayArtwork artwork={favorite} setShowArt={toggleArtworkViewModal} />
      )}
    </div>
  );
}