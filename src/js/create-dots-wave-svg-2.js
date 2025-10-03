function createWaveGridSVG({
    width = 1920,
    height = 1080,
    gridX = 60,
    gridZ = 40,
    spacingX = 40,
    spacingZ = 40,
    perspective = 800,
    zCameraOffset = 600,
    waveAmplitude = 40,
    waveLength = 200,
    dotBaseSize = 4,
    maxBlur = 6 // blur tối đa cho dot xa
} = {}) {
    const xmlns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("xmlns", xmlns);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("style", "background:#0a0a12");

    const defs = document.createElementNS(xmlns, "defs");
    svg.appendChild(defs);

    const centerX = width / 2;
    const centerY = height / 2;

    const g = document.createElementNS(xmlns, "g");
    svg.appendChild(g);

    let filterCount = 0;

    for (let ix = 0; ix < gridX; ix++) {
        for (let iz = 0; iz < gridZ; iz++) {
            const x0 = (ix - gridX / 2) * spacingX;
            const z0 = iz * spacingZ;

            const y0 = Math.sin(x0 / waveLength) * waveAmplitude
                + Math.cos(z0 / waveLength) * waveAmplitude;

            const zShifted = z0 + zCameraOffset;
            const factor = perspective / (perspective - zShifted);

            const screenX = centerX + x0 * factor;
            const screenY = centerY - y0 * factor;

            if (screenX < -50 || screenX > width + 50) continue;
            if (screenY < -50 || screenY > height + 50) continue;

            const r = dotBaseSize * factor * 0.8;
            if (r < 0.5) continue;

            // Blur: xa hơn => blur nhiều
            const blurVal = (1 - factor) * maxBlur;

            const filterId = `blur${filterCount++}`;
            const filter = document.createElementNS(xmlns, "filter");
            filter.setAttribute("id", filterId);
            const feGaussian = document.createElementNS(xmlns, "feGaussianBlur");
            feGaussian.setAttribute("stdDeviation", Math.max(0, blurVal).toFixed(2));
            filter.appendChild(feGaussian);
            defs.appendChild(filter);

            const circle = document.createElementNS(xmlns, "circle");
            circle.setAttribute("cx", screenX);
            circle.setAttribute("cy", screenY);
            circle.setAttribute("r", r);
            circle.setAttribute("fill", "hsl(200,80%,60%)");
            circle.setAttribute("fill-opacity", 0.9);
            circle.setAttribute("filter", `url(#${filterId})`);

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
    spacingX: 40,
    spacingZ: 80,
    perspective: 1300,
    zCameraOffset: 200,
    waveAmplitude: 60,
    waveLength: 250,
    dotBaseSize: 2,
    maxBlur: 8
});

document.body.appendChild(svg);
