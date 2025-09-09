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
            const res = await fetch("components/intro-svg.html");
            if (!res.ok) throw new Error(`Cannot load intro-svg.html: ${res.status}`);
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