import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, getUser } from '../../../store/users';
import FollowsIndexItem from "../IndexItems/FollowsIndexItem";

export default function FollowsIndex() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  useEffect(() => {dispatch(fetchUser(userId))}, [dispatch, userId]);
  const user = useSelector(getUser(userId));

  return (
    <div>
      Follows
      <ul>
        {user?.follows.map((follow) => (
          <FollowsIndexItem
            key={follow._id}
            follow={follow}
          />
        ))}
      </ul>
    </div>
  );
}