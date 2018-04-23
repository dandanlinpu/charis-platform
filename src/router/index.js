import Vue from 'vue'
import Router from 'vue-router'
import Resource from '@/components/SystemManage/Resource.vue'
import Role from '@/components/SystemManage/Role.vue'
import Privilege from '@/components/SystemManage/Privilege.vue'
import Department from '@/components/SystemManage/Department.vue'
import final from '@/components/final/final.vue'
import Codesource from '@/components/Codesource/Codesource.vue'
import SystemManage from '@/components/SystemManage/SystemManage'
import OAMManage from '@/components/OAMManage/OAMManage'
import WN from '@/components/OAMManage/WN.vue'
import ThirdPartyView from '@/components/OAMManage/ThirdPartyView.vue'
import Login from '@/components/LoginManage/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/SystemManage/Resource',
    //   name: 'system-manage'
    //  component:''
    // },
    {
      path: '/SystemManage',
      name: 'system-manage',
      component: SystemManage,
      redirect: '/SystemManage/Department',
      children: [
        {
          path: '/SystemManage/Resource',
          name: 'system-resource',
          component: Resource
        },
        {
          path: '/SystemManage/Privilege',
          name: 'system-privilege',
          component: Privilege
        },
        {
          path: '/SystemManage/Role',
          name: 'system-role',
          component: Role
        },
        {
          path: '/SystemManage/Department',
          name: 'system-department',
          component: Department
        }
      ]
    },
    {
      path: '/OAMManage',
      name: 'oam-manage',
      component: OAMManage,
      redirect: '/OAMManage/WN',
      children: [
        {
          path: '/OAMManage/WN',
          name: 'oam-wn',
          component: WN
        },
        {
          path: '/OAMManage/ThirdPartyView',
          name: 'thirdPartyView',
          component: ThirdPartyView
        },
        {
          path: '/SystemManage/Privilege',
          name: 'system-privilege',
          component: Privilege
        },
        {
          path: '/SystemManage/Role',
          name: 'system-role',
          component: Role
        },
        {
          path: '/SystemManage/Department',
          name: 'system-department',
          component: Department
        }
      ]
    },
    {
      path: '/LoginManage/Login',
      component: Login
    },
    {
      path: '/final',
      component: final
    },
    {
      path: '/Codesource',
      component: Codesource
    }
  ]
})
