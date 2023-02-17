const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 35;

const currentFrame = (index) => `./best-ball/${(index + 1).toString()}.jpg`;

const images = [];
let ball = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  console.log(currentFrame(i));
  images.push(img);
}

gsap.to(ball, {
  frame: frameCount -1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    pin: "canvas",
    end: "500%",
  },
  onUpdate: render,
});

gsap.fromTo(
  ".logo-text",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: 1,

      start: "50%",
      end: "110%",
    },
    onComplete: () => {
      gsap.to(".logo-text", { opacity: 0 });
    },
  }
  
);

const jumpingText = document.createElement("div");
jumpingText.classList.add("jumping-text");
jumpingText.textContent = "Scroll Up!";

// Add the jumping text to the document body
document.body.appendChild(jumpingText);

// Animate the jumping text
gsap.to(jumpingText, {
  y: -20, // move the text 20px up
  duration: 0.7, // animation duration
  ease: "power2.inOut", 
  repeat: 6, 
  yoyo: true, 
  onComplete: () => {
   
    setTimeout(() => {
      document.body.removeChild(jumpingText);
    }, 3000);
  },
});




images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
  context.font = '18px Helvetica';
  context.fillStyle = 'white';
 
  const textWidth = context.measureText(text).width;
  const x = canvas.width / 2 - textWidth / 2;
  const y = canvas.height - 30;
  context.fillText(text, x, y);
}


