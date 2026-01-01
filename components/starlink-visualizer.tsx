"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3 } from "@/lib/coords";
import { StarlinkSatellite } from "@/types/spacex";

interface SatellitesProps {
  data: StarlinkSatellite[];
  onSelect: (sat: StarlinkSatellite | null) => void;
}

function Satellites({ data, onSelect }: SatellitesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const meshRef2 = useRef<THREE.InstancedMesh>(null!);
  const EARTH_RADIUS = 5;
  const [hoveredInstance, setHoveredInstance] = useState<number | null>(null);

  useCursor(!!hoveredInstance);

  const positions = useMemo(() => {
    return data.map((sat) => 
      latLngToVector3(
        sat.latitude || 0, 
        sat.longitude || 0, 
        sat.height_km || 550, 
        EARTH_RADIUS
      )
    );
  }, [data]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    const tempObject = new THREE.Object3D();
    const tempObject2 = new THREE.Object3D();

    positions.forEach((pos, i) => {
      tempObject.position.set(pos[0], pos[1], pos[2]);
      tempObject2.position.set(pos[0], pos[1], pos[2]);
      
      if (hoveredInstance === i) {
        tempObject2.scale.setScalar(4);
      } else {
        tempObject2.scale.setScalar(1.0);
      }
      
      tempObject.updateMatrix();
      tempObject2.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
      
      meshRef2.current.setMatrixAt(i, tempObject2.matrix);
      
      meshRef2.current.setColorAt(i, new THREE.Color(
        hoveredInstance === i ? "#ffffff" : "#06b6d4"
      ));
    });
    
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
    if (meshRef2.current.instanceColor) {
      meshRef2.current.instanceColor.needsUpdate = true;
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef2.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh
        ref={meshRef2}
        args={[undefined, undefined, data.length]}
      >
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#06b6d4" />
      </instancedMesh>

      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, data.length]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredInstance(e.instanceId!);
        }}
        onPointerOut={() => {
          setHoveredInstance(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          const satIndex = e.instanceId;
          if (satIndex !== undefined && satIndex < data.length) {
            onSelect(data[satIndex]);
          }
        }}
      >
        <sphereGeometry args={[0.1, 8, 8]} attach="geometry" />
        <meshBasicMaterial color="#ff0000" transparent opacity={0} />
      </instancedMesh>
    </>
  );
}

export default function StarlinkVisualizer({ data }: { data: StarlinkSatellite[] }) {
  const [selectedSat, setSelectedSat] = useState<StarlinkSatellite | null>(null);
  console.log('selectedSat', selectedSat);

  return (
    <div className="h-full w-full bg-black rounded-lg border border-zinc-800 relative flex overflow-hidden">
      
      <div className="w-full h-full relative">
        <div className="absolute top-4 left-4 z-10 font-mono pointer-events-none">
          <h2 className="text-cyan-500 text-[10px] tracking-[0.3em] uppercase opacity-70">Orbital Surveillance</h2>
          <p className="text-white text-3xl">GLOBAL_MESH</p>
        </div>
        
        <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
          <color attach="background" args={["#000"]} />
          <ambientLight intensity={1} />
          
          <Sphere args={[5, 64, 64]} onClick={() => setSelectedSat(null)}>
            <meshPhongMaterial color="#050505" emissive="#06b6d4" emissiveIntensity={0.1} wireframe />
          </Sphere>

          <Satellites data={data} onSelect={setSelectedSat} />
          <OrbitControls enablePan={false} minDistance={15} maxDistance={40} />
        </Canvas>
      </div>

      {selectedSat && (
        <div className="absolute w-80 h-full right-0 border-l border-zinc-800 bg-zinc-950/80 backdrop-blur-md p-6 animate-in slide-in-from-right duration-300 z-20 overflow-y-auto">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Satellite Intel</h3>
            <button onClick={() => setSelectedSat(null)} className="text-zinc-500 hover:text-white text-xl">&times;</button>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-mono mb-1">Object Name</p>
              <p className="text-2xl font-bold text-white tracking-tighter uppercase leading-none">
                {selectedSat.spaceTrack.OBJECT_NAME}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border-l border-cyan-500/30 pl-3 py-1">
                <p className="text-[9px] text-zinc-500 uppercase font-mono">Altitude</p>
                <p className="text-lg text-cyan-400 font-mono font-bold">{selectedSat.height_km?.toFixed(1)} <span className="text-[10px]">KM</span></p>
              </div>
              <div className="border-l border-cyan-500/30 pl-3 py-1">
                <p className="text-[9px] text-zinc-500 uppercase font-mono">Velocity</p>
                <p className="text-lg text-zinc-200 font-mono">7.6 <span className="text-[10px]">KM/S</span></p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-900">
               <div className="flex justify-between text-[10px] font-mono">
                 <span className="text-zinc-500 uppercase">Lat / Long</span>
                 <span className="text-zinc-300">{selectedSat.latitude?.toFixed(4)}° / {selectedSat.longitude?.toFixed(4)}°</span>
               </div>
               <div className="flex justify-between text-[10px] font-mono">
                 <span className="text-zinc-500 uppercase">Launch ID</span>
                 <span className="text-zinc-300 truncate ml-4 italic">{selectedSat.launch}</span>
               </div>
               <div className="flex justify-between text-[10px] font-mono">
                 <span className="text-zinc-500 uppercase">Version</span>
                 <span className="text-zinc-300">{selectedSat.version}</span>
               </div>
            </div>

            <div className="bg-cyan-500/5 border border-cyan-500/20 p-4 rounded">
              <p className="text-[9px] text-cyan-500 font-bold uppercase mb-2">SpaceTrack Log</p>
              <p className="text-[10px] text-cyan-200 font-mono leading-relaxed">
                ID: {selectedSat.spaceTrack.NORAD_CAT_ID} <br/>
                TYPE: {selectedSat.spaceTrack.OBJECT_TYPE} <br/>
                STATUS: DEPLOYED_ACTIVE
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}