import { useSelector } from 'react-redux';
import { getRandomUsers } from '../../../store/users';
import RandomUsersIndexItem from "../IndexItems/RandomUsersIndexItem";

export default function RandomUsersIndex() {
  const randomUsers = useSelector(getRandomUsers);

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