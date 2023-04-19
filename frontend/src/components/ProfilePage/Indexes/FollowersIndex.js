import FollowersIndexItem from "../IndexItems/FollowersIndexItem";

export default function FollowsIndex({ user }) {
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