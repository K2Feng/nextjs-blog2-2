import React, { useRef } from 'react';
import Head from 'next/head'
import styles from './layoutLogin.module.css'
import utilStyles from '../styles/utils.module.css'
import { bgWrap } from '../styles/styles.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Box from './Box';
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';

const name = '[Feng Liu]'
export const siteTitle = 'Next.js fengliu'

const shadowMaterial = new THREE.ShadowMaterial    ({ color: 'black' });

extend({ OrbitControls })

function Controls() {
  const controls = useRef()
  const { camera, gl } = useThree()
  useFrame(() => controls.current.update())
  return <orbitControls ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
}

const Light = () => {
  //Create a PointLight and turn on shadows for the light
  const light = new THREE.DirectionalLight(0xffffff, 1, 100)
  light.position.set(100, 100, 100)
  light.castShadow = true // default false
  //Set up shadow properties for the light
  light.shadow.radius = 8;
  light.shadow.mapSize.width = 5120 // default
  light.shadow.mapSize.height = 5120 // default
  light.shadow.camera.near = 0.1 // default
  light.shadow.camera.far = 500 // default
  light.shadow.camera.top = -100 // default
  light.shadow.camera.right = 100 // default
  light.shadow.camera.left = -100 // default
  light.shadow.camera.bottom = 100 // default
  return <primitive object={light} />
}
export default function Layout({ children, home }) {
  return (
    <div>
    <div className={bgWrap} style={{background: "gray"}}>
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
                shadowMap
                antialias
                camera={{ position: [-5, 10, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <Light />
          <Box castShadow/>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow material={shadowMaterial}>
              <planeBufferGeometry attach="geometry" args={[200, 200]} />
          </mesh>
          <Controls />
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
