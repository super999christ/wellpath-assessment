import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

import { dummyWellPad, dummyWellProfile } from "../data/wellPath";

function WellPath(props: {path: any, wellpad: [number, number, number]}) {
  const { path } = props;
  console.log("path", path);

  const mesh = useRef();
  const tubeRef = useRef();

  const [curve] = useState(() => {
    // Create an empty array to stores the points
    let points = [];

    // Define points along Z axis
    for (const point of path) {
      points.push(
        new THREE.Vector3(
          point[0] + props.wellpad[0],
          point[1] + props.wellpad[1],
          -point[2] + props.wellpad[2] // vertical depth +ve but in scene needs to be -ve on Z,
        )
      );
    }

    return new THREE.CatmullRomCurve3(points);
  });

  return (
    <mesh {...props} ref={mesh} scale={1}>
      {/* {geometry} */}
      <tubeGeometry ref={tubeRef} args={[curve, path.length, 5, 10, false]} />

      <meshBasicMaterial />
    </mesh>
  );
}

function exampleLineCalc(dataPoint: [number, number, number, number]) {
  // illustrates changing the line plot in threejs render loop
  const [x, y, z, density] = dataPoint;
  const calcedPos = [x, y + Math.random() * 10 + density * 20, -z]; // randomly create a new point
  const calcedVector = new THREE.Vector3(...calcedPos);
  return calcedVector;
}

function LineGraph(props: {wellpad: [number, number, number], path: [number, number, number][]}) {
  const lithoTubeRadius = 5; //radius of the plotted well path (0 axis for lineplot)

  const wellPadLoc = new THREE.Vector3(...props.wellpad);

  const { camera } = useThree(); // reference to the threejs camera

  // access camera position
  const currentPosition = camera.position;

  // access camera rotation (rotation is euclidean)
  const currentRotation = camera.rotation;

  // you can find documentation of working with vectors in Three.js here
  // https://threejs.org/docs/#api/en/math/Vector3

  // this initialises a line in the scene
  var points = props.path.map((point: any) => exampleLineCalc(point));
  console.log("points", points);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  // this allows us to change the line on each render frame.
  useFrame(() => {
    const density = 0 
    for (let i = 0; i < points.length; i++) {
      const pos = exampleLineCalc([...props.path[i], density])
      points[i].copy(pos);
    }
    lineGeometry.setFromPoints(points); // update the line with new points
  });

  return (
    <mesh {...props}>
      {/* @ts-ignore */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors={false}
          color={"#FFDA29"}
          attach={"material"}
        />
      </line>
    </mesh>
  );
}

function WellProfile() {

  // Some dummy data for the well. This should be replaced with real data from the csv.
  const data = {
    wellPad: dummyWellPad,
    wellPath: dummyWellProfile,
    wellName: "Dummy Well"
  }
  const camera = useRef();

  // reference for total well depth to use in scene setup
  const wellTD = data.wellPath.at(-1)?.[2] || 500


  // orientate axis with +Z up
  THREE.Object3D.DefaultUp.set(0, 0, 1);

  return (
    <>
      <div>
        {data ? (
          <Canvas
            className="wellprofile-canvas"
            frameloop="demand"
            camera={{
              far: 5000,
              position: [0, -1.5 * wellTD, -60],
              ref: camera,
            }}
          >
            <ambientLight />
            <pointLight position={[1000, 1000, 1000]} />
            <gridHelper
              args={[1000, 25]}
              position={[0, 0, -wellTD - 20]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            <OrbitControls enablePan={true} />

            <WellPath path={data.wellPath} wellpad={data.wellPad} />
            <LineGraph path={data.wellPath.map((point) => [point[0], point[1], point[2]])} wellpad={data.wellPad} />
          </Canvas>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </>
  );
}

export default WellProfile;
