// gsap.registerPlugin(ScrollTrigger);

// // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector("#main"),
//   smooth: true
// });
// // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
// locoScroll.on("scroll", ScrollTrigger.update);

// // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
// ScrollTrigger.scrollerProxy("#main", {
//   scrollTop(value) {
//     return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//   }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//   getBoundingClientRect() {
//     return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
//   },
//   // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//   pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
// });



const tl = gsap.timeline({
    scrollTrigger: {
        scroller: "body",
        markers: true,
    }
});

// Add animations to the timeline
tl.from('#left', {
    x: -400,
    opacity: 0,
    duration: 1,
    start: "top 20%",
    end: "top 40%",
});

tl.from('#left-fact', {
    x: -400,
    opacity: 0,
    duration: 1,
    start: "top 50%",
    end: "top 60%",
});

tl.from('#right', {
    x: 400,
    opacity: 0,
    duration: 1,
    start: "top 50%",
    end: "top 60%",
});

tl.from('#about-images', {
    scale: 0,
    opacity: 0,
    duration: 1,
    start: "top 30%",
    end: "top 40%",
});

tl.from('#right-fact', {
    x: 400,
    opacity: 0,
    duration: 1,
    start: "top 50%",
    end: "top 60%",
});

tl.from('#left-data', {
    x: -400,
    opacity: 0,
    duration: 1,
});

tl.from('#right-data', {
    x: 400,
    opacity: 0,
    duration: 1,
});

// You can continue adding more animations to the timeline...

// Play the timeline
tl.play();

