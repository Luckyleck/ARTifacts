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
    <button onClick={() => dispatch(unfollow(currentUser, user))}>unfollow</button>
  );
  return (
    <button onClick={() => dispatch(follow(currentUser, user))}>follow</button>
  );
}