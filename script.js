// Typing animation with academic identity text
const texts = [
"Chemical Engineering Student",
"Aspiring PhD Candidate",
"Available for remote, voluntary research collaboration in chemical and biochemical engineering"
];
let currentTextIndex = 0;
let charIndex = 0;
const typingSpeed = 75;
const erasingSpeed = 40;
const delayBetweenTexts = 2000;
const heroTextElement = document.getElementById("hero-text");
function typeText() {
if (!heroTextElement) return;
if (charIndex < texts[currentTextIndex].length) {
heroTextElement.textContent += texts[currentTextIndex].charAt(charIndex);
charIndex++;
setTimeout(typeText, typingSpeed);
} else {
setTimeout(eraseText, delayBetweenTexts);
}
}
function eraseText() {
if (!heroTextElement) return;
if (charIndex > 0) {
heroTextElement.textContent = texts[currentTextIndex].substring(0, charIndex - 1);
charIndex--;
setTimeout(eraseText, erasingSpeed);
} else {
currentTextIndex = (currentTextIndex + 1) % texts.length;
setTimeout(typeText, typingSpeed);
}
}
window.addEventListener("DOMContentLoaded", () => {
typeText();
setupModalAccessibility();
});
// Modal functionality for certificates viewer (education.html)
function setupModalAccessibility() {
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close-modal');
const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select';
let focusableElements = [];
let firstFocusable, lastFocusable;
if (!modal) return;
document.querySelectorAll('.open-modal').forEach(btn => {
btn.addEventListener('click', () => {
modal.style.display = 'flex';
modal.setAttribute('aria-hidden', 'false');
// Setup focus trap
focusableElements = modal.querySelectorAll(focusableSelectors);
firstFocusable = focusableElements[0];
lastFocusable = focusableElements[focusableElements.length -1];
firstFocusable.focus();
});
});
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
if (modal.style.display === 'flex') {
if (e.key === 'Escape') {
closeModal();
} else if (e.key === 'Tab') {
// Trap focus inside modal
if (document.activeElement === lastFocusable && !e.shiftKey) {
e.preventDefault();
firstFocusable.focus();
} else if (document.activeElement === firstFocusable && e.shiftKey) {
e.preventDefault();
lastFocusable.focus();
}
}
}
});
function closeModal() {
modal.style.display = 'none';
modal.setAttribute('aria-hidden', 'true');
// Clear iframe and img sources
const iframe = modal.querySelector('iframe');
const img = modal.querySelector('img');
if (iframe) iframe.src = '';
if (img) img.src = '';
}
}
// Optional: Smooth scroll for navigation anchors (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', e => {
e.preventDefault();
const target = document.querySelector(anchor.getAttribute('href'));
if (target) {
target.scrollIntoView({ behavior: 'smooth' });
}
});
});
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close-modal');
const pdfViewer = document.getElementById('pdf-viewer');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modalTitle');
const bscTranscriptsList = document.getElementById('bsc-transcripts-list');

// Button to open transcripts list
document.querySelector('.open-modal-transcripts').addEventListener('click', () => {
  // Hide pdf viewer and image
  pdfViewer.style.display = 'none';
  pdfViewer.src = '';
  modalImg.style.display = 'none';
  modalImg.src = '';
  
  // Show the transcripts list
  bscTranscriptsList.style.display = 'block';
  
  modalTitle.textContent = 'B.Sc. Semester Transcripts';
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
});

// Close modal resets
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  
  pdfViewer.src = '';
  pdfViewer.style.display = 'none';
  
  modalImg.src = '';
  modalImg.style.display = 'block';
  
  bscTranscriptsList.style.display = 'none';
  
  modalTitle.textContent = '';
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});
// Toggle abstracts visibility for publication cards
document.querySelectorAll('.toggle-abstract-btn').forEach(button => {
  button.addEventListener('click', () => {
    const abstract = document.getElementById(button.getAttribute('aria-controls'));
    const expanded = button.getAttribute('aria-expanded') === 'true';

    if (abstract) {
      if (expanded) {
        abstract.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
        button.textContent = 'Show Abstract';
        abstract.setAttribute('aria-hidden', 'true');
      } else {
        abstract.style.display = 'block';
        button.setAttribute('aria-expanded', 'true');
        button.textContent = 'Hide Abstract';
        abstract.setAttribute('aria-hidden', 'false');
      }
    }
  });
});
// Project filtering buttons functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active from all buttons
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });

    // Add active to clicked button
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    const filter = button.getAttribute('data-filter');

    projectItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        item.setAttribute('tabindex', '0');
      } else {
        item.style.display = 'none';
        item.setAttribute('tabindex', '-1');
      }
    });
  });
});
const modal = document.getElementById('modal');
const modalPdf = document.getElementById('modal-pdf');
const modalClose = document.getElementById('modal-close');

// Open modal when clicking a certificate card
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const pdfPath = card.getAttribute('data-pdf');
    modalPdf.src = pdfPath;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    modalClose.focus();
  });
  // Keyboard support: Enter or Space opens modal
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// Close modal function
function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  modalPdf.src = '';
}

// Close modal on close button click
modalClose.addEventListener('click', closeModal);

// Close modal on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

