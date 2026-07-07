/* eslint-disable react/no-unknown-property */
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import gsap from "gsap";

extend({ MeshLineGeometry, MeshLineMaterial });

// Augment ThreeElements to support meshLine JSX tags in TypeScript
declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}

const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
  startEntrance?: boolean;
}

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  startEntrance = false,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [posX, posY, posZ] = position;
  const camPos: [number, number, number] = isMobile
    ? [0, -0.7, 8.0]
    : [0, 0, posZ];

  return (
    <div className={`w-full h-full relative ${isDragging ? "touch-none" : ""}`} style={{ minHeight: "400px" }}>
      <Canvas
        camera={{ position: camPos, fov: fov }}
        dpr={[1, isMobile ? 1.2 : 1.5]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            setIsDragging={setIsDragging}
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            posX={posX}
            posY={posY}
            startEntrance={startEntrance}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  setIsDragging?: (val: boolean) => void;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
  posX?: number;
  posY?: number;
  startEntrance?: boolean;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  setIsDragging,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
  posX = 2.0,
  posY = 1.3,
  startEntrance = false,
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const j4 = useRef<any>(null);
  const j5 = useRef<any>(null);
  const card = useRef<any>(null);

  const [entranceDone, setEntranceDone] = useState(false);
  const entranceRef = useRef({ y: 2.5 });

  useEffect(() => {
    if (startEntrance) {
      gsap.to(entranceRef.current, {
        y: 0,
        duration: 1.0,
        ease: "power2.in", // Sekali jatuh langsung ke bawah tanpa memantul
        onComplete: () => setEntranceDone(true),
      });
    }
  }, [startEntrance]);

  useEffect(() => {
    if (entranceDone && isMobile && card.current) {
      card.current.applyImpulse({ x: 0.3, y: 0, z: 0.1 }, true);
    }
  }, [entranceDone, isMobile]);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: false,
    colliders: false as unknown as undefined,
    angularDamping: isMobile ? 8 : 4,
    linearDamping: isMobile ? 6 : 4,
  };

  // Load resources using static paths
  const { nodes, materials } = useGLTF("/models/card.glb") as any;
  const texture = useTexture(lanyardImage || "/textures/lanyard.png");
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite texture atlas
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return baseMap;
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img: HTMLImageElement, rect: typeof FRONT_UV_RECT) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === "contain" ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image)
      drawFitted(frontTex.image as any, FRONT_UV_RECT);
    if (backImage && backTex.image)
      drawFitted(backTex.image as any, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.6]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.6]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.6]);
  useRopeJoint(j3, j4, [[0, 0, 0], [0, 0, 0], 0.6]);
  useRopeJoint(j4, j5, [[0, 0, 0], [0, 0, 0], 0.6]);
  useSphericalJoint(j5, card, [
    [0, 0, 0],
    [0, 1.4, 0],
  ]);

  useEffect(() => {
    if (hovered && !isMobile) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged, isMobile]);

  useFrame((state, delta) => {
    // Dynamic camera positioning for responsiveness
    if (!isMobile) {
      // Keep the card (rest position X=0) exactly posX units from the right edge of the screen
      const targetCamX = -(state.viewport.width / 2 - posX);
      state.camera.position.x = targetCamX;
    } else {
      state.camera.position.x = 0;
    }

    if (!entranceDone) {
      const anchorY = isMobile ? 5 : posY !== undefined ? posY + 2.5 : 3.8;
      const restY = anchorY - 3.0;

      card.current?.setNextKinematicTranslation({
        x: 0,
        y: restY + entranceRef.current.y,
        z: 0,
      });
      [j1, j2, j3, j4, j5, fixed].forEach((ref) => ref.current?.wakeUp());
    } else if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, j4, j5, fixed].forEach((ref) => ref.current?.wakeUp());

      // Dynamic boundary clamps based on viewport size
      const minX = posX - state.viewport.width;
      const maxX = posX - 0.2;
      const minY = state.camera.position.y - state.viewport.height / 2 + 0.5;
      const maxY = state.camera.position.y + state.viewport.height / 2 - 0.2;

      const targetX = Math.max(minX, Math.min(maxX, vec.x - dragged.x));
      const targetY = Math.max(minY, Math.min(maxY, vec.y - dragged.y));
      const targetZ = vec.z - dragged.z;

      card.current?.setNextKinematicTranslation({
        x: targetX,
        y: targetY,
        z: targetZ,
      });
    }



    if (fixed.current) {
      [j1, j2, j3, j4].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });

      // Calculate the exact hook connector position on the card mesh dynamically (offset + rotation)
      const cardTrans = card.current.translation();
      const cardRot = card.current.rotation();
      const hookOffset = new THREE.Vector3(0, 1.15, 0).applyQuaternion(
        new THREE.Quaternion(cardRot.x, cardRot.y, cardRot.z, cardRot.w),
      );
      const hookPos = new THREE.Vector3().copy(cardTrans).add(hookOffset);

      curve.points[0].copy(hookPos);
      curve.points[1].copy(j5.current.translation());
      curve.points[2].copy(j4.current.lerped || j4.current.translation());
      curve.points[3].copy(j3.current.lerped || j3.current.translation());
      curve.points[4].copy(j2.current.lerped || j2.current.translation());
      curve.points[5].copy(j1.current.lerped || j1.current.translation());
      curve.points[6].copy(fixed.current.translation());

      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group
        position={[
          0,
          isMobile ? 5 : posY !== undefined ? posY + 2.5 : 3.8,
          0,
        ]}
      >
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody ref={j1} position={[0.2, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j2} position={[0.4, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j3} position={[0.6, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j4} position={[0.8, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j5} position={[1.0, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          position={[1.2, 0, 0]}
          {...segmentProps}
          type={
            !entranceDone
              ? "kinematicPosition"
              : dragged
                ? "kinematicPosition"
                : "dynamic"
          }
        >
          <CuboidCollider args={[1.2, 1.7, 0.02]} />

          <group
            scale={1.75}
            position={[0, -1.0, -0.05]}
            onPointerOver={() => entranceDone && hover(true)}
            onPointerOut={() => entranceDone && hover(false)}
            onPointerUp={(e) => {
              if (!entranceDone) return;
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              drag(false);
              if (setIsDragging) setIsDragging(false);
            }}
            onPointerDown={(e) => {
              if (!entranceDone) return;

              (e.target as HTMLElement).setPointerCapture(e.pointerId);

              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              );
              if (setIsDragging) setIsDragging(true);
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>

            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />

            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />

        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={0.7}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("/models/card.glb");
