import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomUsers, getUsers } from '../../../store/users';
import RandomUsersIndexItem from "../IndexItems/RandomUsersIndexItem";

export default function RandomUsersIndex() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const randomUsers = useSelector(getUsers);

  useEffect(() => {
    dispatch(fetchRandomUsers(5))
  }, [dispatch, userId]);

  return (
    <div>
      Random Users
      <ul>
        {randomUsers?.map((randomUser) => (
          <RandomUsersIndexItem
            key={randomUser._id}
            randomUser={randomUser}
          />
        ))}
      </ul>
    </div>
  );
}