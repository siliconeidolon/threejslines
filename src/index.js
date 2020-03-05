import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
const main = () => {
  const canvas = document.querySelector("#canvas");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const animation = () => {
    requestAnimationFrame(animation);
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
    renderer.render(scene, camera);
  };

  const scene = new THREE.Scene();

  //Grid
  const gridSize = 10;
  const gridDivisions = 10;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);

  const material1 = new THREE.LineBasicMaterial({
    color: 0xff33cc
  });

  // Helper to create simple lines
  const createLine = (points, material) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.Line(geometry, material));
  };

  // Refactor to generate lines with function

  const curveSections = [
    [
      [new THREE.Vector3(5, 0, 5), new THREE.Vector3(4, 0, 0)],
      [new THREE.Vector3(5, 0, 4), new THREE.Vector3(3, 0, 0)],
      [new THREE.Vector3(5, 0, 3), new THREE.Vector3(2, 0, 0)],
      [new THREE.Vector3(5, 0, 2), new THREE.Vector3(1, 0, 0)],
      [new THREE.Vector3(5, 0, 1), new THREE.Vector3(0, 0, 0)]
    ],
    [
      [new THREE.Vector3(-5, 0, 5), new THREE.Vector3(-4, 0, 0)],
      [new THREE.Vector3(-5, 0, 4), new THREE.Vector3(-3, 0, 0)],
      [new THREE.Vector3(-5, 0, 3), new THREE.Vector3(-2, 0, 0)],
      [new THREE.Vector3(-5, 0, 2), new THREE.Vector3(-1, 0, 0)],
      [new THREE.Vector3(-5, 0, 1), new THREE.Vector3(0, 0, 0)]
    ],
    [
      [new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 0, -1)],
      [new THREE.Vector3(1, 0, 0), new THREE.Vector3(5, 0, -2)],
      [new THREE.Vector3(2, 0, 0), new THREE.Vector3(5, 0, -3)],
      [new THREE.Vector3(3, 0, 0), new THREE.Vector3(5, 0, -4)],
      [new THREE.Vector3(4, 0, 0), new THREE.Vector3(5, 0, -5)]
    ],
    [
      [new THREE.Vector3(-5, 0, -5), new THREE.Vector3(-4, 0, 0)],
      [new THREE.Vector3(-5, 0, -4), new THREE.Vector3(-3, 0, 0)],
      [new THREE.Vector3(-5, 0, -3), new THREE.Vector3(-2, 0, 0)],
      [new THREE.Vector3(-5, 0, -2), new THREE.Vector3(-1, 0, 0)],
      [new THREE.Vector3(-5, 0, -1), new THREE.Vector3(0, 0, 0)]
    ],
    [
      [new THREE.Vector3(0, -5, 0), new THREE.Vector3(1, 0, 0)],
      [new THREE.Vector3(0, -4, 0), new THREE.Vector3(2, 0, 0)],
      [new THREE.Vector3(0, -3, 0), new THREE.Vector3(3, 0, 0)],
      [new THREE.Vector3(0, -2, 0), new THREE.Vector3(4, 0, 0)],
      [new THREE.Vector3(0, -1, 0), new THREE.Vector3(5, 0, 0)]
    ],
    [
      [new THREE.Vector3(0, -5, 0), new THREE.Vector3(-1, 0, 0)],
      [new THREE.Vector3(0, -4, 0), new THREE.Vector3(-2, 0, 0)],
      [new THREE.Vector3(0, -3, 0), new THREE.Vector3(-3, 0, 0)],
      [new THREE.Vector3(0, -2, 0), new THREE.Vector3(-4, 0, 0)],
      [new THREE.Vector3(0, -1, 0), new THREE.Vector3(-5, 0, 0)]
    ],
    [
      [new THREE.Vector3(0, 5, 0), new THREE.Vector3(1, 0, 0)],
      [new THREE.Vector3(0, 4, 0), new THREE.Vector3(2, 0, 0)],
      [new THREE.Vector3(0, 3, 0), new THREE.Vector3(3, 0, 0)],
      [new THREE.Vector3(0, 2, 0), new THREE.Vector3(4, 0, 0)],
      [new THREE.Vector3(0, 1, 0), new THREE.Vector3(5, 0, 0)]
    ],
    [
      [new THREE.Vector3(0, 5, 0), new THREE.Vector3(-1, 0, 0)],
      [new THREE.Vector3(0, 4, 0), new THREE.Vector3(-2, 0, 0)],
      [new THREE.Vector3(0, 3, 0), new THREE.Vector3(-3, 0, 0)],
      [new THREE.Vector3(0, 2, 0), new THREE.Vector3(-4, 0, 0)],
      [new THREE.Vector3(0, 1, 0), new THREE.Vector3(-5, 0, 0)]
    ]
  ];

  curveSections.forEach(section => {
    section.forEach(line => createLine(line, material1));
  });

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  scene.add(gridHelper);
  renderer.render(scene, camera);

  const onWindowResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  animation();
  onWindowResize();

  window.addEventListener("resize", onWindowResize, false);

  animation();
};

main();
