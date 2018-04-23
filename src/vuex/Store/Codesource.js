import axios from '../../assets/js/axios'

const state = {
  resourceList: []
}

const mutations = {
}

const actions = {
  setResourceListAction ({commit}, payload) {
    axios.Get({
      url: 'rbac/list_all_resources',
      callback: (res) => {
        state.resourceList = res.data.list
        state.loading = false
      }
    })
  }
}

const moduleCodesource = {
  state: state,
  mutations: mutations,
  actions: actions
}

export default moduleCodesource
