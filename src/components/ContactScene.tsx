"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const contactEl = canvas.parentElement;
    if (!contactEl) return;

    const getSize = () => ({ w: contactEl.clientWidth, h: contactEl.clientHeight });
    const { w: cW, h: cH } = getSize();

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(cW, cH);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, cW / cH, 0.1, 100);
    camera.position.z = 8;

    function edgeMesh(geometry: THREE.BufferGeometry, color: number, opacity: number) {
      const edges = new THREE.EdgesGeometry(geometry);
      return new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      );
    }

    const cGroup = new THREE.Group();
    cGroup.position.set(4.4, -0.4, 0);
    scene.add(cGroup);

    const cGem = edgeMesh(new THREE.DodecahedronGeometry(1.7, 0), 0xffffff, 0.42);
    const cShell = edgeMesh(new THREE.IcosahedronGeometry(2.5, 1), 0xbed8c8, 0.16);
    const cRing = edgeMesh(new THREE.TorusGeometry(1.05, 0.01, 8, 100), 0xffffff, 0.32);
    cRing.rotation.set(Math.PI * 0.35, Math.PI * 0.15, 0);
    cGroup.add(cGem, cShell, cRing);
    cGroup.scale.setScalar(0);

    ScrollTrigger.create({
      trigger: "#contact",
      start: "top 70%",
      onEnter: () =>
        gsap.to(cGroup.scale, { x: 1, y: 1, z: 1, duration: 1.7, ease: "expo.out" }),
      onLeaveBack: () =>
        gsap.to(cGroup.scale, { x: 0, y: 0, z: 0, duration: 0.6, ease: "power2.in" }),
    });

    const handleResize = () => {
      const { w, h } = getSize();
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    let ct = 0;
    let animId: number;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      ct += 0.0045;
      cGem.rotation.x = ct * 0.3;
      cGem.rotation.y = ct * 0.45;
      cShell.rotation.x = -ct * 0.12;
      cShell.rotation.y = -ct * 0.18;
      cRing.rotation.z += 0.01;
      cGroup.position.y = -0.4 + Math.sin(ct * 0.6) * 0.15;
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
      id="contact-canvas"
      className="absolute top-0 left-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
