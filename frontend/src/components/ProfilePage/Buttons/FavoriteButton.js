import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, favorite, unfavorite } from '../../../store/users';

export default function FavoriteButton({ artwork }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  if (!artwork) return;
  if (currentUser?.favorites.includes(artwork._id)) return (
    <button onClick={() => dispatch(unfavorite(currentUser, artwork))}>unfavorite</button>
  );
  return (
    <button onClick={() => dispatch(favorite(currentUser, artwork))}>favorite</button>
  );
}