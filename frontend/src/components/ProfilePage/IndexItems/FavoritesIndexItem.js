// import { useState } from 'react';
// import DisplayArtwork from '../../DisplayArtwork/DisplayArtwork';

// export default function FavoritesIndexItem({ favorite }) {
//   const [artworkViewModalIsOpen, setArtworkViewModalIsOpen] = useState(false);

//   function toggleArtworkViewModal() {
//     setArtworkViewModalIsOpen(!artworkViewModalIsOpen);
//   }

//   return (
//     <>
//       <button onClick={toggleArtworkViewModal} className="grid-item">
//         <img src={favorite?.images.web.url} alt={favorite?.title} className="favorite-thumbnail" />
//       </button>
//       {artworkViewModalIsOpen && (
//         <DisplayArtwork artwork={favorite} setShowArt={toggleArtworkViewModal} />
//       )}
//     </>
//   );
// }