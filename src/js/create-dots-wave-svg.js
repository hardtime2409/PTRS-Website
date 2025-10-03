/**
 * Tạo SVG "mặt sóng dots" tĩnh (snapshot từ 1 frame).
 *
 * @param {Object} opts - Tuỳ chọn
 *   - container: DOM element để append SVG vào (mặc định: document.body)
 *   - width: số, width của svg (mặc định 1920)
 *   - height: số, height của svg (mặc định 1080)
 *   - vertexCount: số điểm (mặc định 4000)
 *   - vertexSize: base size (mặc định 3)
 *   - oceanWidth: (mặc định 100)
 *   - gridSize: (mặc định 20)
 *   - waveSize: (mặc định 20)
 *   - perspective: (mặc định 400)
 *   - frame: frame index để snapshot (mặc định 0)
 *   - background: css color cho background svg (mặc định '#1A1C28')
 *   - download: boolean, nếu true thì tự tạo file wave.svg để tải (mặc định false)
 *
 * @returns SVGElement
 */
function createWaveDotsSVG(opts = {}) {
    const {
      container = document.body,
      width = 1920,
      height = 1080,
      vertexCount = 1000,
      vertexSize = 12,
      oceanWidth = 100,
      gridSize = 20,
      waveSize = 20,
      perspective = 400,
      frame = 0,
      background = '#1A1C28',
      download = false,
    } = opts;
  
    const xmlns = "http://www.w3.org/2000/svg";
    // Tạo svg và nền (rect)
    const svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    svg.style.display = "block";
  
    const bg = document.createElementNS(xmlns, "rect");
    bg.setAttribute("x", "0");
    bg.setAttribute("y", "0");
    bg.setAttribute("width", String(width));
    bg.setAttribute("height", String(height));
    bg.setAttribute("fill", background);
    svg.appendChild(bg);
  
    // Tạo group để dịch chuyển tâm (center)
    const g = document.createElementNS(xmlns, "g");
    // We'll position by adding center offsets when computing cx/cy; group kept for semantics
    svg.appendChild(g);
  
    // Các tham số phụ
    const depth = (vertexCount / oceanWidth * gridSize);
    const { sin, cos } = Math;
    const centerX = width / 2;
    const centerY = height / 2;
    const oceanHeight = -80; // giữ theo bản gốc
  
    // Sinh vertices (giống canvas gốc)
    const vertices = [];
    for (let i = 0; i < vertexCount; i++) {
      const x = i % oceanWidth;
      const y = 0;
      const z = (i / oceanWidth) >> 0;
      const offset = oceanWidth / 2;
      vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize]);
    }
  
    // Vẽ từng điểm — chú: để giảm DOM overhead, ta có thể tạo <g> batches hoặc dùng <use>, nhưng ở đây đơn giản tạo circle.
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];
  
      // giống logic gốc
      let x = vertex[0] - (frame % (gridSize * 2));
      // z calculation with alternating offset
      const z = (vertex[2] - (frame * 0.5) % gridSize) + (i % 2 === 0 ? gridSize / 2 : 0);
  
      // wave formula
      var wave = (
        cos(frame / 90 + x / 50) -
        sin(frame / 40 + z / 50) +
        sin(frame / 60 + z * x / 10000)
      );

      wave = Math.sin(z / 40 + frame / 40) * 0.8 
            + Math.cos(x / 80 + frame / 60) * 0.2;
  
      let y = vertex[1] + wave * waveSize;
      const a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth);
  
      y -= oceanHeight;
  
      // skip invisible / behind camera
      if (a < 0.01 || z < 0) continue;
  
      // perspective projection (like canvas)
      const px = x / (z / perspective);
      const py = y / (z / perspective);
  
      const cx = centerX + px;
      const cy = centerY + py;
  
      // color / size
      const hue = 240 + wave * 4;
      const fill = `hsl(${hue}, 85%, 46%)`;
      const r = Math.max(0.2, (a * vertexSize) / 2);
  
      // create circle
      const c = document.createElementNS(xmlns, "circle");
      c.setAttribute("cx", String(cx));
      c.setAttribute("cy", String(cy));
      c.setAttribute("r", String(r));
      c.setAttribute("fill", fill);
      c.setAttribute("fill-opacity", String(a));
  
      // Slight optimization: set shape-rendering to geometricPrecision for nicer small circles
      c.setAttribute("shape-rendering", "geometricPrecision");
  
      g.appendChild(c);
    }
  
    // Append svg vào container (nếu container đã chỉ định)
    if (container) {
      container.appendChild(svg);
    }
  
    // Nếu muốn tải file SVG
    if (download) {
      // serialize
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svg);
      const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = "wave.svg";
      // tự click
      document.body.appendChild(a);
      a.click();
      a.remove();
      // revoke after 1s
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  
    return svg;
  }
  document.body.innerHTML = "";
  document.body.appendChild(createWaveDotsSVG({ frame: 80 }));
  
  // --- Ví dụ sử dụng ---
  // Thêm SVG vào body, snapshot frame 120
  // createWaveDotsSVG({ frame: 120 });
  
  // Thêm vào 1 container cụ thể:
  // const container = document.getElementById('intro-svg-dots');
  // createWaveDotsSVG({ container, width: 1920, height: 1080, frame: 200 });
  
  // Tạo và tự động tải file wave.svg:
  // createWaveDotsSVG({ frame: 80, download: true });
  