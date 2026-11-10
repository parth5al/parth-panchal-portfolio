import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HeroParticles
 *
 * A cursor-interactive particle field that sits BEHIND the greeting text in the
 * hero. Dots drift slowly on their own; as the pointer moves across the hero
 * they scatter away from the cursor and briefly glow in brand red, then spring
 * back to their resting positions.
 *
 * - Pointer tracking is done on `window` and mapped into the hero's rect, so the
 *   canvas itself stays `pointer-events-none` and never blocks scroll or the
 *   greeting text above it.
 * - Positions are integrated on the CPU (a few thousand points) and uploaded to
 *   the GPU each frame; a small custom shader handles the round, energy-reactive
 *   dots.
 * - Honors prefers-reduced-motion (renders a single static frame, no loop) and
 *   pauses when the hero scrolls out of view or the tab is hidden.
 */
export function HeroParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    // Orthographic camera mapped 1:1 to CSS pixels — keeps pointer math simple.
    const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -100, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    // --- sizing / particle count --------------------------------------------
    let W = Math.max(mount.clientWidth, 1);
    let H = Math.max(mount.clientHeight, 1);

    const densityFor = (w: number, h: number) =>
      Math.round(Math.min(5000, Math.max(1400, (w * h) / 1400)));

    let COUNT = densityFor(W, H);

    // CPU-side state
    let base = new Float32Array(COUNT * 2); // resting x,y (px)
    let pos = new Float32Array(COUNT * 2); // current x,y (px)
    let vel = new Float32Array(COUNT * 2); // velocity
    let phase = new Float32Array(COUNT); // idle-drift phase

    // GPU attributes
    const positions = new Float32Array(COUNT * 3); // x,y,z
    const energies = new Float32Array(COUNT); // 0..1 "excitement"
    const sizes = new Float32Array(COUNT); // base size px

    const seed = () => {
      for (let i = 0; i < COUNT; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        base[i * 2] = x;
        base[i * 2 + 1] = y;
        pos[i * 2] = x;
        pos[i * 2 + 1] = y;
        vel[i * 2] = 0;
        vel[i * 2 + 1] = 0;
        phase[i] = Math.random() * Math.PI * 2;
        sizes[i] = 1.2 + Math.random() * 2.2;
        energies[i] = 0;
      }
    };
    seed();

    const geometry = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3).setUsage(
      THREE.DynamicDrawUsage,
    );
    const energyAttr = new THREE.BufferAttribute(energies, 1).setUsage(
      THREE.DynamicDrawUsage,
    );
    const sizeAttr = new THREE.BufferAttribute(sizes, 1);
    geometry.setAttribute("position", posAttr);
    geometry.setAttribute("aEnergy", energyAttr);
    geometry.setAttribute("aSize", sizeAttr);

    const uniforms = {
      uPixelRatio: { value: dpr },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: /* glsl */ `
        attribute float aEnergy;
        attribute float aSize;
        uniform float uPixelRatio;
        varying float vEnergy;
        void main() {
          vEnergy = aEnergy;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          float size = aSize * (1.0 + aEnergy * 2.2);
          gl_PointSize = size * uPixelRatio;
        }
      `,
      fragmentShader: /* glsl */ `
        precision mediump float;
        varying float vEnergy;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.12, d);
          // calm = dim slate dot; excited = bright brand red
          vec3 calm = vec3(0.45, 0.46, 0.5);
          vec3 hot  = vec3(0.93, 0.11, 0.14);
          vec3 col = mix(calm, hot, clamp(vEnergy, 0.0, 1.0));
          float a = alpha * (0.32 + 0.68 * clamp(vEnergy, 0.0, 1.0));
          gl_FragColor = vec4(col, a);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- pointer --------------------------------------------------------------
    const mouse = { x: -9999, y: -9999, active: false };
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rect = mount.getBoundingClientRect();
      const x = t.clientX - rect.left;
      const y = t.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    // --- resize ---------------------------------------------------------------
    const applyCamera = () => {
      camera.left = 0;
      camera.right = W;
      camera.top = 0;
      camera.bottom = H; // y grows downward → matches pointer coords
      camera.updateProjectionMatrix();
    };

    const resize = () => {
      const nw = Math.max(mount.clientWidth, 1);
      const nh = Math.max(mount.clientHeight, 1);
      if (nw === W && nh === H) return;
      // rescale resting positions to the new box so the field stays even
      const sx = nw / W;
      const sy = nh / H;
      for (let i = 0; i < COUNT; i++) {
        base[i * 2] *= sx;
        base[i * 2 + 1] *= sy;
        pos[i * 2] *= sx;
        pos[i * 2 + 1] *= sy;
      }
      W = nw;
      H = nh;
      renderer.setSize(W, H, false);
      applyCamera();
    };
    applyCamera();
    renderer.setSize(W, H, false);
    window.addEventListener("resize", resize);

    const RADIUS = 130; // px of cursor influence
    const RADIUS2 = RADIUS * RADIUS;

    const writeBuffers = () => {
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = pos[i * 2];
        positions[i * 3 + 1] = pos[i * 2 + 1];
        positions[i * 3 + 2] = 0;
      }
      posAttr.needsUpdate = true;
      energyAttr.needsUpdate = true;
    };

    const renderOnce = () => {
      writeBuffers();
      renderer.render(scene, camera);
    };

    // Reduced motion: lay the field down once, no animation, no interaction.
    if (reduce) {
      renderOnce();
      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onTouch);
        window.removeEventListener("resize", resize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount)
          mount.removeChild(renderer.domElement);
      };
    }

    // --- animation ------------------------------------------------------------
    let raf = 0;
    let running = true;
    let t = 0;

    const tick = () => {
      t += 0.016;
      const mx = mouse.x;
      const my = mouse.y;
      const active = mouse.active;

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 2;
        const iy = ix + 1;

        let x = pos[ix];
        let y = pos[iy];
        let vx = vel[ix];
        let vy = vel[iy];

        // cursor repulsion
        if (active) {
          const dx = x - mx;
          const dy = y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < RADIUS2 && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const f = (1 - d / RADIUS) * 2.6;
            vx += (dx / d) * f;
            vy += (dy / d) * f;
            energies[i] = Math.min(1, energies[i] + (1 - d / RADIUS) * 0.6);
          }
        }

        // idle drift around resting point
        const bx = base[ix];
        const by = base[iy];
        const driftX = Math.sin(t * 0.6 + phase[i]) * 0.18;
        const driftY = Math.cos(t * 0.5 + phase[i]) * 0.18;

        // spring back home
        vx += (bx - x) * 0.012 + driftX;
        vy += (by - y) * 0.012 + driftY;

        // damping
        vx *= 0.9;
        vy *= 0.9;

        x += vx;
        y += vy;

        pos[ix] = x;
        pos[iy] = y;
        vel[ix] = vx;
        vel[iy] = vy;

        // energy decays back to calm
        energies[i] *= 0.94;
      }

      renderOnce();
      if (running) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pause when hero is off-screen
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0]?.isIntersecting;
        if (vis) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(mount);

    // Pause when tab hidden
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(tick);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
