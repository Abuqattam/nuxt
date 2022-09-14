import Api from '../services/Api'
import { login } from './login/index'

// export default new Vuex.Store({
export const state = () => ({})
export const mutations = {}
export const actions = {}
export const getters = {}
export const modules = {
  login,
  loader: {
    namespaced: true,
    state: () => ({
      loader: false,
    }),
    mutations: {
      reverseLoaderState(state) {
        state.loader = !state.loader
      },
    },
    actions: {
      reverseLoader(context) {
        context.commit('reverseLoaderState')
      },
    },
    getters: {
      getLoader(state) {
        return state.loader
      },
    },
  },
  plans: {
    namespaced: true,
    state: () => ({
      plans: [
        {
          id: 0,
          plans_id: 0,
          allowed_amount: 0,
          active_amount: 0,
          remaining_amount: 0,
        },
      ],
      plansChanged:false,
    }),
    mutations: {
      setPlansState(state, payload) {
        state.plans = payload
      },
      setPlansChangedState(state){
        state.plansChanged = !state.plansChanged
      }
    },
    actions: {
      async setPlans(context) {
        await fetch(Api.plans.OrganisationPlans, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + context.rootGetters['login/token'],
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json()
            }
          })
          .then((data) => {
            const result = data.data
            context.commit('setPlansState', result)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      },
      setPlansChanged(context){
        context.commit('setPlansChangedState')
      },
    },
    getters: {
      getPlans(state) {
        return state.plans
      },
      getPlansChanged(state){
        return state.plansChanged

      }
    },
  },
  userEdit: {
    namespaced: true,
    state: () => ({
      userId: null,
    }),
    mutations: {
      updateUserIdState(state,payload) {
        state.userId = payload
      },
    },
    actions: {
      setUserIdState(context,payload) {
        context.commit('updateUserIdState',payload)
      },
    },
    getters: {
      getUserId(state) {
        return state.userId
      },
    },
  },
  language: {
    namespaced: true,
    state: () => ({
      language: 'ar',
    }),
    mutations: {
      updateActiveLanguage(state,payload) {
        state.language = payload
      },
    },
    actions: {
      setActiveLanguage(context,payload) {
        context.commit('updateActiveState',payload)
      },
    },
    getters: {
      getActiveState(state) {
        return state.language
      },
    },
  },
}
// });
