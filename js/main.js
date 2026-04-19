// ============ TYPING ANIMATION ============

const roles = ['Cloud Engineer', 'Platform Engineer', 'Infrastructure Specialist'];
let currentRoleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingEl = document.getElementById('typing-text');

function type() {
  if (!typingEl) return;
  const current = roles[currentRoleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 2200);
      return;
    }
  } else {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      setTimeout(type, 400);
      return;
    }
  }
  setTimeout(type, isDeleting ? 45 : 95);
}

type();

// ============ NAVBAR SCROLL ============

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ============ MOBILE MENU ============

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ============ SCROLL ANIMATIONS ============

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in-scroll').forEach(el => observer.observe(el));

// ============ SKILL BARS ============

let skillsAnimated = false;
const skillsSection = document.getElementById('skills');

const skillWidths = ['90%', '95%', '85%', '90%', '85%'];

const skillObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !skillsAnimated) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-bar').forEach((bar, i) => {
      setTimeout(() => { bar.style.width = skillWidths[i]; }, i * 80);
    });
  }
}, { threshold: 0.3 });

if (skillsSection) skillObserver.observe(skillsSection);

// ============ CONTACT FORM ============

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    window.location.href = `mailto:jkjk128jkjk@hanmail.net?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sent! ✓';
    btn.style.background = 'linear-gradient(135deg,#16a34a,#059669)';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
    }, 2500);
  });
}

// ============ SMOOTH SCROLL ============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
