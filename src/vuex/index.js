import Vue from 'vue'
import Vuex from 'vuex'
import resource from './Store/Resource'
import role from './Store/Role'
import privilege from './Store/Privilege'
import department from './Store/Department'
import final from './Store/final'
import codesource from './Store/Codesource'
import ThirdPartyView from './Store/ThirdPartyView'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    resource: resource,
    privilege: privilege,
    final: final,
    role: role,
    department: department,
    codesource: codesource,
    ThirdPartyView: ThirdPartyView
  }
})
