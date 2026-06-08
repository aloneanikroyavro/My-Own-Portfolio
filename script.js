/* ══════════════════════════════════════════
   1. DARK MODE TOGGLE
══════════════════════════════════════════ */
const darkToggle = document.getElementById('darkToggle');
const html = document.documentElement;

// Start in dark mode by default
html.setAttribute('data-theme', 'dark');

darkToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  darkToggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
});

/* ══════════════════════════════════════════
   2. D-DAY COUNTER
   Target: March 3, 2026 — arrival in Korea
══════════════════════════════════════════ */
function updateDDay() {
  const arrivalDate = new Date('2026-03-03'); // Change this date for live eval!
  const today = new Date();
  const diffMs = today - arrivalDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  document.getElementById('ddayCount').textContent = diffDays;
}

updateDDay();
setInterval(updateDDay, 60000);

/* ══════════════════════════════════════════
   3. HOBBY GALLERY — JS ARRAY + NEXT BUTTON
══════════════════════════════════════════ */
const hobbies = [
  {
    img: 'C:\\Users\\Acer\\OneDrive\\Documents\\Pictures\\Camera Roll\\Blog_Images_Large_394ccf2b-003d-4edd-8d88-8604300974fb.webp',
    title: 'Cricket',
    desc: 'Cricket is my passion — the energy of the game, the team spirit, and every boundary hit reminds me of home in Bangladesh.'
  },
  {
    img: 'C:\\Users\\Acer\\OneDrive\\Documents\\Pictures\\Camera Roll\\ai-what-is-it.webp',
    title: 'Artificial Intelligence',
    desc: 'AI fascinates me — from machine learning to generative models, I love exploring how intelligent systems are reshaping the world.'
  },
  {
    img: 'C:\\Users\\Acer\\OneDrive\\Documents\\Pictures\\Camera Roll\\istockphoto-177427917-612x612.jpg',
    title: 'Cooking',
    desc: 'Cooking connects me to my roots. Preparing Bangladeshi recipes in Korea keeps me grounded and reminds me of home.'
  }
];

let currentIndex = 0;

function renderGallery(index) {
  const hobby = hobbies[index];

  // Update image
  document.getElementById('galleryImg').src = hobby.img;
  document.getElementById('galleryImg').alt = hobby.title;

  // Update text
  document.getElementById('galleryTitle').textContent = hobby.title;
  document.getElementById('galleryDesc').textContent = hobby.desc;

  // Update counter
  const num = String(index + 1).padStart(2, '0');
  const total = String(hobbies.length).padStart(2, '0');
  document.getElementById('galleryIndex').textContent = `${num} / ${total}`;

  // Update dots
  hobbies.forEach((_, i) => {
    const dot = document.getElementById(`gdot${i}`);
    if (dot) dot.classList.toggle('active', i === index);
  });
}

// Next button click
document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % hobbies.length;
  renderGallery(currentIndex);
});

// Dot click navigation
hobbies.forEach((_, i) => {
  const dot = document.getElementById(`gdot${i}`);
  if (dot) {
    dot.addEventListener('click', () => {
      currentIndex = i;
      renderGallery(currentIndex);
    });
  }
});

// Initialize gallery
renderGallery(0);

/* ══════════════════════════════════════════
   4. GUESTBOOK FORM
══════════════════════════════════════════ */
const entries = [];

document.getElementById('submitBtn').addEventListener('click', () => {
  const name = document.getElementById('gName').value.trim();
  const message = document.getElementById('gMessage').value.trim();
  const msgEl = document.getElementById('guestMsg');

  if (!name || !message) {
    msgEl.textContent = '⚠ Please fill in your name and message.';
    msgEl.style.color = '#d45a2a';
    return;
  }

  entries.unshift({ name, message });
  renderEntries();

  // Clear inputs
  document.getElementById('gName').value = '';
  document.getElementById('gEmail').value = '';
  document.getElementById('gMessage').value = '';

  msgEl.textContent = '✅ Message sent! Thank you!';
  msgEl.style.color = '#2a6e4a';
  setTimeout(() => { msgEl.textContent = ''; }, 3000);
});

function renderEntries() {
  const list = document.getElementById('entriesList');
  list.innerHTML = entries.map(e => `
    <div class="gb-entry">
      <div class="gb-entry-name">${e.name}</div>
      <div class="gb-entry-msg">${e.message}</div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   5. NAVBAR SCROLL EFFECT
══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
