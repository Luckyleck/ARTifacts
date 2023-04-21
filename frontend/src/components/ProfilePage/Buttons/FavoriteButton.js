import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, favorite, unfavorite } from '../../../store/users';

export default function FavoriteButton({ artwork }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  function objectExistsWithKey(arr, key, value) {
    return arr?.some(obj => obj[key] === value);
  }

  if (!currentUser || !artwork) return;
  if (objectExistsWithKey(currentUser.favorites, 'id', artwork.id)) return (
    <button onClick={() => dispatch(unfavorite(currentUser, artwork))}>unfavorite</button>
  );
  return (
    <button onClick={() => dispatch(favorite(currentUser, artwork))}>favorite</button>
  );
}