import http from '../../assets/js/http'

const state = {
  departmentTree: [],
  departmentUserList: [],
  departmentTotal: 0,
  pageSize: 11,
  duPageTotal: 0,
  duCurrentPage: 1,
  duIsClickNode: false,
  duCurrentDepartmentLevel: 1,
  duCurrentDepartmentItem: null,

  departmentRoleList: []
}

const getters = {
}

const mutations = {
  setDepartmentTreeMutations (state, payload) {
    state.departmentTree = payload
  },
  setDepartmentUserListMutations (state, payload) {
    state.departmentUserList = payload
  },
  setDepartmentTotalMutations (state, payload) {
    state.departmentTotal = payload
  },
  setDuPageTotalMutations (state, payload) {
    state.duPageTotal = payload
  },
  setDuCurrentPageMutations (state, payload) {
    state.duCurrentPage = payload
  },
  setDuCurrentDepartmentLevel (state, payload) {
    state.duCurrentDepartmentLevel = payload
  },
  pushDepartmentUserListMutations (state, payload) {
    if (state.departmentUserList === null) {
      state.departmentUserList = []
    }
    state.departmentUserList.push(payload)
    state.duPageTotal++
  },
  setDepartmentRoleListMutations (state, payload) {
    state.departmentRoleList = []
    payload.forEach((item) => {
      let element = {}
      element.label = item.name
      element.key = item.id
      state.departmentRoleList.push(element)
    })
  }
}

const actions = {
  /*
   * 获取部门树的方法
   */
  async getDepartmentTreeAction ({commit}, payload) {
    let url = 'systemDepartment/listAllDepartment'
    const res = await http.get(url)
    console.log(`request ${url}`)
    console.log(res.data)
    
    if (res.data.msg === 'success') {
      commit('setDepartmentTreeMutations', res.data.list)
      commit('setDepartmentTotalMutations', res.data.total)
      return res.data.msg
    } else {
      return res.data.msg
    }
  },
  /*
   * 获取部门用户的方法，用户点击分页组件的响应方法
   */
  async getDepartmentUserListAction ({commit}, payload) {
    let departmentId = 0
    if (state.duIsClickNode) {
      departmentId = state.duCurrentDepartmentItem.id
    } else {
      departmentId = '111111111111111111111111111111111111'
    }
    let url = 'systemDepartment/listAllUserByDepartmentId/' + departmentId + '/' + payload + '/' + state.pageSize
    const res = await http.get(url)
    if (res.data.msg === 'success') {
      commit('setDepartmentUserListMutations', res.data.list)
      commit('setDuPageTotalMutations', res.data.total)
      commit('setDuCurrentPageMutations', payload)
      return res.data.msg
    } else {
      return res.data.msg
    }
    console.log(payload)
  },
  /*
   * 获取全部用户的方法
   */
  async getAllUserListAction ({commit}, payload) {
    let url = 'systemDepartment/listAllUser/' + payload + '/' + state.pageSize
    const res = await http.get(url)
    if (res.data.msg === 'success') {
      commit('setDepartmentUserListMutations', res.data.list)
      commit('setDuPageTotalMutations', res.data.total)
      commit('setDuCurrentPageMutations', payload)
      return res.data.msg
    } else {
      return res.data.msg
    }
  },
  /*
   * 添加用户的方法
   */
  async addUserByDepartmentIdAction ({commit}, payload) {
    let data = payload
    let url = 'systemDepartment/addUserByDepartmentId'
    const res = await http.post(url, data)
    if (res.data.msg === 'success') {
      return res.data
    } else {
      return res.data
    }
  },
  pushDepartmentUserListAction ({commit}, payload) {
    commit('pushDepartmentUserListMutations', payload)
  },
  /*
   * 删除部门用户的方法
   */
  async deleteDepartmentUserAction ({commit}, payload) {
    const res = await http.get('systemDepartment/deleteDepartmentUser/' + payload)
    return res.data.msg
  },
  /*
   * 批量删除部门用户的方法
   */
  async batchDeleteDepartmentUserAction ({commit}, payload) {
    let ids = payload
    const res = await http.post('systemDepartment/batchDeleteSystemUser', ids)
    return res.data.msg
  },
  /*
   * 获取资源列表的方法，用户点击分页组件的响应方法
   */
  async getRoleListKVAction ({commit}) {
    let url = 'rbacRole/listAllRoleKV/'
    const res = await http.get(url)
    if (res.data.msg === 'success') {
      commit('setDepartmentRoleListMutations', res.data.list)
      return res.data.msg
    } else {
      return res.data.msg
    }
  },
  /*
   * 添加部门的方法
   */
  async addDepartmentAction ({commit}, payload) {
    const res = await http.post('systemDepartment/addSystemDepartment', payload)
    return res.data
  },
  /*
   * 获取父节点和该节点已经分配的角色
   */
  async departmentHadRoleAction ({commit}, payload) {
    const res = await http.post('systemDepartment/listSystemDRByDepartmentId', payload)
    return res.data
  },
  /*
   * 修改部门的方法
   */
  async updateDepartmentAction ({commit}, payload) {
    let data = payload
    const res = await http.post('systemDepartment/updateSystemDepartment', data)
    return res.data.msg
  },
  /*
   * 获取部门角色名称
   */
  async getDepartmentRoles ({commit}, payload) {
    const res = await http.get('systemDepartment/listDepartmentRoles/' + payload)
    return res.data
  }
}

const moduleDepartment = {
  state: state,
  mutations: mutations,
  actions: actions,
  getter: getters
}

export default moduleDepartment
