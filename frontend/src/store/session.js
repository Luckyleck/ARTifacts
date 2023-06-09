import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = 'session/RECEIVE_CURRENT_USER';
const RECEIVE_USER_LOGOUT = 'session/RECEIVE_USER_LOGOUT';
const RECEIVE_SESSION_ERRORS = 'session/RECEIVE_SESSION_ERRORS';
const CLEAR_SESSION_ERRORS = 'session/CLEAR_SESSION_ERRORS';

// Dispatch receiveCurrentUser when a user logs in.
export function receiveCurrentUser(currentUser) {
  return ({
    type: RECEIVE_CURRENT_USER,
    currentUser
  });
}

// Dispatch logoutUser to clear the session user when a user logs out.
function logoutUser() {
  return ({
    type: RECEIVE_USER_LOGOUT
  });
}
  
// Dispatch receiveErrors to show authentication errors on the frontend.
function receiveErrors(errors) {
  return ({
    type: RECEIVE_SESSION_ERRORS,
    errors
  });
}

// Dispatch clearSessionErrors to clear any session errors.
export function clearSessionErrors () {
  return ({
    type: CLEAR_SESSION_ERRORS
  });
}

export function fetchCurrentUser() {
  return (async (dispatch) => {
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
  });
}

export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');

function startSession(userInfo, route) {
  return (async (dispatch) => {
    try {  
      const res = await jwtFetch(route, {
        method: 'POST',
        body: JSON.stringify(userInfo)
      });
      const { user, token } = await res.json();
      localStorage.setItem('jwtToken', token);
      return dispatch(receiveCurrentUser(user));
    } catch (err) {
      const res = await err.json();
      if (res.statusCode === 400) {
        return dispatch(receiveErrors(res.errors));
      }
    }
  });
}

export function logout() {
  return ((dispatch) => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
  });
}

const initialSlice = { user: undefined };

export default function sessionReducer(slice = initialSlice, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { user: action.currentUser };
    case RECEIVE_USER_LOGOUT:
      return initialSlice;
    default:
      return slice;
  }
};

const nullErrors = null;

export function sessionErrorsReducer(slice = nullErrors, action) {
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return slice;
  }
};