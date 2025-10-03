console.log("Checked");

document.addEventListener("DOMContentLoaded", () => {
    async function loadComponent(file, position = "end") {
        try {
            const res = await fetch(file);
            if (!res.ok) throw new Error(`Cannot load ${file}: ${res.status}`);
            const html = await res.text();

            if (position === "start") {
                document.body.insertAdjacentHTML("afterbegin", html);
            } else if (position === "end") {
                document.body.insertAdjacentHTML("beforeend", html);
            } else {
                console.warn(`Unknown position "${position}", appending at end.`);
                document.body.insertAdjacentHTML("beforeend", html);
            }
        } catch (err) {
            console.error(err);
        }
    }

    // header vào đầu body
    loadComponent("components/header.html", "start");
    // footer vào cuối body
    loadComponent("components/footer.html", "end");
});



document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        try {
            const res = await fetch("components/svg-boxes.html");
            if (!res.ok) throw new Error(`Cannot load svg-boxes.html: ${res.status}`);
            const html = await res.text();

            const container = document.querySelector("#intro-svg");
            if (container) {
                container.insertAdjacentHTML("beforeend", html);
                sampleFunction();
            } else {
                console.warn("#intro-svg not found");
            }
        } catch (err) {
            console.error(err);
        }
    })();
});


function sampleFunction() {
    var $circles = document.getElementsByClassName("dot-line1");
    var $circles2 = document.getElementsByClassName("dot-line2");
    var $circles3 = document.getElementsByClassName("dot-line3");
    var $circles4 = document.getElementsByClassName("dot-line4");
    var $circles5 = document.getElementsByClassName("dot-line5");
    var $circles6 = document.getElementsByClassName("dot-line6");
    var $circles7 = document.getElementsByClassName("dot-line7");
    var $circles8 = document.getElementsByClassName("dot-line8");


    var $cube1 = document.getElementById('cube1')
    var $cube2 = document.getElementById('cube2')

    var tl = new TimelineMax({ repeat: -1 });
    var tl2 = new TimelineMax({ repeat: -1 });
    var tl3 = new TimelineMax({ repeat: -1 });
    var tl4 = new TimelineMax({ repeat: -1 });
    var tl5 = new TimelineMax({ repeat: -1 });
    var tl6 = new TimelineMax({ repeat: -1 });
    var tl7 = new TimelineMax({ repeat: -1 });
    var tl2 = new TimelineMax({ repeat: -1 });
    var tl8 = new TimelineMax({ repeat: -1 });

    var cubetl = new TimelineMax({ repeat: -1, repeatDelay: 4 });
    var cubetl2 = new TimelineMax({ repeat: -1, repeatDelay: 2 });



    tl.staggerTo($circles, 0.01, { fill: "#F13738", scale: 2 }, 0.1);
    tl.staggerTo($circles, 0.01, { fill: "#1D2028", scale: 1 }, 0.1, "-=2.2");

    tl2.staggerTo($circles2, 0.01, { fill: "#F13738", scale: 2 }, 0.1);
    tl2.staggerTo($circles2, 0.01, { fill: "#1D2028", scale: 1 }, 0.1, "-=6.3");

    tl3.staggerTo($circles3, 0.01, { fill: "#F13738", scale: 2 }, 0.1);
    tl3.staggerTo($circles3, 0.01, { fill: "#1D2028", scale: 1 }, 0.1, "-=3.3");

    tl4.staggerTo($circles4, 0.01, { fill: "#F13738", scale: 2 }, 0.1);
    tl4.staggerTo($circles4, 0.01, { fill: "#1D2028", scale: 1 }, 0.1, "-=7.3");

    tl5.staggerTo($circles5, 0.01, { fill: "#F13738", scale: 2 }, 0.1);
    tl5.staggerTo($circles5, 0.01, { fill: "#1D2028", scale: 1 }, 0.1, "-=2");

    tl6.staggerTo($circles6, 0.01, { fill: "#F13738", scale: 2 }, -0.1);
    tl6.staggerTo($circles6, 0.01, { fill: "#1D2028", scale: 1 }, -0.1, "-=3.3");

    tl7.staggerTo($circles7, 0.01, { fill: "#F13738", scale: 2 }, -0.1);
    tl7.staggerTo($circles7, 0.01, { fill: "#1D2028", scale: 1 }, -0.1, "-=1");

    tl8.staggerTo($circles8, 0.01, { fill: "#F13738", scale: 2 }, 0.1);
    tl8.staggerTo($circles8, 0.01, { fill: "#1D2028", scale: 1 }, 0.1, "-=10.6");


    cubetl.to($cube1, 1, { y: 55, autoAlpha: 0, delay: 3 })



    cubetl2.to($cube2, 2.5, { y: -210, autoAlpha: 1, delay: 3, ease: Expo.easeOut })
    cubetl2.to($cube2, 1, { x: 91.244, y: -338.96, delay: 3 })

}







