import http from '../../assets/js/http'

const state = {
  roleList: [],
  rolePrivilegeList: [],
  currentPage: 1,
  pageSize: 11,
  pageTotal: 0
}

const getters = {
}

const mutations = {
  setRoleListMutations (state, payload) {
    state.roleList = payload
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
  pushRoleListMutations (state, payload) {
    state.roleList.push(payload)
  },
  setRolePrivilegeListMutations (state, payload) {
    state.rolePrivilegeList = []
    payload.forEach((item) => {
      let element = {}
      element.label = item.name
      element.key = item.id
      state.rolePrivilegeList.push(element)
    })
  }
}

const actions = {
  /*
   * 给roleList添加一组数据
   */
  pushRoleListAction ({commit}, payload) {
    commit('pushRoleListMutations', payload)
  },
  /*
   * 获取角色列表的方法，用户点击分页组件的响应方法
   */
  async getRoleListAction ({commit}, payload) {
    let url = 'rbacRole/listAllRole/' + payload + '/' + state.pageSize
    const res = await http.get(url)
    if (res.data.msg === 'success') {
      commit('setRoleListMutations', res.data.list)
      commit('setPageTotalMutations', res.data.total)
      commit('setCurrentPageMutations', payload)
      return res.data.msg
    } else {
      return res.data.msg
    }
  },
  /*
   * 获取角色列表的方法，用户点击分页组件的响应方法
   */
  async getPrivilegeListKVAction ({commit}) {
    let url = 'rbacPrivilege/listAllPrivilegeKV/'
    const res = await http.get(url)
    if (res.data.msg === 'success') {
      commit('setRolePrivilegeListMutations', res.data.list)
      return res.data.msg
    } else {
      return res.data.msg
    }
  },
  /*
   * 添加角色的方法
   */
  async addRoleAction ({commit}, payload) {
    const res = await http.post('rbacRole/addRBACRole', payload)
    return res.data
  },
  /*
   * 删除角色的方法
   */
  async deleteRoleAction ({commit}, payload) {
    const res = await http.get('rbacRole/deleteRBACRole/' + payload)
    return res.data.msg
  },
  /*
   * 批量删除角色的方法
   */
  async batchDeleteRoleAction ({commit}, payload) {
    let ids = payload
    const res = await http.post('rbacRole/batchDeleteRBACRole', ids)
    return res.data.msg
  },
  /*
   * 更新角色的方法
   */
  async updateRoleAction ({commit}, payload) {
    let data = payload
    const res = await http.post('rbacRole/updateRBACRole', data)
    return res.data.msg
  },
  /*
   * 更新时获取角色已绑定权限的方法
   */
  async updateRoleHadPrivilegeAction ({commit}, payload) {
    const res = await http.get('rbacRole/listRBACRPByRoleId/' + payload)
    return res.data
  },
  /*
   * 获取选择资源名称列表
   */
  getPrivilegeNameAction ({state}, payload) {
    if (payload !== []) {
      let array = []
      payload.forEach((k) => {
        state.rolePrivilegeList.find(e => {
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

const moduleRole = {
  state: state,
  mutations: mutations,
  actions: actions,
  getter: getters
}

export default moduleRole
