import React, { createRef, Suspense, useRef, useState } from "react";
// import { Canvas } from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  TrackballControls,
  useGLTF,
} from "@react-three/drei";
import { Group } from "three";
import * as THREE from "three/src/Three";
// import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, Canvas } from "@react-three/fiber";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Spin } from "antd";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const group = createRef<Group>();
  // @ts-ignore
  const controls = createRef<OrbitControls>();
  const data = useGLTF("/scene.gltf");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Canvas
        style={{
          height: "100vh",
          // marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        shadows
        dpr={[1, 2]}
        frameloop="demand"
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 10, 20] }}
      >
        <Suspense
          fallback={
            <div>
              <Spin size="large" tip="Loading..." />
            </div>
          }
        >
          <Center position={[5, 5, 10]}>
            <ambientLight intensity={0.5} />
            <spotLight
              intensity={0.9}
              angle={1.0}
              penumbra={0}
              position={[-25, 1, 25]}
              castShadow
            />

            <directionalLight intensity={0.9} position={[-25, 1, 25]} />

            <group
              ref={group}
              {...props}
              dispose={null}
              scale={[0.12, 0.12, 0.12]}
            >
              <primitive
                object={data.scene}
                position={[-15, 1, 17]}
                scale={0.04}
              />
            </group>

            <OrbitControls makeDefault autoRotate ref={controls} />
          </Center>
        </Suspense>
      </Canvas>
    </div>
  );
};
