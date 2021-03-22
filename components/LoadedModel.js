import React, { useRef } from 'react';
import { useFrame, useLoader } from 'react-three-fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const LoadedModel = (props) => {
  const { nodes } = useLoader(
    GLTFLoader,
    "/headless.glb",
  )
  const group = useRef()
  useFrame(() => (group.current.rotation.x = group.current.rotation.y = group.current.rotation.z += 0.01))
  return (
    <mesh receiveShadow castShadow ref={group} geometry={nodes.Cube.geometry} dispose={null}>
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  )
}

export default LoadedModel;
