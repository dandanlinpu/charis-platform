import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

const state = {
  renderer: null,
  camera: null,
  scene: null,
  controls: null,
  light: null,
  webGLDOM: null,
  planeGeometry: null,
  cubeGeometry: null
}

const mutations = {
  getWebGLDOMMutations (state, payload) {
    state.webGLDOM = document.getElementById('WebGL-output')
  },
  /*
   * 初始化渲染器
   */
  initRenderMutations (state, payload) {
    state.renderer = new THREE.WebGLRenderer({antialias: true})
    state.renderer.setSize(1000, 600)
    state.renderer.shadowMap.enabled = true
    state.renderer.shadowMap.type = THREE.PCFSoftShadowMap
  },
  /*
   * 初始化摄像机
   */
  initCameraMutations (state, payload) {
    state.camera = new THREE.PerspectiveCamera(45, 1000 / 600, 0.1, 1000)
    state.camera.position.set(0, 40, 100)
    state.camera.lookAt(new THREE.Vector3(0, 0, 0))
  },
  /*
   * 初始化场景
   */
  initSceneMutations (state, payload) {
    state.scene = new THREE.Scene()
    state.scene.add(new THREE.AmbientLight(0x444444))
  },
  /*
   * 初始化灯光
   */
  initLightMutations (state, payload) {
    state.light = new THREE.PointLight(0xffffff)
    state.light.position.set(15, 30, 10)
    state.light.castShadow = true
    state.scene.add(state.light)
  },
  /*
   * 初始化立方体
   */
  initGeometryMutations (state, payload) {
    state.cubeGeometry = new THREE.CubeGeometry(10, 10, 8)
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ffff})
    let cube = new THREE.Mesh(state.cubeGeometry, cubeMaterial)
    cube.position.x = 25
    cube.position.y = 5
    cube.position.z = -5
    cube.castShadow = true
    state.scene.add(cube)
  },
  /*
   * 初始化场景底部
   */
  initPlaneGeometryMutations (state, payload) {
    state.planeGeometry = new THREE.PlaneGeometry(100, 100)
    let planeMaterial = new THREE.MeshStandardMaterial({color: 0xaaaaaa})
    let plane = new THREE.Mesh(state.planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.y = -0
    plane.receiveShadow = true
    state.scene.add(plane)
  },
  /*
   * 初始化交互插件
   */
  initControls (state, payload) {
    state.controls = new OrbitControls(state.camera, state.renderer.domElement)

    state.controls.enableRotate = true
    // state.controls.enableDamping = true
    // state.controls.dampingFactor = 0.25
    state.controls.enableZoom = true
    state.controls.minDistance = 100
    state.controls.maxDistance = 200
    state.controls.enablePan = true

    // state.controls.addEventListener('change', state.renderer.render(state.scene, state.camera))
  }
}

const actions = {
  initThirdPartyView ({commit}, payload) {
    // var THREE = require('three')

    commit('getWebGLDOMMutations', payload)
    commit('initRenderMutations', payload)
    document.getElementById('WebGL-output').appendChild(state.renderer.domElement)
    commit('initSceneMutations', payload)
    commit('initCameraMutations', payload)
    commit('initLightMutations', payload)
    commit('initGeometryMutations', payload)
    commit('initPlaneGeometryMutations', payload)
    commit('initControls', payload)
    state.renderer.render(state.scene, state.camera)
    this.animate(state)
  },
  animate ({commit}) {
    requestAnimationFrame(this.animate)
    state.controls.update()
    state.renderer.render(state.scene, state.camera)
  }
}

const moduleThirdPartyView = {
  state: state,
  mutations: mutations,
  actions: actions
}

export default moduleThirdPartyView
