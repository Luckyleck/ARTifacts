import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getUser, follow, unfollow } from '../../../store/users';

export default function FollowButton() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(getUser(userId));
  const currentUser = useSelector(getCurrentUser);

  if (!currentUser || !user) return;
  if (currentUser._id === user._id) return;
  if (currentUser?.follows?.includes(user._id)) return (
    <button
      type='button'
      onClick={() => dispatch(unfollow(currentUser, user))}
      id='follow-button'
      className='submit-form allow-submit'
    ><i className='fa-solid fa-user-slash'></i>Unfollow</button>
  );
  return (
    <button
      type='button'
      onClick={() => dispatch(follow(currentUser, user))}
      id='follow-button'
      className='submit-form allow-submit'
    ><i className='fa-solid fa-user-plus'></i>Follow</button>
  );
}