window.addEventListener("mousemove", function (dets) {
    const leftImage = document.querySelector("#left-image");
    const rightImage = document.querySelector("#right-image");
    const leftTitle = document.querySelector("#left-title");
    const rightTitle = document.querySelector("#right-title");
    const leftLayer = document.querySelector(".left-layer");
    const rightLayer = document.querySelector(".right-layer");
    const xPosition = dets.clientX;

    const fullWidth = window.innerWidth;
    const halfWidth = fullWidth / 2;
    const maxEffectWidth = fullWidth * 0.8;
    const navbarHeight = window.innerHeight * 0.1;
    const triggerAreaHeight = window.innerHeight * 0.5;

    if (dets.clientY >= navbarHeight && dets.clientY < triggerAreaHeight + navbarHeight) {
        const effectiveXPosition = Math.min(maxEffectWidth, xPosition);

        const leftWidth = gsap.utils.clamp(0, halfWidth, effectiveXPosition);
        const rightWidth = gsap.utils.clamp(0, halfWidth, fullWidth - effectiveXPosition);

        // Adjust layer widths
        gsap.to(leftLayer, { width: `${rightWidth}px` });
        gsap.to(rightLayer, { width: `${leftWidth}px` });

        // Adjust opacity and move images in opposite directions
        const imageOffset = 15; // Adjust this value for desired movement
        gsap.to([leftImage, leftTitle], {
            opacity: gsap.utils.clamp(.1, 1, xPosition / fullWidth),
            x: xPosition < halfWidth ? imageOffset : 0,
            duration: 0.8,
            ease: "power2.out" // Smoother movement
        });
        gsap.to([rightImage, rightTitle], {
            opacity: gsap.utils.clamp(.1, 1, 1 - (xPosition / fullWidth)),
            x: xPosition < halfWidth ? 0 : -imageOffset,
            duration: 0.8,
            ease: "power2.out"
        });
    } else {
        // Reset to original positions
        gsap.to(leftLayer, { width: "50%" });
        gsap.to(rightLayer, { width: "50%" });
        gsap.to([leftImage, leftTitle, rightImage, rightTitle], {
            opacity: 1,
            x: 0, // Reset image positions
            duration: 0.5
        });
    }
});

// Create the timeline
const tl = gsap.timeline({
    opacity: 0,
    duration: .6,
    stagger: .5
});

tl.from("#nav", {
    y: -100,
});

tl.from("#sections", {
    y: -100,
});

tl.from("#social-icons", {
    y: -100,
});

tl.from("#hero-section", {
    opacity: 0,
  
});
tl.from("#titles", {
    opacity: 0,
    scale: 0,
});
tl.from("#hero-image", {
    opacity: 0,
});
tl.from("#work", {
    scale:0
});
tl.from("footer", {
    y:100
});

let scene,camera,renderer;

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PrespectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);

    hlight = new THREE.AmbientLight (0x404040,100);
    scene.add(hlight);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);

    document.body.appendChild(renderer.domElement);

    let loader = new THREE.GLTFLoader();
    loader.load('./Model/scene.gltf',function(gltf){
        scene.add(gltf.scene);
        renderer.render(scene,camera);
    })
    init();
}

