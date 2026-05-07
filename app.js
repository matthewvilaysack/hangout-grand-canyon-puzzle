// shooting star canvas
(function () {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let w = 0, h = 0;
  let stars = [];
  let shootingStars = [];

  function resize() {
    const parent = canvas.parentElement || document.body;
    const rect = parent.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedStars();
  }

  function seedStars() {
    stars = [];
    const count = Math.floor((w * h) / 9000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.6,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.7 + 0.2,
        tw: Math.random() * 0.02 + 0.005,
        td: Math.random() < 0.5 ? 1 : -1,
      });
    }
  }

  function spawnShootingStar() {
    const fromLeft = Math.random() < 0.5;
    shootingStars.push({
      x: fromLeft ? -50 : w + 50,
      y: Math.random() * h * 0.5,
      vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 4),
      vy: 2 + Math.random() * 2,
      life: 0,
      maxLife: 80 + Math.random() * 40,
      tail: [],
    });
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);

    // background stars
    for (const s of stars) {
      s.a += s.tw * s.td;
      if (s.a > 0.9) s.td = -1;
      if (s.a < 0.2) s.td = 1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 234, 216, ${s.a})`;
      ctx.fill();
    }

    // shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      ss.tail.push({ x: ss.x, y: ss.y });
      if (ss.tail.length > 18) ss.tail.shift();
      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.life++;

      // tail
      for (let t = 0; t < ss.tail.length; t++) {
        const pt = ss.tail[t];
        const a = (t / ss.tail.length) * 0.6;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241, 200, 124, ${a})`;
        ctx.fill();
      }

      // head
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 240, 200, 0.95)";
      ctx.fill();

      if (ss.life > ss.maxLife || ss.x < -100 || ss.x > w + 100 || ss.y > h) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);
  tick();

  // periodic shooting stars
  function loop() {
    spawnShootingStar();
    setTimeout(loop, 2200 + Math.random() * 3500);
  }
  setTimeout(loop, 800);

  // expose for cards
  window.__shoot = spawnShootingStar;
})();

// year stamp
document.getElementById("year-stamp").textContent = new Date().getFullYear();

// star cards: click sends a shooting star + animates the card star
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    if (window.__shoot) window.__shoot();
    card.classList.add("shooting");
    setTimeout(() => card.classList.remove("shooting"), 1200);
  });
});

// donation buttons (decorative)
const status = document.getElementById("tip-status");
const messages = {
  1: "One piece of the canyon. Noted with love.",
  5: "A corner set! The puzzle leans on you.",
  20: "The whole sky. Thank you, kind soul.",
  100: "The whole canyon. Legendary energy.",
};

document.querySelectorAll(".tip-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const amt = btn.dataset.amount;
    if (status) status.textContent = messages[amt] || "Thank you.";
    if (window.__shoot) {
      window.__shoot();
      window.__shoot();
    }
  });
});
