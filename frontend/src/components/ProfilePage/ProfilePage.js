import FollowersIndex from './Indexes/FollowersIndex';
import FollowsIndex from './Indexes/FollowsIndex';
import RandomUsersIndex from './Indexes/RandomUsersIndex';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, getUser } from '../../store/users';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(getUser(userId));

  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [dispatch, userId]);

  return (
    <div>
      <RandomUsersIndex />
      <FollowsIndex user={user} />
      <FollowersIndex user={user} />
    </div>
  );
}