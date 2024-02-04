function initializePage() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  locoScroll.update();
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar1");
    const menuIcon = document.querySelector(".ri-menu-line");

    menuIcon.addEventListener("click", function () {
      toggleNavbar();
    });

    function toggleNavbar() {
      const currentMarginLeft = parseInt(navbar.style.marginLeft) || 0;

      if (currentMarginLeft === -25) {
        navbar.style.transition = "margin-left 0.5s ease";
        navbar.style.marginLeft = "100%";
      } else {
        navbar.style.transition = "margin-left 0.5s ease";
        navbar.style.marginLeft = "-25%";
      }
    }
  });

  gsap.registerPlugin('mouseFollow');

  document.addEventListener("DOMContentLoaded", () => {
    const kite = document.getElementById("kite");

    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastDirection = 0;
    let sway = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function update() {
      const angle = Math.atan2(mouseY - window.innerHeight / 2, mouseX - window.innerWidth / 2);
      const distance = Math.min(Math.sqrt((mouseX - window.innerWidth / 2) ** 2 + (mouseY - window.innerHeight / 2) ** 2), 1000);

      const swayOffset = 15 * Math.sin(sway);
      const windForce = Math.random() * 2 - 1;
      const x = mouseX - kite.clientWidth / 3 + swayOffset + windForce * 5;
      const y = mouseY - kite.clientHeight / 3 - Math.min(Math.abs(mouseX - lastMouseX) / 5, 20);

      const currentX = parseFloat(kite.style.left.replace(/[^0-9.-]/g, '')) || 0;
      const currentY = parseFloat(kite.style.top.replace(/[^0-9.-]/g, '')) || 0;
      const newX = currentX + 0.2 * (x - currentX);
      const newY = currentY + 0.2 * (y - currentY);

      const currentDirection = mouseX > window.innerWidth / 2 ? 1 : -1;
      const directionDiff = currentDirection - lastDirection;
      const easingMultiplier = 0.9 + Math.abs(directionDiff);

      kite.style.left = `${newX}px`;
      kite.style.top = `${newY}px`;

      const targetAngle = angle + Math.PI / 2.5;
      const currentAngle = parseFloat(kite.style.transform.replace(/[^0-9.-]/g, '')) || 0;
      const newAngle = currentAngle + easingMultiplier * (targetAngle - currentAngle);

      kite.style.transform = `rotate(${newAngle}rad)`;

      sway += 0.05;
      lastMouseX = mouseX;
      lastDirection = currentDirection;

      requestAnimationFrame(update);
    }

    document.body.style.cursor = 'none';
    kite.style.display = 'block';

    update();

    document.addEventListener('mousemove', function (e) {
      kite.style.left = e.pageX - kite.clientWidth / 2 + 'px';
      kite.style.top = e.pageY - kite.clientHeight / 2 + 'px';
    });
  });
}

initializePage();

const tl = gsap.timeline();

tl.from("#nav",{
  y:-200,
  duration:1.2
})

tl.from("#about #left",{
  x:-100,
  opacity:0
})
tl.from("#about #right",{
  x:100,
  opacity:0,
  
})
tl.from("#about-images",{
  scale:0
})
tl.from("#chart #left-data",{
  x:-100,
  opacity:0,
  scrollTrigger: {
    trigger: "#left-data",
    scroller: "#main",
    scrub: true,
    start: "top 80%",
    end: "top 30%",
    // markers:true,
   
  },

})
tl.from("#chart #mid-data",{
  scale:0,
  rotate:360,
  scrollTrigger: {
    trigger: "#mid-data",
    scroller: "#main",
    scrub: true,
    start: "top 80%",
    end: "top 30%",
    // markers:true,
   
  },

})
tl.from("#chart #right-data",{
  x:100,
  opacity:0,
  scrollTrigger: {
    trigger: "#right-data",
    scroller: "#main",
    scrub: true,
    start: "top 80%",
    end: "top 30%",
    // markers:true,
   
  },

})
tl.from("#randomFacts #left-fact",{
  x:-200,
  opacity:0,
  duration:1,
  scrollTrigger: {
    trigger: "#randomFacts #left-fact",
    scroller: "#main",
    scrub: 2,
    start: "top 40%",
    end: "top bottom",
    // markers:true,
    // stagger:1,
  },
})
tl.from("#randomFacts #right-fact",{
  x:200,
  opacity:0,
  duration:1,
  scrollTrigger: {
    trigger: "#randomFacts #right-fact",
    scroller: "#main",
    scrub: 2,
    start: "top 60%",
    end: "top bottom",
    // markers:true,
    // stagger:1,
  },
})
tl.from("#skills-graph",{
  y:100,
  opacity:0,
  duration:1,
  stagger:1,
  scrollTrigger: {
    trigger: "#skills-graph",
    scroller: "#main",
    scrub: 2,
    start: "top 50%",
    end: "top bottom",
    // markers:true,
    // stagger:1,
  },
})

tl.from("#story-detail",{
  x:-200,
  opacity:0,
  scrollTrigger: {
    trigger: "#story-detail",
    scroller: "#main",
    scrub: 4,
    start: "top 60%",
    end: "top bottom",
    // markers:true,
    // stagger:1,
  },
})
tl.from("#story-image",{
  x:200,
  opacity:0,
  scrollTrigger: {
    trigger: "#story-image",
    scroller: "#main",
    scrub: 4,
    start: "top 60%",
    end: "top bottom",
    // markers:true,
    // stagger:1,
  },
})