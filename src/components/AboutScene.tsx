"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const aboutEl = canvas.parentElement;
    if (!aboutEl) return;

    const getSize = () => ({ w: aboutEl.clientWidth, h: aboutEl.clientHeight });
    const { w: aW, h: aH } = getSize();

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(aW, aH);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, aW / aH, 0.1, 100);
    camera.position.z = 8;

    function edgeMesh(geometry: THREE.BufferGeometry, color: number, opacity: number) {
      const edges = new THREE.EdgesGeometry(geometry);
      return new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      );
    }

    const aGroup = new THREE.Group();
    aGroup.position.set(-3.6, 1.1, -1);
    scene.add(aGroup);

    const aGem = edgeMesh(new THREE.IcosahedronGeometry(1.5, 0), 0xbed8c8, 0.5);
    const aShell = edgeMesh(new THREE.OctahedronGeometry(2.2, 0), 0xb8924e, 0.16);
    aGroup.add(aGem, aShell);
    aGroup.scale.setScalar(0);

    ScrollTrigger.create({
      trigger: "#about",
      start: "top 75%",
      onEnter: () =>
        gsap.to(aGroup.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: "expo.out" }),
      onLeaveBack: () =>
        gsap.to(aGroup.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: "power2.in" }),
    });

    const handleResize = () => {
      const { w, h } = getSize();
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    let at = 0;
    let animId: number;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      at += 0.0045;
      aGem.rotation.x = at * 0.32;
      aGem.rotation.y = at * 0.5;
      aShell.rotation.x = -at * 0.14;
      aShell.rotation.y = -at * 0.2;
      aGroup.position.y = 1.1 + Math.sin(at * 0.5) * 0.18;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="about-canvas"
      className="absolute top-0 left-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
