import FollowersIndex from './Indexes/FollowersIndex';
import FollowsIndex from './Indexes/FollowsIndex';
import RandomUsersIndex from './Indexes/RandomUsersIndex';

export default function ProfilePage() {
  return (
    <div>
      <RandomUsersIndex />
      <FollowsIndex />
      <FollowersIndex />
    </div>
  );
}