document.addEventListener("DOMContentLoaded", () => {
    // Init Context
    const c = document.createElement('canvas').getContext('2d');
    var container = document.getElementById("intro-svg-dots");
    const postctx = container.appendChild(document.createElement('canvas')).getContext('2d');
    const canvas = c.canvas;
    const vertices = [];

    // Effect Properties
    const vertexCount = 4000; // 7000
    const vertexSize = 3;
    const oceanWidth = 100; // 204
    const oceanHeight = -80;
    const gridSize = 20; // 32
    const waveSize = 20;
    const perspective = 400;

    // Common variables
    const depth = (vertexCount / oceanWidth * gridSize);
    let frame = 0;
    const { sin, cos } = Math;

    // Render loop
    const loop = () => {
        frame++;
        if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) {
            postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth;
            postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight;
        }


        c.fillStyle = `hsl(240deg, 50%, 4%)`;
        
        // c.fillStyle = '#1A1C28';
        c.fillRect(0, 0, canvas.width, canvas.height);
        
        c.save();
        c.translate(canvas.width / 2, canvas.height / 2);

        c.beginPath();
        vertices.forEach((vertex, i) => {
            let x = vertex[0] - frame % (gridSize * 2);

            /*------ SPEED SETTINGS------*/
            const z = vertex[2] - frame * 0.5 % gridSize + (i % 2 === 0 ? gridSize / 2 : 0);
            const wave = (
                cos(frame / 90 + x / 50) -
                sin(frame / 40 + z / 50) +
                sin(frame / 60 + z * x / 10000)
            );


            
            let y = vertex[1] + wave * waveSize;
            const a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth);

            y -= oceanHeight;

            x /= z / perspective;
            y /= z / perspective;


            if (a < 0.01) return;
            if (z < 0) return;


            c.globalAlpha = a;
            c.fillStyle = `hsl(${240 + wave * 4}deg, 85%, 46%)`;
            c.fillRect(x - a * vertexSize / 2, y - a * vertexSize / 2, a * vertexSize, a * vertexSize);
            c.globalAlpha = 1;
        });
        c.restore();

        // Post-processing
        postctx.drawImage(canvas, 0, 0);

        postctx.globalCompositeOperation = 'screen';
        postctx.drawImage(canvas, 0, 0);
        postctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame(loop);
    };

    // Generating dots
    for (let i = 0; i < vertexCount; i++) {
        const x = i % oceanWidth;
        const y = 0;
        const z = i / oceanWidth >> 0;
        const offset = oceanWidth / 2;
        vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize]);
    }

    loop();
});




document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        const divs = document.querySelectorAll('div[data-svg]');

        for (const div of divs) {
            const name = div.getAttribute('data-svg')?.trim();
            if (!name) continue; // bỏ qua nếu value rỗng

            try {
                // fetch file svg tương ứng
                const response = await fetch(`../assets/${name}.svg`);
                if (!response.ok) throw new Error(`Không load được SVG: ${name}`);

                const svgText = await response.text();

                // chèn nội dung svg vào div
                div.innerHTML = svgText;
            } catch (err) {
                console.error(err);
            }
        }
    })();
});




document.addEventListener("DOMContentLoaded", () => {
    // Lưu trạng thái trước
    let lastIsDark = null;

    // Hàm áp theme dựa trên attribute
    function updateTheme() {
        const isDark = document.documentElement.hasAttribute('native-dark-active');
        if (isDark !== lastIsDark) {
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            console.log('Applied theme:', isDark ? 'dark' : 'light');
            lastIsDark = isDark;
        }
    }

    // Chạy ngay khi load page
    updateTheme();

    // Lắng nghe sự thay đổi attribute native-dark-active
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'native-dark-active') {
                updateTheme();
            }
        }
    });

    observer.observe(document.documentElement, { attributes: true });
});


