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

// Modal functionality (for certificates, project pdf/code viewer)
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close-modal');
const pdfViewer = document.getElementById('pdf-viewer');
const codeViewer = document.getElementById('code-viewer');
const modalTitle = document.getElementById('modalTitle');

function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  pdfViewer.src = '';
  pdfViewer.style.display = 'none';
  codeViewer.style.display = 'none';
  codeViewer.textContent = '';
  modalTitle.textContent = '';
}

// Focus trap inside modal for accessibility
const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select';
let focusableElements = [];
let firstFocusable, lastFocusable;

function setupModalAccessibility() {
  if (!modal) return;
  focusableElements = modal.querySelectorAll(focusableSelectors);
  firstFocusable = focusableElements[0];
  lastFocusable = focusableElements[focusableElements.length -1];
  firstFocusable.focus();

  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'Tab') {
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
}

// Open modal for certificates (education.html)
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const pdfPath = btn.getAttribute('data-pdf');
    const imgPath = btn.getAttribute('data-img');
    pdfViewer.src = pdfPath;
    pdfViewer.style.display = 'block';
    codeViewer.style.display = 'none';
    codeViewer.textContent = '';
    modalTitle.textContent = "Certificate Preview";
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    setupModalAccessibility();
  });
});

// Projects modal viewer for pdf and code
document.querySelectorAll('.view-pdf').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const src = link.getAttribute('data-src');
    pdfViewer.src = src;
    pdfViewer.style.display = 'block';
    codeViewer.style.display = 'none';
    codeViewer.textContent = '';
    modalTitle.textContent = "Project Report PDF";
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    setupModalAccessibility();
  });
});
document.querySelectorAll('.view-code').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const src = link.getAttribute('data-src');
    fetch(src)
      .then(response => response.text())
      .then(data => {
        codeViewer.textContent = data;
        codeViewer.style.display = 'block';
        pdfViewer.style.display = 'none';
        pdfViewer.src = '';
        modalTitle.textContent = "Project MATLAB Code";
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        setupModalAccessibility();
      })
      .catch(() => {
        codeViewer.textContent = "Failed to load code.";
      });
  });
});

// Close modal event listeners
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Filter buttons for projects page
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

window.addEventListener("DOMContentLoaded", () => {
  typeText();
});
