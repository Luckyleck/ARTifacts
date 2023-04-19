import { NavLink } from 'react-router-dom';

export default function FollowersIndexItem({ follower }) {
  return (
    <li>
      <NavLink to={`/${follower._id}`}>
        {follower.username}
      </NavLink>
    </li>
  );
}