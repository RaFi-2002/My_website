/**
 * ==========================================================================
 * Rakibul Hasan Rafi - Portfolio Script & Instant Visitor Email Alert
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initTypingEffect();
  initModalHandlers();
  initVisitorEmailTracker();
});

/**
 * 1. Typing Animation for Hero Section (Index Page)
 */
function initTypingEffect() {
  const heroTextElement = document.getElementById("hero-text");
  if (!heroTextElement) return;

  const texts = [
    "Chemical Engineering Student at BUET",
    "Aspiring PhD Candidate & Researcher",
    "Available for remote research collaboration"
  ];
  let textIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < texts[textIndex].length) {
      heroTextElement.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 65);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (charIndex > 0) {
      heroTextElement.textContent = texts[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 35);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 600);
    }
  }

  type();
}

/**
 * 2. PDF & Document Modal Handler (Education, Certificates & Experience)
 */
function initModalHandlers() {
  const modal = document.getElementById('modal');
  if (!modal) return;

  const closeBtn = document.getElementById('modal-close') || document.querySelector('.close-modal');
  const modalPdf = document.getElementById('modal-pdf') || document.getElementById('pdf-viewer');

  // Certificate cards PDF viewer opener
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const pdf = card.getAttribute('data-pdf');
      if (pdf && modalPdf) {
        modalPdf.src = pdf;
        modal.setAttribute('aria-hidden', 'false');
        modal.style.display = 'flex';
      }
    });

    // Keyboard support (Enter or Space key)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // B.Sc Transcripts list opener (if active button exists)
  const transcriptsBtn = document.querySelector('.open-modal-transcripts');
  if (transcriptsBtn) {
    transcriptsBtn.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'flex';
    });
  }

  // Close modal function
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    if (modalPdf) modalPdf.src = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
}

/**
 * 3. Instant Email Visitor Alert Tracker
 * Sends an invisible background ping to Formspree when someone opens your site,
 * triggering an immediate email alert directly to your inbox.
 */
function initVisitorEmailTracker() {
  // Do not trigger email alerts when testing on localhost or local files
  if (window.location.hostname === "localhost" || window.location.protocol === "file:") return;

  const endpoint = "https://formspree.io/f/mzzejjqa"; // Formspree Notification Endpoint

  // Sends 1 email alert per visitor session to avoid spamming your inbox
  if (sessionStorage.getItem("visitor_email_alert_sent")) return;
  sessionStorage.setItem("visitor_email_alert_sent", "true");

  const formData = new FormData();
  formData.append("Alert", "NEW VISITOR ON YOUR PORTFOLIO WEBSITE");
  formData.append("Page Visited", window.location.href);
  formData.append("Referrer Source", document.referrer || "Direct Visit / Bookmark");
  formData.append("Screen Resolution", `${window.screen.width}x${window.screen.height}`);
  formData.append("Browser User-Agent", navigator.userAgent);
  formData.append("Timestamp", new Date().toLocaleString());

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, formData);
    } else {
      fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).catch(() => {});
    }
  } catch (e) {
    // Fails silently so user navigation is never affected
  }
}