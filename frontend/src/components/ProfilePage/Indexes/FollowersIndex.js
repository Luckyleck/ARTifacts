import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/users';
import FollowersIndexItem from "../IndexItems/FollowersIndexItem";

export default function FollowsIndex() {
  const { userId } = useParams();
  const user = useSelector(getUser(userId));

  return (
    <div>
      {`${user?.username}'s Followers`}
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