import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchValue: '',
    currenciesData: []
  },
  actions: {
    async fetchCurrency({commit}) {
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      const data = await response.json()
      const dataValute = data.Valute
      commit('setCurrenciesData', dataValute)
    },
    getSearchValue({commit}, value) {
      commit('setSearchValue', value)
    }
  },
  getters: {
    searchValue(state) {
      return state.searchValue
    },
  },
  mutations: {
    setSearchValue: (state, value) => {
      state.searchValue = value
    },
    setCurrenciesData(state, dataValute) {
      state.currenciesData = dataValute
    },
  },
  modules: {
  }
})
