const LOAD = 'blog/auth/LOAD';
const LOAD_SUCCESS = 'blog/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'blog/auth/LOAD_FAIL';
const LOGIN = 'blog/auth/LOGIN';
const LOGIN_SUCCESS = 'blog/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'blog/auth/LOGIN_FAIL';
const LOGOUT = 'blog/auth/LOGOUT';
const LOGOUT_SUCCESS = 'blog/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'blog/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(params) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.get('admin/auth', {params: {...params, action: 'in'}})
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('admin/auth', {params: {action: 'out'}})
  };
}


