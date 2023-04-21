import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/users';
import FavoritesIndexItem from '../IndexItems/FavoritesIndexItem';

export default function FavoritesIndex() {
  const { userId } = useParams();
  const user = useSelector(getUser(userId));

  return (
    <div>
      {`${user?.username}'s favorites`}
      <ul>
        {user?.favorites.map((favorite) => (
          <FavoritesIndexItem
            key={favorite.id}
            favorite={favorite}
          />
        ))}
      </ul>
    </div>
  );
}