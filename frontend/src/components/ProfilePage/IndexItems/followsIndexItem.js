import { NavLink } from 'react-router-dom';

export default function FollowsIndexItem({ follow }) {
    return (
        <li>
            <NavLink to={`/${follow._id}`}>
                {follow.username}
            </NavLink>
        </li>
    );
}