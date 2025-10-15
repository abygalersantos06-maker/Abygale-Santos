// Smooth scroll and button animation setup
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log("Lumina Nabi website loaded successfully.");

// feedback.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('feedbackForm');
  const thankYouMessage = document.getElementById('thankYouMessage');
  const okButton = document.getElementById('okButton');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
    thankYouMessage.style.display = 'flex'; // Show thank you popup
    form.reset(); // Clear form
  });

  okButton.addEventListener('click', function () {
    thankYouMessage.style.display = 'none'; // Hide popup
  });
});
