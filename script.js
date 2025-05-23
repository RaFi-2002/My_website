// Typing animation for academic identity
const texts = [
  "Chemical Engineering Student",
  "Aspiring PhD Candidate",
  "Bioprocess Engineering Researcher"
];
let currentTextIndex = 0;
let charIndex = 0;
const typingSpeed = 65;
const erasingSpeed = 30;
const delayBetweenTexts = 1750;
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

// Modal accessibility and interactivity
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close-modal');
const pdfViewer = document.getElementById('pdf-viewer');
const codeViewer = document.getElementById('code-viewer');
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modal-img');

function closeModal() {
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  if (pdfViewer) {
    pdfViewer.src = '';
    pdfViewer.style.display = 'none';
  }
  if (codeViewer) {
    codeViewer.style.display = 'none';
    codeViewer.textContent = '';
  }
  if (modalTitle) modalTitle.textContent = '';
  if (modalImg) modalImg.src = '';
}

function setupModalAccessibility() {
  if (!modal) return;
  const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex="0"]';
  const focusableElements = modal.querySelectorAll(focusableSelectors);
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  if (firstFocusable) firstFocusable.focus();

  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex' || modal.getAttribute('aria-hidden') === 'false') {
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

// Certificate modal for Education page
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const pdfPath = btn.getAttribute('data-pdf');
    const imgPath = btn.getAttribute('data-img');
    if (pdfViewer) {
      pdfViewer.src = pdfPath;
      pdfViewer.style.display = 'block';
    }
    if (codeViewer) {
      codeViewer.style.display = 'none';
      codeViewer.textContent = '';
    }
    if (modalTitle) modalTitle.textContent = "Certificate Preview";
    if (modalImg && imgPath) modalImg.src = imgPath;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    setupModalAccessibility();
  });
});

// PDF and code modal for projects
document.querySelectorAll('.view-pdf').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const src = link.getAttribute('data-src');
    if (pdfViewer) {
      pdfViewer.src = src;
      pdfViewer.style.display = 'block';
    }
    if (codeViewer) {
      codeViewer.style.display = 'none';
      codeViewer.textContent = '';
    }
    if (modalTitle) modalTitle.textContent = "Project Report PDF";
    if (modalImg) modalImg.src = '';
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
        if (codeViewer) {
          codeViewer.textContent = data;
          codeViewer.style.display = 'block';
        }
        if (pdfViewer) {
          pdfViewer.style.display = 'none';
          pdfViewer.src = '';
        }
        if (modalTitle) modalTitle.textContent = "Project MATLAB Code";
        if (modalImg) modalImg.src = '';
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        setupModalAccessibility();
      })
      .catch(() => {
        if (codeViewer) codeViewer.textContent = "Failed to load code.";
      });
  });
});
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
// Modal functionality for PDF and code viewing
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const closeModalBtn = document.querySelector('.close-modal');
const pdfViewer = document.getElementById('pdf-viewer');
const codeViewer = document.getElementById('code-viewer');

// Open PDF modal
document.querySelectorAll('.view-pdf').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const src = el.getAttribute('data-src');
    modalTitle.textContent = `Viewing PDF: ${src.split('/').pop()}`;
    pdfViewer.src = src;
    pdfViewer.style.display = 'block';
    codeViewer.style.display = 'none';
    showModal();
  });
});

// Open code modal (MATLAB .m files)
document.querySelectorAll('.view-code').forEach(el => {
  el.addEventListener('click', async (e) => {
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
    } catch (err) {
      codeViewer.textContent = 'Error loading code file.';
    }
    showModal();
  });
});

function showModal() {
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  // Trap focus inside modal if needed
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
  if (modal.style.display === 'flex' && e.key === 'Escape') {
    closeModal();
  }
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

// Project filtering
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

// Animate typing on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  typeText();
});
