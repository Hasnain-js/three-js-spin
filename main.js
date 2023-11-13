import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from 'gsap';
import '/style.css'

// Create a scene
const scene = new THREE.Scene();



// Create our sphere

const geometry = new THREE.SphereGeometry(3, 100, 100);
const material = new THREE.MeshStandardMaterial({
  color: "#F6F1D5",
  roughness: 0.5
})

const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh)

// Sizes
const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

// lighting
const light = new THREE.PointLight(0xffffff, 600, 100)
light.position.set(0, 10, 10)
scene.add(light)
// Camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)


// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom= false
controls.autoRotate = true
controls.autoRotateSpeed = 5

// Resizing
window.addEventListener('resize', () => {
  // Update size
  size.width = window.innerWidth
  size.height = window.innerHeight

  // Update camera
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width, size.height)
})

const reRender = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(reRender)
}
reRender()


// Timeline animation renderer

const timeLine = gsap.timeline({ defaults: { duration: 1}})
timeLine.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1})
timeLine.fromTo("nav", {y: '-100%'}, {y: '0%'})
timeLine.fromTo(".title", {opacity: 0}, {opacity: 1})

// Mouse animation colors
let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = true))

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / size.width) * 255),
      Math.round((e.pageY / size.height) * 255),
      150,
    ]
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
  }
})
