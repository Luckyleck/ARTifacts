import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getUser } from '../../../store/users';
import FollowersIndexItem from "../IndexItems/FollowersIndexItem";

export default function FollowsIndex() {
  const { userId } = useParams();
  const user = useSelector(getUser(userId));

  return (
    <div>
      {`${user?.username}'s followers`}
      <ul className="favorites-ul">
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