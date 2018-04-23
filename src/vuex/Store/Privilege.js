import http from '../../assets/js/http'

const state = {
  privilegeList: [],
  privilegeResourceList: [],
  currentPage: 1,
  pageSize: 11,
  pageTotal: 0
}

const getters = {
}

const mutations = {
  setPrivilegeListMutations (state, payload) {
    state.privilegeList = payload
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
  pushPrivilegeListMutations (state, payload) {
    state.privilegeList.push(payload)
  },
  setPrivilegeResourceListMutations (state, payload) {
    state.privilegeResourceList = []
    payload.forEach((item) => {
      let element = {}
      element.label = item.name
      element.key = item.id
      state.privilegeResourceList.push(element)
    })
  }
}

const actions = {
  /*
   * 给privilegeList添加一组数据
   */
  pushPrivilegeListAction ({commit}, payload) {
    commit('pushPrivilegeListMutations', payload)
  },
  /*
   * 获取权限列表的方法，用户点击分页组件的响应方法
   */
  async getPrivilegeListAction ({commit}, payload) {
    let url = 'rbacPrivilege/listAllPrivilege/' + payload + '/' + state.pageSize
    const res = await http.get(url)
    if (res.data.msg === 'success') {
      commit('setPrivilegeListMutations', res.data.list)
      commit('setPageTotalMutations', res.data.total)
      commit('setCurrentPageMutations', payload)
      return res.data.msg
    } else {
      return res.data.msg
    }
  },
  /*
   * 获取资源列表的方法，用户点击分页组件的响应方法
   */
  async getResourceListKVAction ({commit}) {
    let url = 'rbacResource/listAllResourceKV/'
    const res = await http.get(url)
    if (res.data.msg === 'success') {
      commit('setPrivilegeResourceListMutations', res.data.list)
      return res.data.msg
    } else {
      return res.data.msg
    }
  },
  /*
   * 添加权限的方法
   */
  async addPrivilegeAction ({commit}, payload) {
    const res = await http.post('rbacPrivilege/addRBACPrivilege', payload)
    return res.data
  },
  /*
   * 删除权限的方法
   */
  async deletePrivilegeAction ({commit}, payload) {
    const res = await http.get('rbacPrivilege/deleteRBACPrivilege/' + payload)
    return res.data.msg
  },
  /*
   * 批量删除权限的方法
   */
  async batchDeletePrivilegeAction ({commit}, payload) {
    let ids = payload
    const res = await http.post('rbacPrivilege/batchDeleteRBACPrivilege', ids)
    return res.data.msg
  },
  /*
   * 更新权限的方法
   */
  async updatePrivilegeAction ({commit}, payload) {
    let data = payload
    const res = await http.post('rbacPrivilege/updateRBACPrivilege', data)
    return res.data.msg
  },
  /*
   * 更新时获取权限已绑定资源的方法
   */
  async updatePrivilegeHadResourceAction ({commit}, payload) {
    const res = await http.get('rbacPrivilege/listRBACPRByPrivilegeId/' + payload)
    return res.data
  },
  /*
   * 获取选择资源名称列表
   */
  getResourceNameAction ({state}, payload) {
    if (payload !== []) {
      let array = []
      payload.forEach((k) => {
        state.privilegeResourceList.find(e => {
          if (e.key === k) {
            array.push(e.label)
          }
        })
      })
      return array
    } else {
      return []
    }
  }
}

const modulePrivilege = {
  state: state,
  mutations: mutations,
  actions: actions,
  getter: getters
}

export default modulePrivilege
