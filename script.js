// Get elements
const aboutBtn = document.getElementById("about-btn");
const aboutPopup = document.getElementById("about-popup");
const closePopup = document.getElementById("close-popup");

// Open pop-up with fade-in and scale-up effect
aboutBtn.addEventListener("click", () => {
  aboutPopup.classList.remove("hidden");
  setTimeout(() => {
    aboutPopup.children[0].classList.add("scale-100", "opacity-100");
  }, 100); // Small delay for smooth animation
});

// Close pop-up smoothly
closePopup.addEventListener("click", () => {
  aboutPopup.children[0].classList.remove("scale-100", "opacity-100");
  setTimeout(() => {
    aboutPopup.classList.add("hidden");
  }, 300); // Delays hiding for smooth exit animation
  
  const text = "Hi, I'm Atharva";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typed-text").textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 150); // Adjust speed here
  }
}

// Start effect when page loads
window.onload = typeWriter;
});
