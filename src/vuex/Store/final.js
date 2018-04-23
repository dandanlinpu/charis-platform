import * as THREE from 'three'

const state = {
  count: 1
}

const mutations = {
  add (state) {
    state.count += 1
  },
  reduce (state) {
    state.count -= 1
  }
}

const actions = {
  drawScene () {
    // 创建一个场景
    var scene = new THREE.Scene()

    let fov = 40
    let near = 1
    let far = 1000
    var camera = new THREE.PerspectiveCamera(fov, 700 / 500, 0.01, 700)

    // 设置摄像机的位置，并让其指向场景的中心（0,0,0）
    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.fov = fov
    camera.updateProjectionMatrix()
    camera.lookAt(scene.position)

    scene.add(camera)
    /*
    我们需要一个元素来画场景，这里定义一个renderer，并且给HTML元素webglviewer声明一个变量
    */
    var renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setClearColor(new THREE.Color(0xEEEEEE))
    renderer.setSize(700, 500)

    // 场景中添加坐标轴
    var axes = new THREE.AxisHelper(20)
    scene.add(axes)

    // 创建一个平面
    var planeGeometry = new THREE.PlaneGeometry(60, 20)

    // 平面使用颜色为0xcccccc的基本材质
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc})
    var plane = new THREE.Mesh(planeGeometry, planeMaterial)

    // 设置屏幕的位置和旋转角度
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    scene.add(plane)

    // 创建一个立方体
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    // 将线框（wireframe）属性设置为true，这样物体就不会被渲染为实物物体
    var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // 设置立方体的位置
    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0

    cube.rotation.x += 0.1
    cube.rotation.y += 0.1

    // 将立方体添加到场景中
    scene.add(cube)

    // 创建一个球体
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    // 将线框（wireframe）属性设置为true，这样物体就不会被渲染为实物物体
    var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true})
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    // 设置球体的位置
    sphere.position.x = 20
    sphere.position.y = 4
    sphere.position.z = 2

    // 将球体添加到场景中
    scene.add(sphere)

    // 将渲染的结果输出到指定页面元素中
    var element = document.getElementById('WebGL-output')
    element.appendChild(renderer.domElement)
    element.addEventListener('mousewheel', mousewheel, false)

    // 鼠标滑轮
    function mousewheel (e) {
      e.preventDefault()
      // e.stopPropagation();
      if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
          fov -= (near < fov ? 1 : 0)
        }
        if (e.wheelDelta < 0) {
          fov += (fov < far ? 1 : 0)
        }
      } else if (e.detail) {
        if (e.detail > 0) {
          fov -= 1
        }
        if (e.detail < 0) {
          fov += 1
        }
      }
      camera.fov = fov
      camera.updateProjectionMatrix()

      // var controls = new THREE.OrbitControls(camera, renderer.domElement)
      // controls.minDistance = 50
      // controls.maxDistance = 200
      //
      // scene.add(controls)
      renderer.render(scene, camera)
    }
    // 渲染场景

    renderer.render(scene, camera)
  }
}

const moduleFinal = {
  state: state,
  mutations: mutations,
  actions: actions
}

export default moduleFinal
