function loco(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
el: document.querySelector("#main"),
smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
scrollTop(value) {
  return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
}, // we don't have to define a scrollLeft because we're only scrolling vertically.
getBoundingClientRect() {
  return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
},
// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

loco();
  
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
          // Calculate angle and distance for circular movement
          const angle = Math.atan2(mouseY - window.innerHeight / 2, mouseX - window.innerWidth / 2);
          const distance = Math.min(Math.sqrt((mouseX - window.innerWidth / 2) ** 2 + (mouseY - window.innerHeight / 2) ** 2), 1000);
  
          // Calculate horizontal position with sway and wind influence
          const swayOffset = 15 * Math.sin(sway);
          const windForce = Math.random() * 2 - 1;
          const x = mouseX - kite.clientWidth / 3 + swayOffset + windForce * 5;
  
          // Calculate vertical position with lift and float
          const y = mouseY - kite.clientHeight / 3 - Math.min(Math.abs(mouseX - lastMouseX) / 5, 20);
  
          // Interpolate position for smoother movement
          const currentX = parseFloat(kite.style.left.replace(/[^0-9.-]/g, '')) || 0;
          const currentY = parseFloat(kite.style.top.replace(/[^0-9.-]/g, '')) || 0;
          const newX = currentX + 0.2 * (x - currentX); // Adjust 0.1 for desired smoothness
          const newY = currentY + 0.2 * (y - currentY);
  
          // Calculate direction difference for smooth rotation
          const currentDirection = mouseX > window.innerWidth / 2 ? 1 : -1;
          const directionDiff = currentDirection - lastDirection;
          const easingMultiplier = 0.9 + Math.abs(directionDiff);
  
          // Update kite position
          kite.style.left = `${newX}px`;
          kite.style.top = `${newY}px`;
  
          // Calculate target and current angles
          const targetAngle = angle + Math.PI / 2.5;
          const currentAngle = parseFloat(kite.style.transform.replace(/[^0-9.-]/g, '')) || 0;
  
          // Smooth rotation based on direction difference
          const newAngle = currentAngle + easingMultiplier * (targetAngle - currentAngle);
  
          kite.style.transform = `rotate(${newAngle}rad)`;
  
          // Update sway and track mouse position
          sway += 0.05; // Adjust sway speed
          lastMouseX = mouseX;
          lastDirection = currentDirection;
  
          requestAnimationFrame(update);
      }
  
      // Hide default cursor and show custom kite
      document.body.style.cursor = 'none';
      kite.style.display = 'block';
  
      // Initial call to start the animation loop
      update();
  
      // Handle mouse movement and click events for the custom cursor
      document.addEventListener('mousemove', function (e) {
          kite.style.left = e.pageX - kite.clientWidth / 2 + 'px';
          kite.style.top = e.pageY - kite.clientHeight / 2 + 'px';
      });
  
      // document.addEventListener('click', function (e) {
      //     console.log('Clicked at', e.pageX, e.pageY);
          
      // });
  });

  document.addEventListener("DOMContentLoaded", function () {
    var navbar = document.getElementById("navbar1");
    var menuIcon = document.querySelector(".ri-menu-line");
  
    menuIcon.addEventListener("click", function () {
      toggleNavbar();
    });
  
    function toggleNavbar() {
      var currentMarginLeft = parseInt(navbar.style.marginLeft) || 0;
  
      if (currentMarginLeft === -25) {
        navbar.style.transition = "margin-left 0.5s ease";
        navbar.style.marginLeft = "100%";
      } else {
        navbar.style.transition = "margin-left 0.5s ease";
        navbar.style.marginLeft = "-25%";
      }
    }
  });

  const tl = gsap.timeline();

tl.from("#nav",{
    y:-200,
    duration:1.2
})
tl.from("#projects",{
  y:200,
  opacity:0,
  scale:0,
  scrollTrigger: {
    trigger: "#projects-lists",
    scroller: "#main",
    scrub: 4,
    start: "top 30%",
    end: "top bottom",
    // markers:true,
    // stagger:1,
  },
})

