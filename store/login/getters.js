export default {
  user(state) {
    return state.user;
  },
  token(state) {
    return state.token;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
  isLoggedIn(state) {
    return state.loggedIn;
  },
}
