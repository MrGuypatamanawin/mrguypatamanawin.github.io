// -----------------------------
// Language Switch
// -----------------------------
function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-en][data-th]");
  elements.forEach(el => {
    el.textContent = (lang === "en") ? el.dataset.en : el.dataset.th;
  });
}

// -----------------------------
// Intro Overlay with ENTER + Particles
// -----------------------------
window.addEventListener("load", () => {
  const overlay = document.querySelector('.intro-overlay');
  const logo = document.querySelector('.intro-logo');
  const enterBtn = document.querySelector('.enter-btn');
  logo.classList.add('show');

  const hideOverlay = () => {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.classList.add("loaded");
    }, 1000);
  };

  enterBtn.addEventListener('click', hideOverlay);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') hideOverlay();
  });

  // Particles
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,191,255,0.7)';
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
});

// -----------------------------
// Navbar scroll effect
// -----------------------------
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// -----------------------------
// Hamburger menu toggle
// -----------------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => navMenu.classList.toggle('show'));

// -----------------------------
// Product Slider + Lazy Load + Modal + Swipe
// -----------------------------
const container = document.querySelector('.product-container');
const slides = document.querySelectorAll('.product-slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let index = 0;

function lazyLoad() {
  slides.forEach(slide => {
    const img = slide.querySelector('.lazy');
    if (img.dataset.src && img.getBoundingClientRect().left < window.innerWidth) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });
}
window.addEventListener('scroll', lazyLoad);
lazyLoad();

function showSlide(i) {
  if (i < 0) index = slides.length - 1;
  else if (i >= slides.length) index = 0;
  else index = i;
  container.style.transform = `translateX(-${index * 100}%)`;
}
prev.addEventListener('click', () => showSlide(index - 1));
next.addEventListener('click', () => showSlide(index + 1));

let slideInterval = setInterval(() => showSlide(index + 1), 3000);
container.addEventListener('mouseenter', () => clearInterval(slideInterval));
container.addEventListener('mouseleave', () => slideInterval = setInterval(() => showSlide(index + 1), 3000));

// Modal
const modal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modal-img');

slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    modalTitle.textContent = slide.dataset.title;
    modalDesc.textContent = slide.dataset.desc;
    modalImg.src = slide.querySelector('img').src;
    modal.style.display = 'flex';
  });
});
document.querySelector('.modal-close').addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// Swipe Support
let touchStartX = 0,
  touchEndX = 0;
container.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});
container.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX - 50) showSlide(index + 1);
  else if (touchEndX > touchStartX + 50) showSlide(index - 1);
});

// -----------------------------
// Back-to-top button
// -----------------------------
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => window.scrollTo({
  top: 0,
  behavior: 'smooth'
}));

// -----------------------------
// Fade-in on scroll
// -----------------------------
const faders = document.querySelectorAll('.fade-start');
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('loaded');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));