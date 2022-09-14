export default {
  updateUser(state, payload) {
    state.user = payload;
  },
  updateToken(state, payload) {
    state.token = payload.token;
    state.refreshToken = payload.refreshToken;
  },
  updateUserLogedInStatus(state, payload){
    state.loggedIn = payload;
  },
}
