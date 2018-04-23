import http from '../../assets/js/http'

const state = {
  resourceList: [],
  currentPage: 1,
  pageSize: 11,
  pageTotal: 0
}

const getters = {
}

const mutations = {
  setResourceListMutations (state, payload) {
    state.resourceList = payload
  },
  setPageTotalMutations (state, payload) {
    state.pageTotal = payload
  },
  setCurrentPageMutations (state, payload) {
    state.currentPage = payload
  },
  setPageSizeMutations (state, payload) {
    state.pageSize = payload
  },
  pushResourceListMutations (state, payload) {
    if (state.resourceList === null) {
      state.resourceList = []
    }
    state.resourceList.push(payload)
  }
}

const actions = {
  /*
   * 给resourceList添加一组数据
   */
  pushResourceListAction ({commit}, payload) {
    commit('pushResourceListMutations', payload)
  },
  /*
   * 获取资源列表的方法，用户点击分页组件的响应方法
   */
  async getResourceListAction ({commit}, payload) {
    let url = 'rbacResource/listAllResource/' + payload + '/' + state.pageSize
    const res = await http.get(url)
    if (res.data.msg === 'success') {
      commit('setResourceListMutations', res.data.list)
      commit('setPageTotalMutations', res.data.total)
      commit('setCurrentPageMutations', payload)
      return res.data.msg
    } else {
      return res.data.msg
    }
  },
  /*
   * 添加资源的方法
   */
  async addResourceAction ({commit}, payload) {
    let data = payload
    const res = await http.post('rbacResource/addRBACResource', data)
    return res.data
  },
  /*
   * 删除资源的方法
   */
  async deleteResourceAction ({commit}, payload) {
    let data = payload
    const res = await http.post('rbacResource/deleteRBACResource', data)
    return res.data.msg
  },
  /*
   * 批量删除权限的方法
   */
  async batchDeleteResourceAction ({commit}, payload) {
    let ids = payload
    const res = await http.post('rbacResource/batchDeleteRBACResource', ids)
    return res.data.msg
  },
  /*
   * 更新资源的方法
   */
  async updateResourceAction ({commit}, payload) {
    let data = payload
    const res = await http.post('rbacResource/updateRBACResource', data)
    return res.data.msg
  }
}

const moduleResource = {
  state: state,
  mutations: mutations,
  actions: actions,
  getter: getters
}

export default moduleResource
