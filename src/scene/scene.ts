// Integrantes: Victor Cavalcante, Marcos Vinícius e Leonardo Evangelista

import {
  Scene,
  AxesHelper,
  AmbientLight,
  DirectionalLight,
  Mesh,
  SphereGeometry,
  MeshToonMaterial,
  PlaneGeometry,
  Color,
	MeshLambertMaterial,
  TorusGeometry,
  Group,
  CylinderGeometry,
} from "three"
import { renderer, updateRenderer } from "/src/core/renderer"

import { gui } from "/src/core/gui"

export const scene = new Scene()

// Axes Helper
const axesHelper = new AxesHelper(0.5)
scene.add(axesHelper)

gui.addInput(axesHelper, "visible", {
  label: "AxesHelper",
})

const ambientLight = new AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new DirectionalLight("#ffffff", 2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 500
directionalLight.shadow.normalBias = 0.5
directionalLight.position.set(0.25, 2, 2.25)

scene.add(directionalLight)

const PARAMS = {
  color: "#5EDCAE",
}




const sphere = new Mesh(
  new SphereGeometry(0.75, 32, 32),
  new MeshLambertMaterial({
    color: "#B21414",
    wireframe: false,
  })
)


sphere.position.set(0, 2, 0)
sphere.castShadow = true

const directionalLightCtrls = gui.addFolder({
	title: "Luz Direcional",
})

directionalLightCtrls.addInput(directionalLight.position, "x", {
	label: "dir x",
	min: -10,
	max: 10,
	step: 0.1,
})

directionalLightCtrls.addInput(directionalLight.position, "y", {
	label: "dir y",
	min: -10,
	max: 10,
	step: 0.1,
})

directionalLightCtrls.addInput(directionalLight.position, "z", {
	label: "dir z",
	min: -10,
	max: 10,
	step: 0.1,
})


const sphereCtrls = gui.addFolder({
  title: "Sphere",
})

sphereCtrls.addInput(sphere.position, "x", {
  label: "pos x",
  min: -10,
  max: 10,
  step: 0.1,
})
sphereCtrls.addInput(sphere.position, "y", {
  label: "pos y",
  min: -10,
  max: 10,
  step: 0.1,
})
sphereCtrls.addInput(sphere.position, "z", {
  label: "pos z",
  min: -10,
  max: 10,
  step: 0.1,
})
sphereCtrls.addInput(PARAMS, "color").on("change", (e) => {
  sphere.material.color = new Color(e.value)
})

sphereCtrls.addInput(sphere.material, "wireframe")

scene.add(sphere)

const plane = new Mesh(
  new PlaneGeometry(10, 10, 10, 10),
  new MeshToonMaterial({
    color: new Color("#444"),
  })
)

plane.receiveShadow = true
plane.rotation.set(-Math.PI / 2, 0, 0)
scene.add(plane)

const ring = new Mesh(
  new TorusGeometry(8, 1, 8, 50),
  new MeshLambertMaterial({
    color: new Color("#AF0402"),
  })
)

const stick = new Mesh(
  new CylinderGeometry(0.3, 0.3, 8, 10),
  new MeshLambertMaterial({
    color: new Color("#FFFF"),
  })
)

scene.add(stick)

stick.scale.set(0.5,0.46,0.5)
stick.position.set(0,1.79,-0.4)
stick.rotation.set(3.40,0,0)

stick.castShadow = true

scene.add(ring)
ring.scale.set(0.1,0.1,0.1)
ring.position.set(0,2,0)
ring.rotation.set(5,0,0)

ring.castShadow = true

const lolipop_head = new Group();

lolipop_head.add(sphere,ring)

scene.add(lolipop_head)



lolipop_head.position.set(0,1,0)

const lolipop_full = new Group();

lolipop_full.add(lolipop_head,stick)

scene.add(lolipop_full)

lolipop_full.position.set(0,0,0)



export function updateScene() {
  updateRenderer()
}
