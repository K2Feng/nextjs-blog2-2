import React, { Suspense, useRef } from 'react';
import Head from 'next/head'
import styles from './layoutLogin.module.css'
import utilStyles from '../styles/utils.module.css'
import { bgWrap } from '../styles/styles.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';
import { useLoader } from 'react-three-fiber'
//import { useGLTF } from '@react-three/drei/core/useGLTF'
//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import LoadedModel from './LoadedModel.js';
import ThreeGroup from './threeGroup.js';

const name = '[Feng Liu]'
export const siteTitle = 'Next.js fengliu'

const shadowMaterial = new THREE.ShadowMaterial({ color: 0x606060});

extend({ OrbitControls })

function Controls() {
  const controls = useRef()
  const { camera, gl } = useThree()
  useFrame(() => controls.current.update())
  return <orbitControls ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
}

//const Light = () => {
//  //Create a PointLight and turn on shadows for the light
//  const light = new THREE.DirectionalLight(0xffffff, 1, 100)
//  light.position.set(25, 50, 25 )
//  light.castShadow = true // default false
//  //Set up shadow properties for the light
//  light.shadow.radius = 8;
//  light.shadow.mapSize.width = 1024 // default
//  light.shadow.mapSize.height = 1024 // default
//  light.shadow.camera.top = 100 // default
//  light.shadow.camera.right = 100 // default
//  light.shadow.camera.left = -100 // default
//  light.shadow.camera.bottom = -100 // default
//  return <primitive object={light} />
//}

const Lights = () => {
  return (
    <group>
      <ambientLight intensity={0.5}/>
      <pointLight intensity={0.15}/>
      <directionalLight
        castShadow
        intensity={1}
        angle={Math.PI / 16}
        position={[10, 10, 10]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-top={100}
        shadow-camera-right={100}
        shadow-camera-left={-100}
        shadow-camera-bottom={-100}
        shadow-radius={8}
      />
    </group>
  );
};

export default function Layout({ children, home }) {

//const gltf = useLoader(
//    GLTFLoader,
//    "/DevelobearDraco.gltf",
//    loader => {
//      const dracoLoader = new DRACOLoader();
//      dracoLoader.setDecoderPath("/draco-gltf/");
//      loader.setDRACOLoader(dracoLoader);
//    }
//  );
//
//const Model = (props) => {
//  const { nodes, materials } = useGLTF('/model.gltf')
//  return (
//    <group {...props} dispose={null}>
//      <group name="Camera" position={[10, 0, 50]} rotation={[Math.PI / 2, 0, 0]}>
//        <primitive object={nodes.Camera_Orientation} />
//      </group>
//      <group name="Sun" position={[100, 50, 100]} rotation={[-Math.PI / 2, 0, 0]}>
//        <primitive object={nodes.Sun_Orientation} />
//      </group>
//      <group name="Cube">
//        <mesh material={materials.base} geometry={nodes.Cube_003_0.geometry} />
//        <mesh material={materials.inner} geometry={nodes.Cube_003_1.geometry} />
//      </group>
//    </group>
//  )
//}
//
//useGLTF.preload('/model.gltf')

  return (
    <div>
    <div className={bgWrap} style={{background: "#f0f0f0"}}>
    </div>
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      <div className={styles.itemRight}>
        <Canvas colorManagement
                camera={{ position: [-5, 10, 10], fov: 60 }}
                onCreated={({ gl }) => {
                  gl.shadowMap.enabled = true;
                  gl.shadowMap.soft = true;
                  gl.shadowMap.type = THREE.PCFSoftShadowMap;
                  gl.setClearColor( 0x000000, 0 );
                  gl.alpha = false;
                  console.log(gl);
                }} >

          <Lights />
          <ThreeGroup castShadow/>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow material={shadowMaterial}>
              <boxBufferGeometry attach="geometry" args={[200, 200, 0.1]} />
          </mesh>
          <Suspense fallback={null}>
            <LoadedModel />
          </Suspense>
        </Canvas>
      </div>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
    </div>
  )
}
