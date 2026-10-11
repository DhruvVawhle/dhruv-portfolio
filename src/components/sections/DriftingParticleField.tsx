"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleFieldProps {
  paused?: boolean;
}

export default function DriftingParticleField({ paused = false }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 150;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Create subtle particles
    const particleCount = 65;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 320;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 120;

      speeds[i] = (Math.random() - 0.5) * 0.08;
      speeds[i + 1] = 0.05 + Math.random() * 0.08; // subtle upward drift
      speeds[i + 2] = (Math.random() - 0.5) * 0.05;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle material adapting to accent blue
    const material = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 2.5,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      if (!paused) {
        const array = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount * 3; i += 3) {
          array[i + 1] += speeds[i + 1];
          array[i] += speeds[i];

          // Wrap boundaries
          if (array[i + 1] > 120) array[i + 1] = -120;
          if (array[i] > 180) array[i] = -180;
          if (array[i] < -180) array[i] = 180;
        }
        posAttr.needsUpdate = true;
        particles.rotation.y += 0.0006;
      }

      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [paused]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-60"
    />
  );
}
