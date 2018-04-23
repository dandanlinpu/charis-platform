// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import store from './vuex'
import ElementUI from 'element-ui'
import '@/assets/css/element-#E95420/index.css'
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import ECharts from 'vue-echarts/components/ECharts'
import * as THREE from 'three'
import * as TWEEN from 'tween'
import OrbitControls from 'three-orbitcontrols'
import Home from './components/Home.vue'
import './mock'

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.component('icon', Icon)
Vue.component('chart', ECharts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  Icon,
  THREE,
  TWEEN,
  OrbitControls,
  render: h => h(Home)
})

