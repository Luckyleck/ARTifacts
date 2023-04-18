import jwtFetch from './jwt';


const RECEIVE_USERS = 'users/RECEIVE_USERS';
const RECEIVE_USER = 'users/RECEIVE_USER';
// const REMOVE_USER = 'users/REMOVE_USER';

function receiveUsers(users) {
  return ({
    type: RECEIVE_USERS,
    users
  });
}

function receiveUser(user) {
  return ({
    type: RECEIVE_USER,
    user
  });
}

// function removeUser(userId) {
//   return ({
//     type: REMOVE_USER,
//     userId
//   });
// }


export function getUsers(state) {
  return state?.users ? Object.values(state.users) : [];
}

export function getUser(userId) {
  return state => state?.users?.[userId] ? state.users[userId] : null;
}

export function getFollowing(userId) {
  return state => state?.users?.[userId] ? state.users[userId].following : [];
}

export function getFollowers(userId) {
  return state => state?.users?.[userId] ? state.users[userId].followers : [];
}


export function fetchUsers() {
  return (async (dispatch) => {
    const response = await jwtFetch('/api/users');

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveUsers(data));
    }
  });
}

export function fetchUser(user) {
  return (async (dispatch) => {
    const response = await jwtFetch(`/api/user/${user._id}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveUser(data));
    }
  });
}

// export function updateUser(user) {
//   return (async (dispatch) => {
//     const response = await jwtFetch(`/api/user/${user._id}`, {
//       method: 'PUT',
//       body: JSON.stringify(user)
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(receiveUser(data));
//     }
//   });
// }

// export function deleteUser(userId) {
//   return (async (dispatch) => {
//     const response = await jwtFetch(`/api/user/${userId}`, {
//       method: 'DELETE',
//       body: JSON.stringify(userId)
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(removeUser(data));
//     }
//   });
// }


export default function usersReducer() {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...action.users };
    case RECEIVE_USER:
      return { ...slice, [action.user._id]: action.user };
    case REMOVE_USER:
      const newSlice = { ...slice };
      delete newSlice[action.userId];
      return newSlice;
    default:
      return slice;
  }
}