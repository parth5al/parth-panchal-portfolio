import { useEffect, useRef, useState } from "react";
import portraitUrl from "../../imports/image-1.png";

const MONO = "'JetBrains Mono', monospace";

/**
 * Full-bleed portrait tile with an animated WebGL plasma shader behind it.
 * The image (dark silhouette on white) is composited with `multiply`, so the
 * shader glows through the white background. Hover intensifies the animation.
 */
export function PortraitTile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState(false);
  const hoverRef = useRef(0); // smoothed hover value used by the render loop

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vs = `
      attribute vec2 aPos;
      void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
    `;
    const fs = `
      precision highp float;
      uniform vec2 uRes;
      uniform float uTime;
      uniform float uHover;

      // pink / orange / red gradient palette
      const vec3 DEEP   = vec3(0.45, 0.05, 0.18);   // deep crimson
      const vec3 RED    = vec3(0.929, 0.110, 0.141); // brand red
      const vec3 ORANGE = vec3(1.0, 0.48, 0.16);     // warm orange
      const vec3 PINK   = vec3(1.0, 0.35, 0.65);     // hot pink
      const vec3 BLUSH  = vec3(1.0, 0.62, 0.72);     // soft blush

      void main() {
        vec2 uv = gl_FragCoord.xy / uRes.xy;
        vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / min(uRes.x, uRes.y);

        // always-on drifting motion (small hover speed-up if present)
        float t = uTime * (0.35 + uHover * 0.4);

        // layered sine plasma
        float v = 0.0;
        v += sin(p.x * 3.0 + t * 1.3);
        v += sin(p.y * 3.5 - t * 1.1);
        v += sin((p.x + p.y) * 2.5 + t);
        v += sin(length(p) * 6.0 - t * 1.7);
        v *= 0.25;

        float m = 0.5 + 0.5 * v;

        // blend the warm gradient across the plasma
        vec3 col = mix(DEEP, RED, smoothstep(0.1, 0.45, m));
        col = mix(col, ORANGE, smoothstep(0.4, 0.65, m));
        col = mix(col, PINK, smoothstep(0.6, 0.85, m));
        col = mix(col, BLUSH, smoothstep(0.85, 1.0, m));

        // soft vignette keeps edges rich
        float vig = smoothstep(1.15, 0.25, length(uv - 0.5));
        col *= 0.55 + 0.45 * vig;

        // gentle hover lift
        col += uHover * 0.06;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uHover = gl.getUniformLocation(prog, "uHover");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const start = performance.now();
    let raf = 0;
    const render = () => {
      resize();
      const t = reduce ? 0 : (performance.now() - start) / 1000;
      // ease hover toward target
      const target = hoverRef.current;
      const current = gl.getUniform(prog, uHover!) as number;
      const next = current + (target - current) * 0.08;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uHover, isNaN(next) ? target : next);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  useEffect(() => {
    hoverRef.current = hover ? 1 : 0;
  }, [hover]);

  return (
    <div
      className="group absolute inset-0 overflow-hidden rounded-[22px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* animated shader background */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full block" />

      {/* portrait — fills the tile, multiply lets the shader glow through white */}
      <img
        src={portraitUrl}
        alt="Portrait of Parth Panchal"
        className="absolute inset-0 size-full object-cover mix-blend-multiply transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      {/* subtle scanline sheen on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.06)_4px)] motion-reduce:transition-none" />

      {/* corner labels */}
      <span
        className="absolute top-[16px] left-[16px] text-[#f4f2f0] text-[9px] tracking-[2px] mix-blend-difference pointer-events-none"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        PORTRAIT · PARTH
      </span>
      <span
        className="absolute bottom-[16px] right-[16px] text-[#f4f2f0] text-[9px] tracking-[2px] mix-blend-difference pointer-events-none"
        style={{ fontFamily: MONO, fontWeight: 600 }}
      >
        WEBGL · LIVE
      </span>
    </div>
  );
}
