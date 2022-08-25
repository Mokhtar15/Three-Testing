import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {

  starsTexture = '../assets/stars.jpg';
  sunTexture = '../assets/sun.jpg';
  mercuryTexture = '../assets/mercury.jpg';
  venusTexture = '../assets/venus.jpg';
  earthTexture = '../assets/earth.jpg';
  marsTexture = '../assets/mars.jpg';
  jupiterTexture = '../assets/jupiter.jpg';
  saturnTexture = '../assets/saturn.jpg';
  saturnRingTexture = '../assets/saturn ring.png';
  uranusTexture = '../assets/uranus.jpg';
  uranusRingTexture = '../assets/uranus ring.png';
  neptuneTexture = '../assets/neptune.jpg';
  plutpTexture = '../assets/pluto.jpg';

  ngOnInit() {
    this.outerSpace();
    // this.testingThreeJS();
  }

  outerSpace() {
    // generate WebGLRenderer and scene
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // generate oribit and the camera view
    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(-90, 140, 140);
    orbit.update();

    // generate ambientLight and light color
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // generate CubeTextureLoader with the background img
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
      this.starsTexture,
      this.starsTexture,
      this.starsTexture,
      this.starsTexture,
      this.starsTexture,
      this.starsTexture,
    ]);

    const textureLoader = new THREE.TextureLoader();

    // generate 3D Sphere with the sun img
    const sunGeo = new THREE.SphereGeometry(20, 30, 30);
    const sunMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(this.sunTexture)
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // function createPlanete to generate all planetes
    function createPlanete(size: any, texture: any, position: any, ring: any) {
      const geo = new THREE.SphereGeometry(size , 30, 30);
      const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
      });
      const mesh = new THREE.Mesh(geo, mat);
      const obj = new THREE.Object3D();
      obj.add(mesh);
      if(ring) {
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
        const ringMat = new THREE.MeshBasicMaterial({
          map: textureLoader.load(ring.texture),
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
      }
      scene.add(obj);
      mesh.position.x = position;
      return { mesh, obj }
    }

    // generate 3D Sphere with the mercury img
    const mercury = createPlanete(3, this.mercuryTexture, 30, false);

    // generate 3D Sphere with the venus img
    const venus = createPlanete(6, this.venusTexture, 46, false);

    // generate 3D Sphere with the earth img
    const earth = createPlanete(9, this.earthTexture, 70, false);

    // generate 3D Sphere with the mars img
    const mars = createPlanete(12, this.marsTexture, 100, false);

    // generate 3D Sphere with the jupiter img
    const jupiter = createPlanete(15, this.jupiterTexture, 142, false);

    // generate 3D Sphere with the saturn img & ring
    const saturn = createPlanete(18, this.saturnTexture, 200, {
      innerRadius: 22,
      outerRadius: 32,
      texture: this.saturnRingTexture
    });

    // generate 3D Sphere with the saturn img & ring
    const uranus = createPlanete(20, this.uranusTexture, 275, {
      innerRadius: 22,
      outerRadius: 32,
      texture: this.uranusRingTexture
    });

    // generate 3D Sphere with the neptune img
    const neptune = createPlanete(20, this.neptuneTexture, 340, false);

    // generate 3D Sphere with the pluto img
    const pluto = createPlanete(3, this.plutpTexture, 380, false);

    // create pointLight

    const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
    scene.add(pointLight)

    // generate animation
    function animate() {
      // self rotation
      sun.rotateY(0.004);
      mercury.mesh.rotateY(0.004);
      venus.mesh.rotateY(0.002);
      earth.mesh.rotateY(0.02);
      mars.mesh.rotateY(0.018);
      jupiter.mesh.rotateY(0.04);
      saturn.mesh.rotateY(0.038);
      uranus.mesh.rotateY(0.03);
      neptune.mesh.rotateY(0.032);
      pluto.mesh.rotateY(0.008);

      // around sun rotation
      mercury.obj.rotateY(0.04);
      venus.obj.rotateY(0.02);
      earth.obj.rotateY(0.010);
      mars.obj.rotateY(0.008);
      jupiter.obj.rotateY(0.006);
      saturn.obj.rotateY(0.004);
      uranus.obj.rotateY(0.002);
      neptune.obj.rotateY(0.0010);
      pluto.obj.rotateY(0.0008);
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    // gsap.fromTo(scene.position, {z: 500, delay: 2}, {duration: 2, z: 0})

    // make window resize with change of width & height
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight)
    })

    orbit.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
    }
  }

  testingThreeJS() {
    // generate WebGLRenderer and scene
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // generate oribit and the camera view
    const orbit = new OrbitControls(camera, renderer.domElement);

    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    camera.position.set(-10, 30, 30);
    orbit.update();

    // generate 3D Box
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    // generate 3D Plane
    const planeGeometry = new THREE.PlaneGeometry(30, 30);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;

    // generate 3D Sphere
    const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000FF, wireframe: false });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphere.position.set(-10, 10, 0);
    sphere.castShadow = true;

    // generate Lights
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
    // scene.add(directionalLight);
    // directionalLight.position.set(-30, 50, 0);
    // directionalLight.castShadow = true;
    // directionalLight.shadow.camera.bottom = -12;

    // const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
    // scene.add(dLightHelper);

    //  generate spotLights
    const spotLight = new THREE.SpotLight(0xFFFFFF);
    scene.add(spotLight);
    spotLight.position.set(-100, 100, 0);
    spotLight.castShadow = true;
    spotLight.angle = 0.2;

    // generate animation
    let step = 0;
    let speed = 0.01;

    function animate() {
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      step += speed;
      sphere.position.y = 10 * Math.abs(Math.sin(step))
      renderer.render(scene, camera)
    };

    renderer.setAnimationLoop(animate);
  }
}
