// Typing Animation Effect for Hero Text
const text = "I'm Rakibul Hasan Rafi. I'm a Student in Chemical Engineering. My research focuses on Ungabunga.";
let index = 0;
function typeEffect() {
    if (index < text.length) {
        document.getElementById("hero-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
    }
}
window.onload = typeEffect;

// Back-to-Top Button Functionality
const backToTop = document.createElement("button");
backToTop.innerHTML = "⬆";
backToTop.id = "backToTop";
document.body.appendChild(backToTop);
backToTop.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; padding: 10px 15px;
    font-size: 18px; background: #ff6600; color: white; border: none; 
    cursor: pointer; border-radius: 5px; display: none; z-index: 1000;
`;
window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dark Mode Toggle
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "🌙 Dark Mode";
toggleBtn.id = "toggleMode";
document.body.appendChild(toggleBtn);
toggleBtn.style.cssText = `
    position: fixed; top: 20px; right: 30px; padding: 8px 12px;
    font-size: 16px; background: #444; color: white; border: none; 
    cursor: pointer; border-radius: 5px; z-index: 1000;
`;
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleBtn.innerText = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});
