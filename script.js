// Typing animation with academic identity text
const texts = [
  "Chemical Engineering Student",
  "Aspiring PhD Candidate",
  "Bioprocess Engineering Researcher"
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
// === Modal PDF and MATLAB code viewer functionality ===
(() => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const closeModalBtn = document.querySelector('.close-modal');
  const pdfViewer = document.getElementById('pdf-viewer');
  const codeViewer = document.getElementById('code-viewer');

  // Open PDF modal
  document.querySelectorAll('.view-pdf').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const src = el.getAttribute('data-src');
      modalTitle.textContent = `Viewing PDF: ${src.split('/').pop()}`;
      pdfViewer.src = src;
      pdfViewer.style.display = 'block';
      codeViewer.style.display = 'none';
      showModal();
    });
  });

  // Open MATLAB code modal
  document.querySelectorAll('.view-code').forEach(el => {
    el.addEventListener('click', async e => {
      e.preventDefault();
      const src = el.getAttribute('data-src');
      modalTitle.textContent = `Viewing Code: ${src.split('/').pop()}`;
      pdfViewer.style.display = 'none';
      codeViewer.style.display = 'block';
      codeViewer.textContent = 'Loading...';
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error('Failed to load file.');
        const codeText = await response.text();
        codeViewer.textContent = codeText;
      } catch {
        codeViewer.textContent = 'Error loading code file.';
      }
      showModal();
    });
  });

  function showModal() {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    closeModalBtn.focus();
  }

  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    pdfViewer.src = '';
    codeViewer.textContent = '';
  }

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (modal.style.display === 'flex' && e.key === 'Escape') closeModal();
  });

  // Project filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      const filter = button.getAttribute('data-filter');
      projects.forEach(proj => {
        if (filter === 'all' || proj.getAttribute('data-category') === filter) {
          proj.style.display = 'flex';
          proj.setAttribute('tabindex', '0');
        } else {
          proj.style.display = 'none';
          proj.setAttribute('tabindex', '-1');
        }
      });
    });
  });
})();

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
