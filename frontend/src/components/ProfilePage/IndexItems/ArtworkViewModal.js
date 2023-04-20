

export default function ArtworkViewModal({ toggle, artwork }) {
  return (
    <div className="favorite-view-modal">
      <img src={artwork?.images.web.url} alt={artwork?.title} className="favorite-image" />
    </div>
  );
}