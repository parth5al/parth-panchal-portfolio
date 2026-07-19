import { useEffect, useRef } from "react";
import * as THREE from "three";
import portraitUrl from "../../imports/image.png";

const MONO = "'JetBrains Mono', monospace";

export function ThreePortrait() {
  const mountRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const uniforms = {
      uTex: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      uHover: { value: 0 },
    };

    const loader = new THREE.TextureLoader();
    loader.load(portraitUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      uniforms.uTex.value = tex;
    });

    // Plane sized to portrait aspect (~ 3:4)
    const aspect = 3 / 4;
    const geo = new THREE.PlaneGeometry(2 * aspect, 2, 64, 80);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uHover;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          // gentle holographic ripple
          float w = sin(p.y * 6.0 + uTime * 2.0) * 0.02
                  + sin(p.x * 8.0 - uTime * 1.5) * 0.015;
          p.z += w * (0.5 + uHover);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uTex;
        uniform float uTime;
        uniform float uHover;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // subtle vertical drift + glitch band
          float band = step(0.995, fract(sin(uTime * 3.0) * 43758.5453));
          uv.x += band * (fract(sin(uv.y * 120.0) * 999.0) - 0.5) * 0.03;

          // chromatic aberration
          float ca = 0.004 + uHover * 0.006;
          float r = texture2D(uTex, uv + vec2(ca, 0.0)).r;
          vec4 base = texture2D(uTex, uv);
          float b = texture2D(uTex, uv - vec2(ca, 0.0)).b;
          vec3 col = vec3(r, base.g, b);

          // cyan holographic tint boost
          col += vec3(0.0, 0.15, 0.35) * base.a * 0.4;

          // moving scanlines
          float scan = sin((vUv.y + uTime * 0.15) * 800.0) * 0.06;
          col -= scan;

          // horizontal sweep highlight
          float sweep = smoothstep(0.0, 0.05, abs(fract(uv.y - uTime * 0.12) - 0.5) - 0.45);
          col += (1.0 - sweep) * vec3(0.1, 0.4, 0.6) * 0.5;

          // flicker
          col *= 0.92 + 0.08 * sin(uTime * 40.0);

          gl_FragColor = vec4(col, base.a);
        }
      `,
    });

    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.current.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.current.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      uniforms.uHover.value = 1;
    };
    const onLeave = () => {
      pointer.current.tx = 0;
      pointer.current.ty = 0;
      uniforms.uHover.value = 0;
    };
    mount.addEventListener("mousemove", onMove);
    mount.addEventListener("mouseleave", onLeave);

    const start = performance.now();
    let raf = 0;
    const animate = () => {
      const t = (performance.now() - start) / 1000;
      uniforms.uTime.value = reduce ? 0 : t;

      // smooth tilt toward pointer + slow idle float
      pointer.current.x += (pointer.current.tx - pointer.current.x) * 0.06;
      pointer.current.y += (pointer.current.ty - pointer.current.y) * 0.06;
      mesh.rotation.y = pointer.current.x * 0.4 + (reduce ? 0 : Math.sin(t * 0.4) * 0.08);
      mesh.rotation.x = -pointer.current.y * 0.3;
      mesh.position.y = reduce ? 0 : Math.sin(t * 0.8) * 0.04;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("mousemove", onMove);
      mount.removeEventListener("mouseleave", onLeave);
      geo.dispose();
      material.dispose();
      uniforms.uTex.value?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[380px] aspect-[3/4] mx-auto">
      <div
        ref={mountRef}
        className="size-full rounded-[20px] overflow-hidden border border-[rgba(0,229,255,0.25)]"
        style={{ boxShadow: "0 30px 80px rgba(0,229,255,0.18), 0 0 40px rgba(0,229,255,0.12)" }}
      />
      <span
        className="absolute top-[12px] left-[12px] text-[#00e5ff] text-[9px] tracking-[1.5px] pointer-events-none"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        HOLO · PARTH
      </span>
      <span
        className="absolute bottom-[12px] right-[12px] text-[#00e5ff] text-[9px] tracking-[1.5px] pointer-events-none"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        WEBGL · LIVE
      </span>
    </div>
  );
}
