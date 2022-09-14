import Api from '../../services/Api'
export default {
  async login(context, payload) {
    const loginResponse = await fetch(Api.Authenticateion.Login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    })
    let LoginResponseData = await loginResponse.json()
    if (loginResponse.ok) {
      LoginResponseData = LoginResponseData.data
      context.commit('updateToken', {
        token: LoginResponseData.access_token,
        refreshToken: LoginResponseData.refresh_token,
      })
      const expiresIn = +LoginResponseData.expires
      setTimeout(function () {
        context.dispatch('refreshToken')
      }, expiresIn)

      // localStorage.setItem('token', LoginResponseData.access_token)
      // localStorage.setItem('refreshToken', LoginResponseData.refresh_token)

      // const expiresIn = +LoginResponseData.expires
      // setTimeout(function () {
      //   context.dispatch('refreshToken', LoginResponseData.refresh_token)
      // }, expiresIn)
      // const expirationDate = new Date().getTime() + expiresIn
      // localStorage.setItem('tokenExpiration', expirationDate + '')
    } else {
      context.commit('updateUserLogedInStatus', false)
      const error = new Error(
        LoginResponseData.message ||
          'Failed to authenticate. Check your login data.'
      )
      throw error
    }

    const userResponse = await fetch(Api.Authenticateion.LoggedUser, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + LoginResponseData.access_token,
      },
    })
    let userResponseData = await userResponse.json()
    if (userResponse.ok) {
      userResponseData = userResponseData.data
      const plans = userResponseData.organisation_plans
      let totalAllowedAmount = 0
      if (plans) {
        for (const id in plans) {
          totalAllowedAmount = totalAllowedAmount + plans[id].allowed_amount
        }
      }
      context.commit('updateUser', {
        ...userResponseData,
        totalAllowedAmount,
      })
      context.commit('updateUserLogedInStatus', true)

      // localStorage.setItem('user', JSON.stringify(userResponseData))
      return true
    } else {
      context.commit('updateUserLogedInStatus', false)
      const error = new Error(
        userResponseData.message ||
          'Failed to authenticate. Check your login data.'
      )
      throw error
    }
  },

  async refreshToken(context, payload) {
    const refreshToken = context.getters.refreshToken
    const response = await fetch(Api.Authenticateion.Refresh, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    })
    let responseData = await response.json()
    responseData = responseData.data

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      )
      throw error
    }
    if (response.ok) {
      const expiresIn = +responseData.expires
      setTimeout(function () {
        context.dispatch('refreshToken')
      }, expiresIn)
      context.commit('updateToken', {
        token: responseData.access_token,
        refreshToken: responseData.refresh_token,
      })
    }
  },
}
