document.addEventListener("DOMContentLoaded", function() {
    const text = "Hi, I'm Rakibul Hasan Rafi. I'm a Student in Chemical Engineering. My research focuses on Ungabunga.";
    let index = 0;
    const speed = 50;
    function typeWriter() {
        if (index < text.length) {
            document.getElementById("hero-text").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
});

/* Dark Mode Toggle */
const toggleBtn = document.querySelector(".theme-toggle");
toggleBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
