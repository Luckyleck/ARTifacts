import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getUser, follow, unfollow } from '../../../store/users';

export default function FollowButton() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const targetUser = useSelector(getUser(userId));
  const currentUser = useSelector(getCurrentUser);

  if (!currentUser || !targetUser) return;
  if (currentUser._id === targetUser._id) return;
  if (currentUser?.follows?.includes(targetUser._id)) return (
    <button onClick={() => dispatch(unfollow(currentUser, targetUser))}>unfollow</button>
  );
  return (
    <button onClick={() => dispatch(follow(currentUser, targetUser))}>follow</button>
  );
}