function createWaveGridSVG({
  width = 1920,
  height = 1080,
  gridX = 60,          // số cột
  gridZ = 40,          // số hàng
  spacingX = 40,       // khoảng cách dot theo X
  spacingZ = 40,       // khoảng cách dot theo Z
  perspective = 800,   // phối cảnh
  zCameraOffset = 600, // dịch camera ra xa
  waveAmplitude = 40,  // biên độ sóng
  waveLength = 200,    // bước sóng
  dotBaseSize = 4      // kích thước dot gốc
} = {}) {
  const xmlns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(xmlns, "svg");
  svg.setAttribute("xmlns", xmlns);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("style", "background:#0a0a12");

  const centerX = width / 2;
  const centerY = height / 2;

  const g = document.createElementNS(xmlns, "g");
  svg.appendChild(g);

  for (let ix = 0; ix < gridX; ix++) {
    for (let iz = 0; iz < gridZ; iz++) {
      // grid vuông đều (X,Z) nhưng spacing tách riêng
      const x0 = (ix - gridX / 2) * spacingX;
      const z0 = iz * spacingZ;

      // wave làm nhấp nhô theo trục Y
      const y0 = Math.sin(x0 / waveLength) * waveAmplitude
               + Math.cos(z0 / waveLength) * waveAmplitude;

      // dịch camera ra xa để tránh đảo ngược
      const zShifted = z0 + zCameraOffset;

      // perspective projection (gần to, xa nhỏ)
      const factor = perspective / (perspective - zShifted);

      const screenX = centerX + x0 * factor;
      const screenY = centerY - y0 * factor;

      // bỏ dot ngoài khung
      if (screenX < -50 || screenX > width + 50) continue;
      if (screenY < -50 || screenY > height + 50) continue;

      // dot size theo độ sâu
      const r = dotBaseSize * factor * 0.8;
      if (r < 0.5) continue;

      const circle = document.createElementNS(xmlns, "circle");
      circle.setAttribute("cx", screenX);
      circle.setAttribute("cy", screenY);
      circle.setAttribute("r", r);
      circle.setAttribute("fill", "hsl(200,80%,60%)");
      circle.setAttribute("fill-opacity", 0.9);

      g.appendChild(circle);
    }
  }

  return svg;
}

// ----------------- Demo -----------------
document.body.innerHTML = ""; 
document.body.style.margin = "0";
document.body.style.background = "#000";

const svg = createWaveGridSVG({
  gridX: 50,
  gridZ: 40,
  spacingX: 40,       // chỉnh ngang thưa
  spacingZ: 80,       // dọc dày hơn
  perspective: 1200,
  zCameraOffset: 200,
  waveAmplitude: 60,
  waveLength: 250,
  dotBaseSize: 2
});

document.body.appendChild(svg);
