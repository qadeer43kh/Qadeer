// Smooth Scroll for navigation links
document.querySelectorAll("header nav a").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = e.target.name.value;
  let email = e.target.email.value;
  let message = e.target.message.value;

  // Show message on page instead of only alert
  let successMsg = document.createElement("p");
  successMsg.innerText = `✅ Thank you, ${name}! Your message has been received.`;
  successMsg.style.color = "#00ff88";
  successMsg.style.fontWeight = "600";
  successMsg.style.marginTop = "10px";

  // Add message below form
  e.target.parentElement.appendChild(successMsg);

  // Reset form
  e.target.reset();

  // Remove message after 5 seconds
  setTimeout(() => successMsg.remove(), 5000);

  // Console log (developer side)
  console.log("📩 New message received:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);
});

// 3D text hover effect
const threeDText = document.querySelector(".threeD-text");
if (threeDText) {
  threeDText.addEventListener("mousemove", (e) => {
    const { offsetWidth: width, offsetHeight: height } = threeDText;
    let x = (e.offsetX / width) - 0.5;
    let y = (e.offsetY / height) - 0.5;
    threeDText.style.transform = `rotateX(${y * 15}deg) rotateY(${x * 15}deg)`;
  });

  threeDText.addEventListener("mouseleave", () => {
    threeDText.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}