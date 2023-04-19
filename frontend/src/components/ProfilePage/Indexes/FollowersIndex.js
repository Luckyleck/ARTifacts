import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, getUser } from '../../../store/users';
import FollowersIndexItem from "../IndexItems/FollowersIndexItem";

export default function FollowsIndex() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  useEffect(() => {dispatch(fetchUser(userId))}, [dispatch, userId]);
  const user = useSelector(getUser(userId));

  return (
    <div>
      Followers
      <ul>
        {user?.followers.map((follower) => (
          <FollowersIndexItem
            key={follower._id}
            follower={follower}
          />
        ))}
      </ul>
    </div>
  );
}