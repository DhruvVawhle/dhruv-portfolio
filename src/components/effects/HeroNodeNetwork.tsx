"use client";

import React, { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  LineBasicMaterial,
  LineSegments,
  AdditiveBlending,
} from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HeroNodeNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Skip WebGL canvas on mobile screens (<768px) to guarantee smooth 60-120fps touch scrolling
    if (window.innerWidth < 768) return;

    const nodeCount = 50;
    const connectionDist = 50;
    const connectionDistSq = connectionDist * connectionDist;

    const scene = new Scene();
    const camera = new PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 140;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    container.appendChild(renderer.domElement);

    // Node coordinates and velocities
    const positions = new Float32Array(nodeCount * 3);
    const velocities = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 260;     // x
      positions[i + 1] = (Math.random() - 0.5) * 170; // y
      positions[i + 2] = (Math.random() - 0.5) * 80;  // z

      velocities[i] = (Math.random() - 0.5) * 0.05;
      velocities[i + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i + 2] = (Math.random() - 0.5) * 0.03;
    }

    // 1. Points Geometry
    const pointsGeometry = new BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new BufferAttribute(positions, 3)
    );

    const pointsMaterial = new PointsMaterial({
      color: 0x3b82f6,
      size: 2.6,
      transparent: true,
      opacity: 0.35,
      blending: AdditiveBlending,
    });

    const pointCloud = new Points(pointsGeometry, pointsMaterial);
    scene.add(pointCloud);

    // 2. Line Segments Geometry (pre-allocate maximum possible lines)
    const maxLines = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const linesGeometry = new BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new BufferAttribute(linePositions, 3)
    );

    const linesMaterial = new LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.14,
      blending: AdditiveBlending,
    });

    const lineSegments = new LineSegments(linesGeometry, linesMaterial);
    scene.add(lineSegments);

    const pointsPosAttr = pointsGeometry.attributes.position as BufferAttribute;
    const linesPosAttr = linesGeometry.attributes.position as BufferAttribute;

    const animate = () => {
      if (!isVisibleRef.current) return;

      const pArray = pointsPosAttr.array as Float32Array;
      const lArray = linesPosAttr.array as Float32Array;
      let lineVertexIndex = 0;

      // Update node positions and wrap boundaries
      for (let i = 0; i < nodeCount * 3; i += 3) {
        pArray[i] += velocities[i];
        pArray[i + 1] += velocities[i + 1];
        pArray[i + 2] += velocities[i + 2];

        if (pArray[i] > 140) pArray[i] = -140;
        if (pArray[i] < -140) pArray[i] = 140;
        if (pArray[i + 1] > 95) pArray[i + 1] = -95;
        if (pArray[i + 1] < -95) pArray[i + 1] = 95;
      }
      pointsPosAttr.needsUpdate = true;

      // Build dynamic connections between nearby nodes
      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        const x1 = pArray[i3];
        const y1 = pArray[i3 + 1];
        const z1 = pArray[i3 + 2];

        for (let j = i + 1; j < nodeCount; j++) {
          const j3 = j * 3;
          const dx = x1 - pArray[j3];
          const dy = y1 - pArray[j3 + 1];
          const dz = z1 - pArray[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectionDistSq) {
            lArray[lineVertexIndex++] = x1;
            lArray[lineVertexIndex++] = y1;
            lArray[lineVertexIndex++] = z1;
            lArray[lineVertexIndex++] = pArray[j3];
            lArray[lineVertexIndex++] = pArray[j3 + 1];
            lArray[lineVertexIndex++] = pArray[j3 + 2];
          }
        }
      }

      linesGeometry.setDrawRange(0, lineVertexIndex / 3);
      linesPosAttr.needsUpdate = true;

      pointCloud.rotation.y += 0.0003;
      lineSegments.rotation.y += 0.0003;

      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(animate);
    };

    // Pause Three.js loop when off screen to eliminate scroll frame drops
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasVisible) {
          if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
          animFrameId.current = requestAnimationFrame(animate);
        } else if (!entry.isIntersecting && animFrameId.current) {
          cancelAnimationFrame(animFrameId.current);
          animFrameId.current = null;
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    if (isVisibleRef.current) {
      animFrameId.current = requestAnimationFrame(animate);
    }

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
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-55 dark:opacity-65"
    />
  );
}
