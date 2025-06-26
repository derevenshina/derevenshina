// Theme toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});

// BG animation
const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function getParticleColor() {
  const theme = document.documentElement.getAttribute('data-theme');
  return theme === 'light' ? '#4a0072aa' : '#bb86fc44';
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = getParticleColor();
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(draw);
}

draw();

// Интро исчезает
setTimeout(() => {
  const intro = document.getElementById('intro');
  intro.classList.add('fade-out');
}, 2000);

// Появление основного контента и карточек
setTimeout(() => {
  const mainContent = document.getElementById('main-content');
  mainContent.classList.remove('hidden');
  mainContent.classList.add('visible');

  const cards = document.querySelectorAll('.app-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, 300 + index * 200);
  });
}, 4200);

// === Переключение между карточками ===
const appsNav = document.getElementById('apps-nav');
const dataNav = document.getElementById('data-nav');
const androidCard = document.getElementById('android');
const windowsCard = document.getElementById('windows');
const dataCard = document.getElementById('data-card');

appsNav.addEventListener('click', (e) => {
  e.preventDefault();
  dataCard.classList.remove('visible');
  dataCard.classList.add('hidden');
  setTimeout(() => {
    dataCard.style.display = 'none';
    androidCard.classList.remove('hidden');
    windowsCard.classList.remove('hidden');
    setTimeout(() => {
      androidCard.classList.add('visible');
      windowsCard.classList.add('visible');
    }, 20);
  }, 400);
});

dataNav.addEventListener('click', (e) => {
  e.preventDefault();
  androidCard.classList.remove('visible');
  windowsCard.classList.remove('visible');
  setTimeout(() => {
    androidCard.classList.add('hidden');
    windowsCard.classList.add('hidden');
    dataCard.style.display = '';
    setTimeout(() => {
      dataCard.classList.remove('hidden');
      dataCard.classList.add('visible');
    }, 20);
  }, 400);
});
