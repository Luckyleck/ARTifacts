import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/users';
import FollowsIndexItem from "../IndexItems/FollowsIndexItem";

export default function FollowsIndex() {
  const { userId } = useParams();
  const user = useSelector(getUser(userId));

  return (
    <div>
      {`${user?.username}'s Follows`}
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