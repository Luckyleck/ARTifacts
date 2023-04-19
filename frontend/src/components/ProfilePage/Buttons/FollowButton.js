import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, follow, unfollow } from '../../../store/users';

export default function FollowButton({ pageUser }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  if (currentUser._id === pageUser._id) return (
    <button onClick={() => dispatch(unfollow(currentUser, pageUser))}>Unfollow</button>
  );

  return (
    <button onClick={() => dispatch(follow(currentUser, pageUser))}>Follow</button>
  );
}