"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function NodeNetwork({ count = 120 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const { mouse, viewport } = useThree();

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * (viewport.width * 1.5);
            positions[i * 3 + 1] = (Math.random() - 0.5) * (viewport.height * 1.5);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, [count, viewport]);

    const velocities = useMemo(() => {
        const v = [];
        for (let i = 0; i < count; i++) {
            v.push({
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01,
            });
        }
        return v;
    }, [count]);

    useFrame(() => {
        if (!pointsRef.current || !linesRef.current) return;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Mouse coords to scene coords
        const mouseX = (mouse.x * viewport.width) / 2;
        const mouseY = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            let px = positions[i * 3];
            let py = positions[i * 3 + 1];
            let pz = positions[i * 3 + 2];

            // Mouse interaction (repulsion)
            const dxMouse = px - mouseX;
            const dyMouse = py - mouseY;
            const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

            if (distMouseSq < 4) {
                const force = (4 - distMouseSq) * 0.02;
                velocities[i].x += dxMouse * force;
                velocities[i].y += dyMouse * force;
            }

            // Apply velocities with slight damping
            velocities[i].x *= 0.99;
            velocities[i].y *= 0.99;
            velocities[i].z *= 0.99;

            // Ensure min velocity to keep moving
            if (Math.abs(velocities[i].x) < 0.002) velocities[i].x += (Math.random() - 0.5) * 0.005;
            if (Math.abs(velocities[i].y) < 0.002) velocities[i].y += (Math.random() - 0.5) * 0.005;

            positions[i * 3] += velocities[i].x;
            positions[i * 3 + 1] += velocities[i].y;
            positions[i * 3 + 2] += velocities[i].z;

            // Bounce off walls
            if (Math.abs(positions[i * 3]) > viewport.width) velocities[i].x *= -1;
            if (Math.abs(positions[i * 3 + 1]) > viewport.height) velocities[i].y *= -1;
            if (Math.abs(positions[i * 3 + 2]) > 10) velocities[i].z *= -1;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Connect lines
        const linePositions = [];
        const maxDistSq = 5;

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < maxDistSq) {
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }

        const lineGeo = linesRef.current.geometry;
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    });

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        args={[particlesPosition, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.06} color="#00E5FF" transparent opacity={0.8} />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#8A2BE2" transparent opacity={0.25} />
            </lineSegments>
        </group>
    );
}
