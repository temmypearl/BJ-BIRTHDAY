// CONFETTI EFFECT
const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiPieces = Array.from({ length: 100 }, () => ({
  x: Math.random() * confettiCanvas.width,
  y: Math.random() * confettiCanvas.height,
  r: Math.random() * 6 + 2,
  dx: Math.random() - 0.5,
  dy: Math.random() * 2 + 1,
  color: `hsl(${Math.random() * 360}, 100%, 70%)`
}));

function drawConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    confettiCtx.beginPath();
    confettiCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fill();
  });
}

function updateConfetti() {
  confettiPieces.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.y > confettiCanvas.height) p.y = -10;
  });
}

function animateConfetti() {
  drawConfetti();
  updateConfetti();
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// AUDIO CONTROL
const audio = document.getElementById("birthdayAudio");
const btn = document.getElementById("audioBtn");
btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btn.textContent = "🔊";
  } else {
    audio.pause();
    btn.textContent = "🔇";
  }
});
