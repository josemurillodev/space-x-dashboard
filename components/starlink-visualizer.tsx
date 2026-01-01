"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/coords";
import { StarlinkSatellite } from "@/types/spacex";

function Satellites({ data }: { data: StarlinkSatellite[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const EARTH_RADIUS = 5;

  // Pre-calculate positions
  const positions = useMemo(() => {
    return data.map((sat) => 
      latLngToVector3(sat.latitude || 0, sat.longitude || 0, sat.height_km || 550, EARTH_RADIUS)
    );
  }, [data]);

  useFrame(() => {
    const tempObject = new THREE.Object3D();
    positions.forEach((pos, i) => {
      tempObject.position.set(...pos);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, data.length]}>
      <sphereGeometry args={[0.015, 8, 8]} />
      <meshBasicMaterial color="#06b6d4" />
    </instancedMesh>
  );
}

export default function StarlinkVisualizer({ data }: { data: StarlinkSatellite[] }) {
  return (
    <div className="h-[600px] w-full bg-black rounded-lg border border-zinc-800 relative">
      <div className="absolute top-4 left-4 z-10 font-mono">
        <h2 className="text-cyan-500 text-xs tracking-widest uppercase">Global Satellite Network</h2>
        <p className="text-white text-2xl font-bold">{data.length} ACTIVE NODES</p>
      </div>
      
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} className="rounded-xl">
        <color attach="background" args={["#000"]} />
        {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
        {/* <ambientLight intensity={0.5} /> */}
        
        {/* The Earth */}
        <Sphere args={[5, 32, 32]}>
          <meshPhongMaterial 
            color="#111" 
            emissive="#06b6d4" 
            emissiveIntensity={0.05} 
            wireframe 
          />
        </Sphere>

        <Satellites data={data} />
        <OrbitControls enablePan={false} minDistance={7} maxDistance={30} />
      </Canvas>
    </div>
  );
}