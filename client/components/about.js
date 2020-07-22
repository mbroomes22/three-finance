import ReactDOM from 'react-dom'
import React, {useRef, useState} from 'react'
import {Canvas, useFrame} from 'react-three-fiber'

const Box = props => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <torusGeometry attach="geometry" args={[1, 0.2, 16, 100]} />
      <meshPhongMaterial
        attach="material"
        color={hovered ? '#228dff' : 'rgb(134, 154, 199, 0.8)'}
        reflectivity={0.5}
      />
    </mesh>
  )
}

function About() {
  return (
    <>
      <Canvas className="intro">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-2.5, 0, 0]} />
        <Box position={[0, 0, 0]} />
        <Box position={[2.5, 0, 0]} />
      </Canvas>
    </>
  )
}

export default About
