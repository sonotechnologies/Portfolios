"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import type { Line2, LineSegments2 } from "three-stdlib";
import { heroParts, type PartConfig } from "./part-config";

const ANNOTATION = "#7E8B93";
const HAZARD = "#FF5B04";
// Brighter than the CSS "edge" token (#23252A) — against a near-black
// scene background that token reads as invisible, and the blueprint look
// depends on the outlines actually being legible.
const EDGE = "#7E8B93";

/** Leader lines retract into their part by 60% scroll progress, per the brief's hero motion note. */
const RETRACT_BY = 0.6;

function lerpV3(out: THREE.Vector3, a: [number, number, number], b: [number, number, number], t: number) {
  out.set(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t);
  return out;
}

function Part({ part, progressRef }: { part: PartConfig; progressRef: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<Line2 | LineSegments2>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const basePos = useRef(new THREE.Vector3()).current;
  const labelAnchor = useMemo(
    () =>
      new THREE.Vector3(
        part.exploded[0] + part.labelOffset[0],
        part.exploded[1] + part.labelOffset[1],
        part.exploded[2] + part.labelOffset[2],
      ),
    [part],
  );
  const lineStart = useRef(new THREE.Vector3()).current;
  const lineEnd = useRef(new THREE.Vector3()).current;

  useFrame(({ clock }) => {
    const progress = progressRef.current ?? 0;
    lerpV3(basePos, part.exploded, part.assembled, progress);

    // idle float fades out as the part locks into place
    const floatAmount = 1 - progress;
    const t = clock.elapsedTime;
    const seed = (part.exploded[0] + part.exploded[1]) * 3.7;
    const floatY = Math.sin(t * 0.6 + seed) * 0.06 * floatAmount;
    const floatX = Math.cos(t * 0.4 + seed) * 0.04 * floatAmount;

    if (meshRef.current) {
      meshRef.current.position.set(basePos.x + floatX, basePos.y + floatY, basePos.z);
      meshRef.current.rotation.y = Math.sin(t * 0.3 + seed) * 0.08 * floatAmount;
    }

    // leader line retracts toward the part, then disappears
    const retract = Math.min(progress / RETRACT_BY, 1);
    lerpV3(lineStart, [labelAnchor.x, labelAnchor.y, labelAnchor.z], [basePos.x, basePos.y, basePos.z], retract);
    lineEnd.set(basePos.x + floatX, basePos.y + floatY, basePos.z);
    lineRef.current?.geometry.setPositions([
      lineStart.x,
      lineStart.y,
      lineStart.z,
      lineEnd.x,
      lineEnd.y,
      lineEnd.z,
    ]);

    if (htmlRef.current) {
      htmlRef.current.style.opacity = String(Math.max(0, 1 - progress / RETRACT_BY));
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={part.exploded}>
        {part.kind === "cylinder" ? (
          <cylinderGeometry args={[part.size[0], part.size[0], part.size[1], 24]} />
        ) : part.kind === "cursor" ? (
          <coneGeometry args={[part.size[0], part.size[1], 4]} />
        ) : (
          <boxGeometry args={part.size} />
        )}
        <meshBasicMaterial color={part.color} transparent opacity={0.94} />
        <Edges color={part.hazard ? HAZARD : EDGE} />
      </mesh>

      <Line
        ref={lineRef}
        points={[
          [0, 0, 0],
          [0, 0, 0],
        ]}
        color={part.hazard ? HAZARD : ANNOTATION}
        lineWidth={1}
        transparent
        opacity={0.6}
      />

      <Html position={[labelAnchor.x, labelAnchor.y, labelAnchor.z]} center={false} zIndexRange={[1, 0]}>
        <div
          ref={htmlRef}
          className="mono-label whitespace-nowrap text-[10px] tracking-[0.12em]"
          style={{ color: part.hazard ? HAZARD : "#EDEAE3" }}
        >
          {part.label}
        </div>
      </Html>
    </>
  );
}

function Assembly({ progressRef }: { progressRef: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame(({ pointer: p }) => {
    // lerped mouse parallax, damping ~0.06 per the brief
    const damped = pointer.current;
    damped.x += (p.x - damped.x) * 0.06;
    damped.y += (p.y - damped.y) * 0.06;

    if (groupRef.current) {
      groupRef.current.rotation.x = 0.22 - damped.y * 0.12;
      groupRef.current.rotation.y = 0.18 + damped.x * 0.16;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.22, 0.18, -0.05]}>
      {heroParts.map((part) => (
        <Part key={part.id} part={part} progressRef={progressRef} />
      ))}
    </group>
  );
}

export function HeroScene({ progressRef }: { progressRef: React.RefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.4], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Assembly progressRef={progressRef} />
    </Canvas>
  );
}
