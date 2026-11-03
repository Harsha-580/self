import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../services/audio';
import { ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

interface FaceAnimationProps {
  studentName: string;
  studentId: string;
  onComplete: () => void;
}

export const FaceAnimation: React.FC<FaceAnimationProps> = ({
  studentName,
  studentId,
  onComplete,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing Biometric Sensor...');
  const [isVerified, setIsVerified] = useState(false);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Software WebGL detection
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1128, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0x60a5fa, 2.5);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-3, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 3.0);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0x1e3a8a, 0x020617, 0.8);
    scene.add(hemiLight);

    // ==========================================
    // PROCEDURAL 3D BIOMETRIC FACE AVATAR GROUP
    // ==========================================
    const faceGroup = new THREE.Group();
    scene.add(faceGroup);

    // 1. Head / Cranium (PBR Cybernetic Biometric Finish)
    const headMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      wireframe: false,
    });

    const headGeo = new THREE.SphereGeometry(1.0, 32, 32);
    // Sculpt sphere into oval human head silhouette
    const pos = headGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i);
      let x = pos.getX(i);
      let z = pos.getZ(i);

      // Chin taper
      if (y < 0) {
        x *= 1.0 + y * 0.28;
        z *= 1.0 + y * 0.15;
      }
      // Forehead roundness
      if (y > 0.3) {
        z *= 1.05;
      }
      // Face flatness in front
      if (z > 0.4 && Math.abs(y) < 0.6) {
        z *= 0.95;
      }

      pos.setXYZ(i, x * 0.95, y * 1.25, z * 1.05);
    }
    headGeo.computeVertexNormals();

    const headMesh = new THREE.Mesh(headGeo, headMat);
    faceGroup.add(headMesh);

    // 2. Wireframe / Holographic Biometric Face Overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireMesh = new THREE.Mesh(headGeo, wireMat);
    wireMesh.scale.setScalar(1.02);
    faceGroup.add(wireMesh);

    // 3. Eyes (Left & Right) with Iris, Pupil & Cornea
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-0.35, 0.15, 0.85);
    faceGroup.add(leftEyeGroup);

    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(0.35, 0.15, 0.85);
    faceGroup.add(rightEyeGroup);

    // Eyeball base
    const eyeballMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.1,
      metalness: 0.1,
    });
    const eyeballGeo = new THREE.SphereGeometry(0.14, 16, 16);

    const leftEyeball = new THREE.Mesh(eyeballGeo, eyeballMat);
    leftEyeGroup.add(leftEyeball);
    const rightEyeball = new THREE.Mesh(eyeballGeo, eyeballMat);
    rightEyeGroup.add(rightEyeball);

    // Iris & Pupil (Glowing Biometric Blue)
    const irisMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
    });
    const pupilMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
    });
    const irisGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.04, 16);
    irisGeo.rotateX(Math.PI / 2);

    const leftIris = new THREE.Mesh(irisGeo, irisMat);
    leftIris.position.set(0, 0, 0.12);
    leftEyeGroup.add(leftIris);

    const rightIris = new THREE.Mesh(irisGeo, irisMat);
    rightIris.position.set(0, 0, 0.12);
    rightEyeGroup.add(rightIris);

    const pupilGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.05, 16);
    pupilGeo.rotateX(Math.PI / 2);

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(0, 0, 0.13);
    leftEyeGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0, 0, 0.13);
    rightEyeGroup.add(rightPupil);

    // 4. Procedural Blinking Eyelids (Upper & Lower)
    const eyelidMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
      side: THREE.DoubleSide,
    });
    const upperEyelidGeo = new THREE.SphereGeometry(0.155, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    
    const leftUpperLid = new THREE.Mesh(upperEyelidGeo, eyelidMat);
    leftEyeGroup.add(leftUpperLid);
    const rightUpperLid = new THREE.Mesh(upperEyelidGeo, eyelidMat);
    rightEyeGroup.add(rightUpperLid);

    // Initial eyelid rotation (open eyes)
    leftUpperLid.rotation.x = -Math.PI / 2;
    rightUpperLid.rotation.x = -Math.PI / 2;

    // 5. Stylized Nose Bridge & Brow
    const noseMat = new THREE.MeshPhysicalMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.2,
    });
    const noseGeo = new THREE.ConeGeometry(0.12, 0.45, 4);
    noseGeo.rotateY(Math.PI / 4);
    const noseMesh = new THREE.Mesh(noseGeo, noseMat);
    noseMesh.position.set(0, -0.05, 1.05);
    noseMesh.scale.set(0.6, 1, 0.5);
    faceGroup.add(noseMesh);

    // 6. Cybernetic / Biometric Jaw & Neck Pedestal
    const neckMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.3,
    });
    const neckGeo = new THREE.CylinderGeometry(0.45, 0.65, 0.8, 24);
    const neckMesh = new THREE.Mesh(neckGeo, neckMat);
    neckMesh.position.set(0, -1.3, 0);
    faceGroup.add(neckMesh);

    // Base collar pedestal
    const collarGeo = new THREE.TorusGeometry(0.75, 0.06, 16, 32);
    collarGeo.rotateX(Math.PI / 2);
    const collarMesh = new THREE.Mesh(collarGeo, new THREE.MeshBasicMaterial({ color: 0x2563eb }));
    collarMesh.position.set(0, -1.5, 0);
    faceGroup.add(collarMesh);

    // 7. Biometric Facial Landmark Node Constellation (Three.js Points)
    const landmarkPositions = [
      // Eyebrows
      -0.5, 0.32, 0.88,   -0.3, 0.36, 0.92,   -0.1, 0.32, 0.92,
      0.1, 0.32, 0.92,    0.3, 0.36, 0.92,    0.5, 0.32, 0.88,
      // Eye contours
      -0.45, 0.15, 0.9,   -0.35, 0.2, 0.92,   -0.25, 0.15, 0.92,  -0.35, 0.1, 0.9,
      0.25, 0.15, 0.92,   0.35, 0.2, 0.92,    0.45, 0.15, 0.9,   0.35, 0.1, 0.9,
      // Nose
      0, 0.2, 0.96,       0, 0.02, 1.06,      -0.1, -0.15, 1.02,  0, -0.16, 1.06,  0.1, -0.15, 1.02,
      // Mouth
      -0.24, -0.38, 0.88, 0, -0.34, 0.94,     0.24, -0.38, 0.88,
      -0.15, -0.46, 0.88, 0, -0.48, 0.92,     0.15, -0.46, 0.88,
      // Jawline
      -0.7, 0.1, 0.6,     -0.65, -0.3, 0.65,  -0.45, -0.65, 0.75, 0, -0.85, 0.82,
      0.45, -0.65, 0.75,  0.65, -0.3, 0.65,   0.7, 0.1, 0.6,
      // Forehead
      0, 0.65, 0.88,      -0.35, 0.6, 0.84,   0.35, 0.6, 0.84,
    ];

    const landmarkGeo = new THREE.BufferGeometry();
    landmarkGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(landmarkPositions, 3)
    );
    const landmarkMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
    });
    const landmarkPoints = new THREE.Points(landmarkGeo, landmarkMat);
    faceGroup.add(landmarkPoints);

    // 8. Rotating Biometric Scanning Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const ringGeo = new THREE.TorusGeometry(1.6, 0.015, 12, 64);
    const scanRing = new THREE.Mesh(ringGeo, ringMat);
    scene.add(scanRing);

    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerRingGeo = new THREE.TorusGeometry(1.9, 0.01, 12, 64);
    const scanRing2 = new THREE.Mesh(innerRingGeo, innerRingMat);
    scanRing2.rotation.x = Math.PI / 3;
    scene.add(scanRing2);

    // 9. Laser Scanning Sweep Plane
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const sweepGeo = new THREE.PlaneGeometry(3.2, 0.08);
    const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
    scene.add(sweepMesh);

    // Mouse Tracking setup
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop Variables
    let frameId = 0;
    let clock = new THREE.Clock();
    let blinkTimer = 0;
    let nextBlinkTime = 2.5;
    let isBlinking = false;
    let blinkProgress = 0;
    let scanY = 1.6;
    let scanDirection = -1;

    // Sound effect
    sound.playScanTone();

    // Verification sequence state
    let startTime = Date.now();
    let verifiedFired = false;

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation (Damping)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Lifelike head rotation (subtle breathing + mouse follow)
      faceGroup.rotation.y = mouse.x * 0.35 + Math.sin(elapsed * 1.2) * 0.04;
      faceGroup.rotation.x = -mouse.y * 0.25 + Math.cos(elapsed * 1.5) * 0.03;
      faceGroup.position.y = Math.sin(elapsed * 1.8) * 0.04;

      // Pupil / Eye tracking
      const eyeLookX = mouse.x * 0.04;
      const eyeLookY = mouse.y * 0.04;
      leftIris.position.x = eyeLookX;
      leftIris.position.y = eyeLookY;
      leftPupil.position.x = eyeLookX;
      leftPupil.position.y = eyeLookY;
      rightIris.position.x = eyeLookX;
      rightIris.position.y = eyeLookY;
      rightPupil.position.x = eyeLookX;
      rightPupil.position.y = eyeLookY;

      // Procedural Eyelid Blinking
      blinkTimer += delta;
      if (blinkTimer > nextBlinkTime && !isBlinking) {
        isBlinking = true;
        blinkProgress = 0;
      }

      if (isBlinking) {
        blinkProgress += delta * 7.5; // Blink speed
        // Sine wave closure: 0 -> 1 -> 0
        const closeFactor = Math.sin(Math.min(blinkProgress, Math.PI));
        // Rotate eyelid down from -PI/2 to 0
        const lidRot = -Math.PI / 2 + closeFactor * (Math.PI / 2);
        leftUpperLid.rotation.x = lidRot;
        rightUpperLid.rotation.x = lidRot;

        if (blinkProgress >= Math.PI) {
          isBlinking = false;
          blinkTimer = 0;
          nextBlinkTime = 2.0 + Math.random() * 2.5; // Natural randomized blink interval
          leftUpperLid.rotation.x = -Math.PI / 2;
          rightUpperLid.rotation.x = -Math.PI / 2;
        }
      }

      // Biometric Scanning Rings Rotation
      scanRing.rotation.z += 0.008;
      scanRing.rotation.y = elapsed * 0.4;
      scanRing2.rotation.z -= 0.006;
      scanRing2.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.6) * 0.2;

      // Laser Sweep Motion
      scanY += scanDirection * delta * 1.4;
      if (scanY > 1.4) {
        scanY = 1.4;
        scanDirection = -1;
      } else if (scanY < -1.2) {
        scanY = -1.2;
        scanDirection = 1;
      }
      sweepMesh.position.y = scanY;
      sweepMesh.position.z = 0.8 + Math.cos(scanY * 1.5) * 0.2;

      // Verification timeline progress calculation
      const now = Date.now();
      const progress = Math.min(100, Math.floor(((now - startTime) / 2200) * 100));
      setScanProgress(progress);

      if (progress < 30) {
        setStatusMessage('Acquiring 3D Facial Topography...');
      } else if (progress < 65) {
        setStatusMessage('Matching Biometric Vector Hash with University Archive...');
      } else if (progress < 95) {
        setStatusMessage('Validating Student Cryptographic Authorization...');
      } else {
        setStatusMessage('Biometric Identity Confirmed: Access Granted');
        if (!verifiedFired) {
          verifiedFired = true;
          setIsVerified(true);
          sound.playSuccessChime();

          // Green aura shift on face materials
          landmarkMat.color.setHex(0x10b981);
          ringMat.color.setHex(0x10b981);
          innerRingMat.color.setHex(0x34d399);

          // Trigger transition to dashboard after brief showcase
          setTimeout(() => {
            setIsTransitioningOut(true);
            setTimeout(() => {
              onCompleteRef.current();
            }, 750);
          }, 1100);
        }
      }

      // Camera smooth zoom-in on completion
      if (verifiedFired) {
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 3.8, 3.5, delta);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Resource cleanup
      headGeo.dispose();
      headMat.dispose();
      wireMat.dispose();
      eyeballGeo.dispose();
      eyeballMat.dispose();
      irisMat.dispose();
      pupilMat.dispose();
      upperEyelidGeo.dispose();
      eyelidMat.dispose();
      noseGeo.dispose();
      noseMat.dispose();
      neckGeo.dispose();
      neckMat.dispose();
      collarGeo.dispose();
      landmarkGeo.dispose();
      landmarkMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      sweepGeo.dispose();
      sweepMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleSkipToDashboard = () => {
    setIsTransitioningOut(true);
    sound.playClick();
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-slate-950 text-white overflow-hidden transition-all duration-700 ${
        isTransitioningOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Top Header Information */}
      <div className="relative z-10 w-full max-w-5xl px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
              Biometric Authentication
            </div>
            <div className="text-sm font-bold text-white tracking-tight">
              AEGIS Digital Student Identity System
            </div>
          </div>
        </div>

        {/* Quick skip button so user never feels forced to wait */}
        <button
          onClick={handleSkipToDashboard}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all"
        >
          <span>Skip to Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Three.js Viewport */}
      <div className="relative flex-1 w-full max-w-4xl flex items-center justify-center">
        <div
          ref={mountRef}
          className="w-full h-[450px] md:h-[520px] max-w-[700px] cursor-grab active:cursor-grabbing"
        />

        {/* Target overlay corners */}
        <div className="absolute pointer-events-none w-72 h-72 border-2 border-blue-500/20 rounded-3xl flex items-center justify-center">
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-400" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-blue-400" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-blue-400" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-blue-400" />
        </div>
      </div>

      {/* Bottom Personalized Greeting & Status Bar */}
      <div className="relative z-10 w-full max-w-xl px-6 pb-12 flex flex-col items-center text-center">
        {/* Verification Status Pill */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border mb-3 transition-colors ${
            isVerified
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
          }`}
        >
          {isVerified ? (
            <>
              <UserCheck className="w-4 h-4" />
              <span>Biometric Identity Verified · Match 99.8%</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>Analyzing Biometric Mesh: {scanProgress}%</span>
            </>
          )}
        </div>

        {/* Personalized Welcome Header */}
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">
          Welcome Back, {studentName}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mb-5 font-mono">
          ID: {studentId} · Session Token: AES-256 Verified
        </p>

        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-2 mb-3 overflow-hidden border border-slate-700/60">
          <div
            className={`h-full transition-all duration-300 ease-out ${
              isVerified ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-sky-400'
            }`}
            style={{ width: `${scanProgress}%` }}
          />
        </div>

        <p className="text-xs text-slate-400 font-medium h-4">
          {statusMessage}
        </p>
      </div>
    </div>
  );
};
