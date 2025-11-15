// ======= TYPING EFFECT =======
document.addEventListener("DOMContentLoaded", () => {
  const text = "Wishing you a day filled with love, laughter, and endless joy 💖";
  const output = document.getElementById("typedText");
  let i = 0;

  function type() {
    if (i < text.length) {
      output.textContent += text[i];
      i++;
      setTimeout(type, 50);
    }
  }
  type();
});

// ======= CONFETTI EFFECT =======
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

function resizeConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeConfetti();
window.addEventListener("resize", resizeConfetti);

const confettiPieces = Array.from({ length: 150 }, () => ({
  x: Math.random() * confettiCanvas.width,
  y: Math.random() * confettiCanvas.height,
  r: Math.random() * 5 + 2,
  dx: (Math.random() - 0.5) * 1.5,
  dy: Math.random() * 2 + 1,
  tilt: Math.random() * 10,
  tiltAngle: Math.random() * 0.1,
  color: `hsl(${Math.random() * 360},100%,70%)`
}));

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
}

function updateConfetti() {
  confettiPieces.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    p.tiltAngle += 0.02;
    p.tilt = Math.sin(p.tiltAngle) * 5;

    if (p.y > confettiCanvas.height || p.x < 0 || p.x > confettiCanvas.width) {
      p.x = Math.random() * confettiCanvas.width;
      p.y = -10;
    }
  });
}

function animateConfetti() {
  drawConfetti();
  updateConfetti();
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// ======= AUDIO CONTROL =======
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

// ======= WISHES WITH LOCAL STORAGE =======
const wishInput = document.getElementById("wishText");
const wishBtn = document.getElementById("wishBtn");
const wishList = document.getElementById("wishList");

// Load saved wishes from localStorage
const savedWishes = JSON.parse(localStorage.getItem("birthdayWishes")) || [];
savedWishes.forEach(text => addWishToDOM(text));

wishBtn.addEventListener("click", addWish);
wishInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addWish(); });

function addWish() {
  const text = wishInput.value.trim();
  if (!text) return;

  // Add to DOM
  addWishToDOM(text);

  // Save to localStorage
  savedWishes.unshift(text); // newest first
  localStorage.setItem("birthdayWishes", JSON.stringify(savedWishes));

  wishInput.value = "";
}

function addWishToDOM(text) {
  const div = document.createElement("div");
  div.className = "wish-item";
  div.textContent = text;
  wishList.prepend(div);
}
