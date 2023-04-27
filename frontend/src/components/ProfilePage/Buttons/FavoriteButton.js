import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, favorite, unfavorite } from '../../../store/users';
import '../../DisplayArtwork/DisplayArtwork.css';

export default function FavoriteButton({ artwork }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  function objectExistsWithKey(arr, key, value) {
    return arr?.some(obj => obj[key] === value);
  }

  if (!currentUser || !artwork) return;
  if (objectExistsWithKey(currentUser.favorites, 'id', artwork.id)) return (
    <button
      onClick={() => dispatch(unfavorite(currentUser, artwork))}
      id='favorited'
      className='close-form fav-buttons'
    ><i className='fa-solid fa-heart'></i></button>
  );
  return (
    <button
      onClick={() => dispatch(favorite(currentUser, artwork))}
      className='close-form fav-buttons'
    ><i className='fa-regular fa-heart'></i></button>
  );
}