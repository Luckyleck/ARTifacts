import FollowsIndexItem from "../IndexItems/FollowsIndexItem";

export default function FollowsIndex({ user }) {
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