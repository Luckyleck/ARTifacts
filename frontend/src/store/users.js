import jwtFetch from './jwt';
import { receiveCurrentUser } from './session';


const RECEIVE_USERS = 'users/RECEIVE_USERS';
const RECEIVE_RANDOM_USERS = 'users/RECEIVE_RANDOM_USERS';
const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';

function receiveUsers(users) {
  return ({
    type: RECEIVE_USERS,
    users
  });
}

function receiveRandomUsers(randomUsers) {
  return ({
    type: RECEIVE_RANDOM_USERS,
    randomUsers
  });
}

function receiveUser(user) {
  return ({
    type: RECEIVE_USER,
    user
  });
}

function removeUser(userId) {
  return ({
    type: REMOVE_USER,
    userId
  });
}


export function getCurrentUser(state) {
  return state?.session?.user ? state.session.user : null;
}

export function getUsers(state) {
  return state?.users ? Object.values(state.users) : [];
}

export function getRandomUsers(state) {
  return state?.users?.randomUsers ? Object.values(state.users.randomUsers) : [];
}

export function getUser(userId) {
  return state => state?.users?.user?.[userId] ? state.users.user[userId] : null;
}

export function getFollows(userId) {
  return state => state?.users?.user?.[userId] ? state.users.user[userId].follows : [];
}

export function getFollowers(userId) {
  return state => state?.users?.user?.[userId] ? state.users.user[userId].followers : [];
}

export function getFavorites(userId) {
  return state => state?.users?.user?.[userId] ? state.users.user[userId].favorites: [];
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

export function fetchRandomUsers(num) {
  return (async (dispatch) => {
    const response = await jwtFetch(`/api/users/random/${num}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveRandomUsers(data));
    }
  });
}

export function follow(currentUser, targetUser) {
  return (async (dispatch) => {
    const response = await jwtFetch(`/api/users/follow`, {
      method: 'POST',
      body: JSON.stringify({ currentUser, targetUser, action: 'follow' })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveCurrentUser(data.currentUser));
      dispatch(receiveUser(data.targetUser));
    }
  });
}

export function unfollow(currentUser, targetUser) {
  return (async (dispatch) => {
    const response = await jwtFetch(`/api/users/follow`, {
      method: 'POST',
      body: JSON.stringify({ currentUser, targetUser, action: 'unfollow' })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveCurrentUser(data.currentUser));
      dispatch(receiveUser(data.targetUser));    }
  });
}

export function favorite(currentUser, artwork) {
  return (async (dispatch) => {
    const response = await jwtFetch(`/api/users/favorite`, {
      method: 'POST',
      body: JSON.stringify({ currentUser, artwork, action: 'favorite' })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveCurrentUser(data));
    }
  });
}

export function unfavorite(currentUser, artwork) {
  return (async (dispatch) => {
    const response = await jwtFetch(`/api/users/favorite`, {
      method: 'POST',
      body: JSON.stringify({ currentUser, artwork, action: 'unfavorite' })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveCurrentUser(data));
      dispatch(receiveUser(data));
    }
  });
}

export function fetchUser(userId) {
  return (async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveUser(data));
    }
  });
}

export function updateUser(user) {
  return (async (dispatch) => {
    const response = await jwtFetch(`/api/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(receiveCurrentUser(data));
      dispatch(receiveUser(data));
    }
  });
}

export function deleteUser(userId) {
  return (async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}`, {
      method: 'DELETE',
      body: JSON.stringify(userId)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(removeUser(data));
    }
  });
}


export default function usersReducer(slice = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...slice, ...action.users };
    case RECEIVE_RANDOM_USERS:
      return { ...slice, randomUsers: { ...action.randomUsers } };
    case RECEIVE_USER:
      return { ...slice, user: { [action.user._id]: action.user } };
    case REMOVE_USER:
      const newSlice = { ...slice };
      delete newSlice[action.userId];
      return newSlice;
    default:
      return slice;
  }
}